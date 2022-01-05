import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "./Header/Header";
import MessagesBody from "./MessagesBody/MessagesBody";
import MessageForm from "./Input/MessageForm";
import { backServer } from "../../serverconf"

const Chatting = (props) => {
  const roomId = useParams().roomId;

  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);

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
    alert("새 메시지: " + messageStr);
  };

  // socket conncet
  const getSocket = () => {

  }
  useEffect(() => {
    let _socket;
    /*if(true){
      _socket = io(backServer, { auth: { token: 123 } });
    }*/
  })

  return (
    <div>
      <Header roomId={ roomId } />
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