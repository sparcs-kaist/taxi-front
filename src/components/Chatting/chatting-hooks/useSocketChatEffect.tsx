import { MutableRefObject, useEffect } from "react";

import { useValueRecoilState } from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import { Chats, checkoutChat, getCleanupChats } from "../chatting-utils/chats";

import {
  registerSocketEventListener,
  resetSocketEventListener,
  socketReady,
} from "tools/socket";

export default (
  roomId: string,
  setChats: any, // fixme
  setDisplayNewMessage: any,
  isSendingMessage: MutableRefObject<boolean>,
  isCallingInfScroll: MutableRefObject<boolean>
) => {
  const axios = useAxios();
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};

  // remove me
  const scrollToBottom = (x?: boolean) => {};
  const isBottomOnScroll = () => true;

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
            scrollToBottom();
            isCallingInfScroll.current = false;
          });
        },
        reconnectListener: () => {
          if (isExpired) return;
          setChats((prevChats: Chats) => {
            const lastMsg = prevChats[prevChats.length - 1] as Chat;
            axios({
              url: "/chats/load/after",
              method: "post",
              data: { roomId, lastMsgDate: lastMsg.time },
            });
            return prevChats;
          });
        },
        pushBackListener: (chats) => {
          if (isExpired) return;

          const isMyMsg = chats.some((chat) => chat.authorId === userOid);
          if (isMyMsg) isSendingMessage.current = false;

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
            isMyMsg || isBottomOnScroll()
              ? () => scrollToBottom(true)
              : () => setDisplayNewMessage(true)
          );
        },
        pushFrontListener: (chats) => {
          if (isExpired) return;

          if (chats.length === 0) {
            isCallingInfScroll.current = false;
            return;
          }
          setChats((prevChats: Chats) =>
            getCleanupChats([...chats, checkoutChat, ...prevChats])
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
