import { useEffect } from "react";
import { Socket, io } from "socket.io-client";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import { ioServer } from "loadenv";

export type SocketEventListner = (roomId: string, chats: Array<Chat>) => void;

let socket: Nullable<Socket> = null;

let userId: Nullable<string> = null;
let initEventListener: Nullable<SocketEventListner> = null;
let pushBackEventListener: Nullable<SocketEventListner> = null;
let pushFrontEventListener: Nullable<SocketEventListner> = null;

// disconnect socket
const disconnectSocket = () => {
  if (socket) socket.disconnect();
  socket = null;
};

// connect socket with event listeners
const connectSocket = () => {
  if (!userId) return;

  disconnectSocket();
  socket = io(ioServer, { withCredentials: true });

  socket.on("connect", () => {
    if (!socket) return;

    socket.on("chats-init", (data) => {
      console.log(data);
      if (initEventListener) initEventListener("tmp", []);
    });
    socket.on("chats-push-back", (data) => {
      console.log(data);
      if (pushBackEventListener) pushBackEventListener("tmp", []);
      // TODO: roomId 다르면 Toast 메시지 띄우기 가능 (라이브러리 조사: React-toastify)
    });
    socket.on("chats-push-front", (data) => {
      console.log(data);
      if (pushFrontEventListener) pushFrontEventListener("tmp", []);
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected"); // FIXME : REMOVE ME
      connectSocket();
    });
  });
};

const SocketToastProvider = () => {
  const { id: _userId } = useValueRecoilState("loginInfo") || {};

  useEffect(() => {
    userId = _userId;
    connectSocket();
    return disconnectSocket;
  }, [_userId]);

  return null;
};

const registerSocketEventListener = ({
  initListener,
  pushBackListener,
  pushFrontListener,
}: {
  initListener?: SocketEventListner;
  pushBackListener?: SocketEventListner;
  pushFrontListener?: SocketEventListner;
}) => {
  initEventListener = initListener;
  pushBackEventListener = pushBackListener;
  pushFrontEventListener = pushFrontListener;
};

const resetSocketEventListener = () => {
  initEventListener = null;
  pushBackEventListener = null;
  pushFrontEventListener = null;
};

export default SocketToastProvider;
export { registerSocketEventListener, resetSocketEventListener };
