import { useEffect } from "react";
import { Socket, io } from "socket.io-client";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import { ioServer } from "loadenv";

export type SocketChatEventListner = (chats: Array<Chat>) => void;
export type SocketReadyEventListner = () => void;

let socket: Nullable<Socket> = null;

let isSocketReady: boolean = false;
let socketReadyQueue: Array<SocketReadyEventListner> = [];

let userId: Nullable<string> = null;
let initEventListener: Nullable<SocketChatEventListner> = null;
let pushBackEventListener: Nullable<SocketChatEventListner> = null;
let pushFrontEventListener: Nullable<SocketChatEventListner> = null;

// disconnect socket
const disconnectSocket = () => {
  if (socket) socket.disconnect();
  socket = null;
  isSocketReady = false;
};

// connect socket with event listeners
const connectSocket = () => {
  if (!userId) return;

  disconnectSocket();
  socket = io(ioServer, { withCredentials: true });

  socket.on("connect", () => {
    if (!socket) return;

    socket.on("chat_init", ({ chats }) => {
      if (initEventListener) initEventListener(chats);
    });
    socket.on("chat_push_back", ({ chats }) => {
      if (pushBackEventListener) pushBackEventListener(chats);
      // TODO: roomId 다르면 Toast 메시지 띄우기 가능 (라이브러리 조사: React-toastify)
    });
    socket.on("chat_push_front", ({ chats }) => {
      if (pushFrontEventListener) pushFrontEventListener(chats);
    });
    socket.on("health", (isHealth: boolean) => {
      if (!socket) return null;
      if (isHealth) {
        isSocketReady = true;
        socketReadyQueue.forEach((event) => event());
        socketReadyQueue = [];
      } else {
        console.error("re-try connect with socket");
        socket.emit("health");
      }
    });
    socket.on("disconnect", () => {
      socket = null;
      isSocketReady = false;
      connectSocket();
    });

    socket.emit("health");
  });
};

const SocketToastProvider = () => {
  const { id: _userId } = useValueRecoilState("loginInfo") || {};

  useEffect(() => {
    userId = _userId;
    if (userId) {
      connectSocket();
      return disconnectSocket;
    }
  }, [_userId]);

  return null;
};

// socket event listener 등록
const registerSocketEventListener = ({
  initListener,
  pushBackListener,
  pushFrontListener,
}: {
  initListener?: SocketChatEventListner;
  pushBackListener?: SocketChatEventListner;
  pushFrontListener?: SocketChatEventListner;
}) => {
  initEventListener = initListener;
  pushBackEventListener = pushBackListener;
  pushFrontEventListener = pushFrontListener;
};

// socket event listener 해제
const resetSocketEventListener = () => {
  initEventListener = null;
  pushBackEventListener = null;
  pushFrontEventListener = null;
};

// socket이 연결된 이후 event 함수를 실행합니다.
const socketReady = (event: SocketReadyEventListner) => {
  if (isSocketReady) event();
  else socketReadyQueue.push(event);
};

export default SocketToastProvider;
export { registerSocketEventListener, resetSocketEventListener, socketReady };
