import { useCallback, useEffect } from "react";
import { Socket, io } from "socket.io-client";

import loginInfoDetailAtom from "atoms/loginInfoDetail";
import { useRecoilValue } from "recoil";

import { ioServer } from "loadenv";

export type SocketEventListner = (roomId: string, chats: Array<Chat>) => void;

let socket: Nullable<Socket> = null;

let userId: Nullable<string> = null;
let initEventListener: Nullable<SocketEventListner> = null;
let pushBackEventListener: Nullable<SocketEventListner> = null;
let pushFrontEventListener: Nullable<SocketEventListner> = null;

const SocketToastProvider = () => {
  const { id: _userId } = useRecoilValue(loginInfoDetailAtom) || {};

  const connectSocket = useCallback(() => {
    if (!userId) return;

    socket?.disconnect();
    socket = io(ioServer, {
      withCredentials: true,
    });

    socket.on("chats-init", (data) => {
      if (initEventListener) initEventListener("tmp", []);
    });
    socket.on("chats-push-back", (data) => {
      if (pushBackEventListener) pushBackEventListener("tmp", []);
    });
    socket.on("chats-push-front", (data) => {
      if (pushFrontEventListener) pushFrontEventListener("tmp", []);
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected, connect socket again"); // FIX ME
      // connectSocket();
    });
  }, []);

  useEffect(() => {
    userId = _userId;

    connectSocket();
    setInterval(() => {
      console.log(userId, initEventListener);
    }, 1000);
    return () => {
      socket?.disconnect();
    };
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
