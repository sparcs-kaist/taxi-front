import { MutableRefObject, RefObject, useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import type { Chat, Chats } from "types/chat";

import { useValueRecoilState } from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import {
  createInfScrollCheckoutChat,
  createShareChat,
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
  roomInfo: Nullable<Room>,
  fetchRoomInfo: () => void,
  setChats: ReturnType<typeof useStateWithCallbackLazy<Chats>>[1],
  setDisplayNewMessage: (value: boolean) => void,
  chatBodyRef: RefObject<HTMLDivElement>,
  isSendingMessage: MutableRefObject<boolean>
) => {
  const axios = useAxios();
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};

  useEffect(() => {
    if (!roomInfo) return;

    const { _id: roomId } = roomInfo;
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
          const isNeedToFetch = chats.some((chat) =>
            ["in", "out", "payment", "settlement"].includes(chat.type)
          );

          if (isMyMessage) isSendingMessage.current = false;
          if (isNeedToFetch) fetchRoomInfo();

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
                const cleanedChat =
                  prevChats[0].type === "infscroll-checkout"
                    ? prevChats.slice(1)
                    : prevChats;
                return getCleanupChats([
                  cleanedChat[0],
                  createShareChat(roomInfo),
                  ...cleanedChat.slice(1),
                ]);
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
        updateListener: (_roomId: string) => {
          if (isExpired || roomId !== _roomId) return;
          fetchRoomInfo();
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
  }, [roomInfo?._id, setChats, setDisplayNewMessage]);
};
