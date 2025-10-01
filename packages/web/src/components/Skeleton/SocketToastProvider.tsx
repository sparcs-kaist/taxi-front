import { useEffect } from "react";
import { io } from "socket.io-client";

import { Chat } from "@/types/chat";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useSetMyRooms } from "@/hooks/useFetchRecoilState/useFetchMyRooms";

import { ioServer } from "@/tools/loadenv";

export type SocketChatEventListner = (chats: Chat[]) => void;
export type SocketRoomEventListner = (updatedRoomId: string) => void;
export type SocketVoidEventListner = () => void;

let isSocketReady: boolean = false;
let socketReadyQueue: SocketVoidEventListner[] = [];

let initEventListener: Nullable<SocketChatEventListner> = null;
let reconnectEventListener: Nullable<SocketVoidEventListner> = null;
let pushBackEventListener: Nullable<SocketChatEventListner> = null;
let pushFrontEventListener: Nullable<SocketChatEventListner> = null;
let updateEventListener: Nullable<SocketRoomEventListner> = null;

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
        console.log("Received chats via socket:", chats);

        // 방별로 모든 채팅을 그룹화 (내 메시지 포함)
        const chatsByRoom = chats.reduce(
          (acc: { [key: string]: Chat[] }, chat: Chat) => {
            if (!acc[chat.roomId]) acc[chat.roomId] = [];
            acc[chat.roomId].push(chat);
            return acc;
          },
          {} as { [key: string]: Chat[] }
        );

        // 각 방별로 처리
        Object.entries(chatsByRoom).forEach(([roomId, roomChats]) => {
          const allChats = roomChats as Chat[];

          // 다른 사용자의 실제 메시지만 필터링
          const otherUserMessages = allChats.filter(
            (chat: Chat) =>
              chat.authorId !== userOid && ["text", "s3img"].includes(chat.type)
          );

          // 중요한 메시지 타입 확인 (정산, 송금, 계좌 전송 메시지)
          const importantMessages = allChats.filter(
            (chat: Chat) =>
              chat.authorId !== userOid &&
              ["payment", "settlement", "account", "in", "out"].includes(
                chat.type
              )
          );

          // 다른 사용자의 새 메시지가 있을 때만 unread count 업데이트
          if (otherUserMessages.length > 0 || importantMessages.length > 0) {
            setMyRooms((prevMyRooms) => {
              if (!prevMyRooms) return prevMyRooms;

              const updateRoomUnreadCount = (rooms: any[]) =>
                rooms.map((room) => {
                  if (room._id === roomId) {
                    // 서버 기반 unread count 업데이트
                    // 새로 받은 다른 사용자의 메시지만큼 unread count 증가
                    const currentUnreadCount = room.unreadCount || 0;
                    const newUnreadCount =
                      currentUnreadCount + otherUserMessages.length;

                    // 중요한 메시지가 있는 경우 hasImportantMessage 플래그 설정
                    const hasImportantMessage =
                      importantMessages.length > 0 ||
                      (room.hasImportantMessage && newUnreadCount > 0);

                    console.log(
                      `Socket unread count update for room ${roomId}:`,
                      {
                        previousUnreadCount: currentUnreadCount,
                        newUnreadCount,
                        newOtherUserMessages: otherUserMessages.length,
                        importantMessages: importantMessages.length,
                        hasImportantMessage,
                        totalSocketChats: allChats.length,
                      }
                    );

                    return {
                      ...room,
                      unreadCount: newUnreadCount,
                      hasImportantMessage,
                    };
                  }
                  return room;
                });

              return {
                ongoing: updateRoomUnreadCount(prevMyRooms.ongoing),
                done: updateRoomUnreadCount(prevMyRooms.done),
              };
            });
          }
        });
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
  }, [userId, userOid, setMyRooms, fetchMyrooms]);

  return null;
};

// socket event listener 등록
const registerSocketEventListener = ({
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
}) => {
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
