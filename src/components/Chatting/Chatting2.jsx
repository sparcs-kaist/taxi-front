import React, { useEffect, useState } from "react";
import MessageForm from "./MessageForm";

Chatting2.propTypes = {
  // roomId: PropTypes.number,
  //   exitRoom: PropTypes.func,
};

export default function Chatting2(props) {
  const [newMessage, setNewMessage] = useState("");

  //MessageForm 관련 함수들
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = (event) => {
    if (!event) return;
    event?.preventDefault();
    if (!newMessage) {
      alert("내용을 입력하세요");
    } else {
      sendMessage(newMessage);
    }

    setNewMessage("");
  };
  const sendMessage = (messageStr) => {
    alert("새 메시지: " + messageStr);
  };

  const ChatHeader = () => {
    return <div>1</div>;
  };
  const ChatMessages = () => {
    return <div>1</div>;
  };
  return (
    <>
      <ChatHeader />
      <ChatMessages />
      <MessageForm
        newMessage={newMessage}
        handleNewMessageChange={handleNewMessageChange}
        handleSendMessage={handleSendMessage}
      />
    </>
  );
}
