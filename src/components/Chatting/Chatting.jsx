import React, { useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import MessageForm from "./MessageForm";

const Chatting = (props) => {
  const [newMessage, setNewMessage] = useState("");

  // MessageForm 관련 함수들 - 시작-----
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = (event) => {
    event?.preventDefault();
    if (!newMessage) sendMessage(newMessage);
    setNewMessage("");
  };
  const sendMessage = (messageStr) => {
    alert("새 메시지: " + messageStr);
  };
  //MessageForm 관련 함수들 - 끝-------

  // Events


  const roomId = 0;
  return (
    <div>
      <Header />
      <Main />
      <MessageForm
        newMessage={newMessage}
        handleNewMessageChange={handleNewMessageChange}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chatting;
