import { useEffect } from "react";
import { io } from "socket.io-client";

import { Chat } from "@/types/chat";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useSetMyRooms } from "@/hooks/useFetchRecoilState/useFetchMyRooms";

import { ioServer } from "@/tools/loadenv";

export type SocketChatEventListner = (chats: []) => void;
export type SocketRoomEventListner = (updatedRoomId: string) => void;
export type SocketVoidEventListner = () => void;

let isSocketReady: boolean = false;
let socketReadyQueue: SocketVoidEventListner[] = [];

let initEventListener: SocketChatEventListner | null | undefined = null;
let reconnectEventListener: SocketVoidEventListner | null | undefined = null;
let pushBackEventListener: SocketChatEventListner | null | undefined = null;
let pushFrontEventListener: SocketChatEventListner | null | undefined = null;
let updateEventListener: SocketRoomEventListner | null | undefined = null;

const SocketToastProvider = () => {
  const { id: userId, oid: userOid } = useValueRecoilState("loginInfo") || {};
  const fetchMyrooms = useFetchRecoilState("myRooms");
  const setMyRooms = useSetMyRooms();

  useEffect(() => {
    if (!userId) return;
    const socket = io(ioServer, { withCredentials: true });

    socket.on("connect", () => {
      isSocketReady = true;
      socketReadyQueue.forEach((event) => event());
      socketReadyQueue = [];
    });
    socket.on("disconnect", () => {
      isSocketReady = false;
    });
    socket.io.on("reconnect", () => {
      if (reconnectEventListener) reconnectEventListener();
    });
    socket.on("chat_init", ({ chats }) => {
      if (initEventListener) initEventListener(chats);
    });
    socket.on("chat_push_back", ({ chats }) => {
      if (pushBackEventListener) pushBackEventListener(chats);

      // Room 배열의 업데이트가 필요한 채팅을 수신했다면 업데이트합니다.
      const isNeedToFetch = chats.some((chat: Chat) =>
        ["in", "out", "payment", "settlement"].includes(chat.type)
      );
      if (isNeedToFetch) fetchMyrooms();

      // 전역적으로 unread count 업데이트 처리
      if (userOid && chats.length > 0) {
        // 다른 사용자의 메시지인지 확인
        const otherUserMessages = chats.filter(
          (chat: Chat) =>
            chat.authorId !== userOid && ["text", "s3img"].includes(chat.type) // 실제 메시지만 카운트
        );

        if (otherUserMessages.length > 0) {
          // 방별로 그룹화
          const messagesByRoom = otherUserMessages.reduce(
            (acc: { [key: string]: Chat[] }, chat: Chat) => {
              if (!acc[chat.roomId]) acc[chat.roomId] = [];
              acc[chat.roomId].push(chat);
              return acc;
            },
            {} as { [key: string]: Chat[] }
          );

          // 각 방의 unread count 업데이트
          Object.entries(messagesByRoom).forEach(([roomId, roomMessages]) => {
            const messages = roomMessages as Chat[];
            setMyRooms((prevMyRooms) => {
              if (!prevMyRooms) return prevMyRooms;

              const updateRoomUnreadCount = (rooms: any[]) =>
                rooms.map((room) => {
                  if (room._id === roomId) {
                    // localStorage에서 마지막 읽은 개수 가져오기
                    const lastReadCountKey = `lastReadCount_${roomId}`;
                    const lastReadCountStr =
                      localStorage.getItem(lastReadCountKey);
                    const lastReadCount = lastReadCountStr
                      ? parseInt(lastReadCountStr, 10)
                      : 0;

                    // 예상 totalCount 계산 (기존 + 새로운 메시지)
                    const estimatedTotalCount =
                      (room.chatNum || 0) + messages.length;

                    // unreadCount 재계산
                    const newUnreadCount = Math.max(
                      0,
                      estimatedTotalCount - lastReadCount
                    );

                    console.log(
                      `Global unread count update for room ${roomId}:`,
                      {
                        previousUnreadCount: room.unreadCount,
                        newUnreadCount,
                        newMessageCount: messages.length,
                        estimatedTotalCount,
                        lastReadCount,
                      }
                    );

                    return {
                      ...room,
                      unreadCount: newUnreadCount,
                      chatNum: estimatedTotalCount,
                    };
                  }
                  return room;
                });

              return {
                ongoing: updateRoomUnreadCount(prevMyRooms.ongoing),
                done: updateRoomUnreadCount(prevMyRooms.done),
              };
            });
          });
        }
      }

      // TODO: roomId 다르면 Toast 메시지 띄우기 가능 (라이브러리 조사: React-toastify)
    });
    socket.on("chat_push_front", ({ chats }) => {
      if (pushFrontEventListener) pushFrontEventListener(chats);
    });
    socket.on("chat_update", ({ roomId }) => {
      if (updateEventListener) updateEventListener(roomId);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, userOid, setMyRooms]);

  return null;
};

// socket event listener 등록
const registerSocketEventListener = (
  {
    initListener,
    reconnectListener,
    pushBackListener,
    pushFrontListener,
    updateListener,
  }: {
    initListener?: SocketChatEventListner;
    reconnectListener?: SocketVoidEventListner;
    pushBackListener?: SocketChatEventListner;
    pushFrontListener?: SocketChatEventListner;
    updateListener?: SocketRoomEventListner;
  }
) => {
  initEventListener = initListener;
  reconnectEventListener = reconnectListener;
  pushBackEventListener = pushBackListener;
  pushFrontEventListener = pushFrontListener;
  updateEventListener = updateListener;
};

// socket event listener 해제
const resetSocketEventListener = () => {
  initEventListener = null;
  reconnectEventListener = null;
  pushBackEventListener = null;
  pushFrontEventListener = null;
  updateEventListener = null;
};

// socket이 연결된 이후 event 함수를 실행합니다.
const socketReady = (event: SocketVoidEventListner) => {
  if (isSocketReady) event();
  else socketReadyQueue.push(event);
};

export default SocketToastProvider;
export { registerSocketEventListener, resetSocketEventListener, socketReady };
