import React, { useState } from "react";
import Header from "./Header/Header";
import MessagesBody from "./MessagesBody/MessagesBody";
import MessageForm from "./MessageForm";

const Chatting = (props) => {
  const roomId = 0;

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
  const endterRoom = () => {};
  const receiveMessage = () => {};
  const requestMoreChats = () => {};
  const incomeUser = () => {};
  const exitUser = () => {};
  // const updateReadCnt = () => {}
  const sendMessage = (messageStr) => {
    alert("새 메시지: " + messageStr);
  };

  return (
    <div>
      <Header />
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
