import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "./Header/Header";
import MessagesBody from "./MessagesBody/MessagesBody";
import MessageForm from "./Input/MessageForm";
import { backServer } from "../../serverconf"
import "./Style/Chatting.css"
import axios from "../Tool/axios";

const Chatting = (props) => {
  const roomId = useParams().roomId;
  const socket = useRef(undefined);

  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [headerInfo, setHeaderInfo] = useState(undefined);

  // MessageForm 관련 함수들 - 시작-----
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = (event) => {
    event?.preventDefault();
    if (newMessage) sendMessage(newMessage);
    setNewMessage("");
  };
  // MessageForm 관련 함수들 - 끝-------

  // Events
  const endterRoom = () => {

  }
  const receiveMessage = () => {

  }
  const requestMoreChats = () => {

  }
  const incomeUser = () => {

  }
  const exitUser = () => {

  }
  // const updateReadCnt = () => {}
  const sendMessage = (messageStr) => {
    socket.current.emit("chats-send", { roomId: roomId, content: messageStr });
  };

  // socket conncet
  const getSocket = () => {

  }
  useEffect(() => {
    const _socket = io(backServer, {
      withCredentials: true
    });

    socket.current = _socket;
    socket.current.on("chats-join", (chats) => {
      console.log(chats);
    })

    axios.get(`/chats/${ roomId }`).then(({ data }) => {
      setHeaderInfo(data);
      socket.current.emit("chats-join", roomId);
    }).catch(() => {
      // when error !
    })
    
  }, [roomId])

  return (
    <div className="ChatRoomContainer">
      <Header info={ headerInfo } />
      <MessagesBody />
      <MessageForm
        newMessage={newMessage}
        handleNewMessageChange={handleNewMessageChange}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chatting;