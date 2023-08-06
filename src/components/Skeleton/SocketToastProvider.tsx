import { useEffect } from "react";
import { io } from "socket.io-client";

import { Chat } from "types/chat";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";

import { ioServer } from "loadenv";

export type SocketChatEventListner = (chats: Array<Chat>) => void;
export type SocketVoidEventListner = () => void;

let isSocketReady: boolean = false;
let socketReadyQueue: Array<SocketVoidEventListner> = [];

let initEventListener: Nullable<SocketChatEventListner> = null;
let reconnectEventListener: Nullable<SocketVoidEventListner> = null;
let pushBackEventListener: Nullable<SocketChatEventListner> = null;
let pushFrontEventListener: Nullable<SocketChatEventListner> = null;

const SocketToastProvider = () => {
  const { id: userId } = useValueRecoilState("loginInfo") || {};
  const fetchMyrooms = useFetchRecoilState("myRooms");

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

      // TODO: roomId 다르면 Toast 메시지 띄우기 가능 (라이브러리 조사: React-toastify)
    });
    socket.on("chat_push_front", ({ chats }) => {
      if (pushFrontEventListener) pushFrontEventListener(chats);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return null;
};

// socket event listener 등록
const registerSocketEventListener = ({
  initListener,
  reconnectListener,
  pushBackListener,
  pushFrontListener,
}: {
  initListener?: SocketChatEventListner;
  reconnectListener?: SocketVoidEventListner;
  pushBackListener?: SocketChatEventListner;
  pushFrontListener?: SocketChatEventListner;
}) => {
  initEventListener = initListener;
  reconnectEventListener = reconnectListener;
  pushBackEventListener = pushBackListener;
  pushFrontEventListener = pushFrontListener;
};

// socket event listener 해제
const resetSocketEventListener = () => {
  initEventListener = null;
  reconnectEventListener = null;
  pushBackEventListener = null;
  pushFrontEventListener = null;
};

// socket이 연결된 이후 event 함수를 실행합니다.
const socketReady = (event: SocketVoidEventListner) => {
  if (isSocketReady) event();
  else socketReadyQueue.push(event);
};

export default SocketToastProvider;
export { registerSocketEventListener, resetSocketEventListener, socketReady };
