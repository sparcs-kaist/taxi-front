import { MutableRefObject, RefObject, useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import type { Chats } from "types/chat";

import { useValueRecoilState } from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import {
  createInfScrollCheckoutChat,
  getCleanupChats,
  jointCheckoutChat,
} from "tools/chat/chats";
import { isBottomOnScroll, scrollToBottom } from "tools/chat/scroll";
import {
  registerSocketEventListener,
  resetSocketEventListener,
  socketReady,
} from "tools/socket";

export default (
  roomId: string,
  setChats: ReturnType<typeof useStateWithCallbackLazy<Chats>>[1],
  setDisplayNewMessage: (value: boolean) => void,
  chatBodyRef: RefObject<HTMLDivElement>,
  isSendingMessage: MutableRefObject<boolean>
) => {
  const axios = useAxios();
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};

  useEffect(() => {
    let isExpired: boolean = false;
    isSendingMessage.current = true;

    socketReady(() => {
      if (isExpired) return;

      // socket event listener 등록
      registerSocketEventListener({
        initListener: (chats) => {
          if (isExpired) return;
          isSendingMessage.current = false;

          setChats(
            getCleanupChats([createInfScrollCheckoutChat(), ...chats]),
            () => {
              if (chatBodyRef?.current) scrollToBottom(chatBodyRef?.current);
            }
          );
        },
        reconnectListener: () => {
          if (isExpired) return;
          setChats(
            (prevChats: Chats): Chats => {
              const lastChat = prevChats[prevChats.length - 1];
              if (!("isSpecialChat" in lastChat)) {
                axios({
                  url: "/chats/load/after",
                  method: "post",
                  data: { roomId, lastMsgDate: lastChat.time },
                });
              }
              return prevChats;
            },
            () => {}
          );
        },
        pushBackListener: (chats: Array<Chat>) => {
          chats = chats.filter((chat) => chat.roomId === roomId);
          if (isExpired || chats.length <= 0) return;

          const isMyMessage = chats.some((chat) => chat.authorId === userOid);
          if (isMyMessage) isSendingMessage.current = false;

          if (chats.length > 10) {
            axios({
              url: "/chats/load/after",
              method: "post",
              data: {
                roomId,
                lastMsgDate: chats[chats.length - 1].time,
              },
            });
          }
          setChats(
            (prevChats: Chats) => getCleanupChats([...prevChats, ...chats]),
            isMyMessage ||
              (chatBodyRef?.current && isBottomOnScroll(chatBodyRef?.current))
              ? () => {
                  if (chatBodyRef?.current)
                    scrollToBottom(chatBodyRef?.current, true);
                }
              : () => setDisplayNewMessage(true)
          );
        },
        pushFrontListener: (chats: Array<Chat>) => {
          if (isExpired) return;

          if (chats.length === 0) {
            setChats(
              (prevChats: Chats) => {
                if (prevChats[0].type === "infscroll-checkout")
                  return prevChats.slice(1);
                return prevChats;
              },
              () => {}
            );
          } else {
            setChats(
              (prevChats: Chats) =>
                getCleanupChats([
                  createInfScrollCheckoutChat(),
                  ...chats,
                  jointCheckoutChat,
                  ...prevChats,
                ]),
              () => {}
            );
          }
        },
      });

      // 채팅 로드 API 호출
      axios({
        url: "/chats",
        method: "post",
        data: { roomId },
      });
    });
    return () => {
      isExpired = true;
      resetSocketEventListener();
    };
  }, [roomId, setChats, setDisplayNewMessage]);
};
