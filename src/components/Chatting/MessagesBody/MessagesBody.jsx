import React, { useState } from "react";
import "../Style/MessagesBody.css";
import ChatMessage from "./ChatMessage";
/*
메세지 객체
Chat{
  author: Stirng,
  text: String,
  time: Date,
}*/

const MessagesBody = (props) => {
  const [chatMessages, setChatMessages] = useState([
    { author: "user1", text: "message1", time: "오후 1시 20분" },
    { author: "user2", text: "message2", time: "오후 1시 40분" },
    { author: "Me!", text: "message3", time: "오후 2시 10분" },
  ]);

  return (
    <ol className="MessagesBody-container">
      {chatMessages.map((message, i) => (
        <li key={i}>
          <ChatMessage
            chatMessage={message}
            chatMessages={chatMessages}
            index={i}
          ></ChatMessage>
        </li>
      ))}
    </ol>
  );
};

export default MessagesBody;
