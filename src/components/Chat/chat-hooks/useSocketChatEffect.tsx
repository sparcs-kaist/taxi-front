import { MutableRefObject, RefObject, useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import { useValueRecoilState } from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import { Chats, checkoutChat, getCleanupChats } from "../chat-utils/chats";
import { isBottomOnScroll, scrollToBottom } from "../chat-utils/scroll";

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
  isSendingMessage: MutableRefObject<boolean>,
  isCallingInfScroll: MutableRefObject<boolean>
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

          setChats(getCleanupChats(chats), () => {
            if (chatBodyRef?.current) scrollToBottom(chatBodyRef?.current);
            isCallingInfScroll.current = false;
          });
        },
        reconnectListener: () => {
          if (isExpired) return;
          setChats(
            (prevChats: Chats) => {
              const lastMsg = prevChats[prevChats.length - 1] as Chat;
              axios({
                url: "/chats/load/after",
                method: "post",
                data: { roomId, lastMsgDate: lastMsg.time },
              });
              return prevChats;
            },
            () => {}
          );
        },
        pushBackListener: (chats) => {
          // chats = chats.filter((chat) => chat.roomId === roomId);
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
        pushFrontListener: (chats) => {
          if (isExpired) return;

          if (chats.length === 0) return;
          // { isCallingInfScroll.current = false; return; } // 지워도 되는 거겠지? @todo @fixme
          setChats(
            (prevChats: Chats) =>
              getCleanupChats([...chats, checkoutChat, ...prevChats]),
            () => {}
          );
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
