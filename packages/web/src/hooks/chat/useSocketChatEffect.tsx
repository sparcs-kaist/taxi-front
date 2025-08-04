import { MutableRefObject, RefObject, useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import type { Chat, Chats } from "@/types/chat";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useSetMyRooms } from "@/hooks/useFetchRecoilState/useFetchMyRooms";
import { useAxios } from "@/hooks/useTaxiAPI";

import {
  createInfScrollCheckoutChat,
  createShareChat,
  getCleanupChats,
  jointCheckoutChat,
} from "@/tools/chat/chats";
import { isBottomOnScroll, scrollToBottom } from "@/tools/chat/scroll";
import {
  registerSocketEventListener,
  resetSocketEventListener,
  socketReady,
} from "@/tools/socket";

export default (
  roomInfo: Nullable<Room>,
  fetchRoomInfo: () => void,
  fetchReadAtList: () => void,
  setChats: ReturnType<typeof useStateWithCallbackLazy<Chats>>[1],
  setDisplayNewMessage: (value: boolean) => void,
  handleRead: () => void,
  chatBodyRef: RefObject<HTMLDivElement>,
  isSendingMessage: MutableRefObject<boolean>
) => {
  const axios = useAxios();
  const setMyRooms = useSetMyRooms();
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
          // 브라우저 활성화 여부 확인
          const isWindowFocused = () => document.visibilityState === "visible";

          if (isMyMessage) isSendingMessage.current = false;
          if (isNeedToFetch) fetchRoomInfo();
          if (isWindowFocused()) handleRead(); // 새로운 메세지에 대한 읽음 처리

          // // 다른 사용자의 새 메시지가 도착하면 읽음 처리 및 unread count 조정
          // // 내 메시지가 아니고, 실제 메시지 타입인 경우
          // if (!isMyMessage) {
          //   console.log("New message received in room:", roomId);
          //   const newMessageCount = chats.filter(chat => 
          //     chat.authorId !== userOid && 
          //     ["text", "s3img"].includes(chat.type) // 실제 메시지만 카운트
          //   ).length;
            
          //   if (newMessageCount > 0) {
          //     // 현재 채팅창이 포커스되어 있으면 즉시 읽음 처리
          //     if (isWindowFocused()) {
          //       // 포커스된 상태에서는 전역 업데이트에서 증가된 unreadCount를 0으로 리셋
          //       setMyRooms((prevMyRooms) => {
          //         if (!prevMyRooms) return prevMyRooms;
                  
          //         const updateRoomUnreadCount = (rooms: any[]) =>
          //           rooms.map((room) => {
          //             if (room._id === roomId) {
          //               return { 
          //                 ...room, 
          //                 unreadCount: 0 // 포커스된 상태면 읽음 처리
          //               };
          //             }
          //             return room;
          //           });

          //         return {
          //           ongoing: updateRoomUnreadCount(prevMyRooms.ongoing),
          //           done: updateRoomUnreadCount(prevMyRooms.done),
          //         };
          //       });
          //     }
          //     // 포커스되지 않은 상태에서는 전역 업데이트(SocketToastProvider)에서 처리됨
          //   }
          // }

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
        updateListener: (updatedRoomId: string) => {
          if (isExpired) return;

          if (roomId === updatedRoomId) fetchReadAtList();
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
  }, [roomInfo, setChats, setDisplayNewMessage]);
};
