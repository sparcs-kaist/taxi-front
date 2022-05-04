import React, { useState } from "react";
import "../Style/MessagesBody.css";
import ChatMessage from "./ChatMessage";
// Chat {
//   roomId: ObjectId, //방의 objectId
//   authorName: String, //작성자 닉네임 (사용자 입,퇴장 알림 등 전체 메시지일 때: null)
//   authorId: String, //작성자 id (!==ObjectId) (전체 메시지일 때: null)
//   text: String, //채팅 내용
//   time: Date, //UTC 시각
// }

const MessagesBody = (prop) => {
  const chats = prop.chats;
  const user = prop.user;
  const forwardedRef = prop.forwardedRef;

  return (
    <div className="chattingMessagesBox" ref={forwardedRef}>
      <ol className="MessagesBody-container">
        {chats.map((chat, i) => (
          <li key={i}>
            <ChatMessage
              chat={chat}
              chats={chats}
              index={i}
              user={user}
            ></ChatMessage>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MessagesBody;
