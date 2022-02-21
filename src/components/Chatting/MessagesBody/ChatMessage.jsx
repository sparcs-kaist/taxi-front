import React, { useState } from "react";
import "../Style/MessagesBody.css";
import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";
/*
메세지 객체
Chat{
  author: Stirng,
  text: String,
  time: Date,
}*/

const ChatMessage = ({ chat, chats, index }) => {
  ChatMessage.propTypes = {
    chat: PropTypes.any,
    chats: PropTypes.any,
    index: PropTypes.number,
  };
  const {
    roomId,
    authorName,
    authorId,
    text,
    time,
  } = chat;

  const chatDate = (new Date(time)).toLocaleString().slice(0,-3)
  const prevChatDate = index!==0 ? (new Date(chats[index-1].time)).toLocaleString().slice(0,-3) : null
  console.log(chatDate, prevChatDate)
  const isAuthor = authorName === "test1"; // 만약 자신이라면 isAuthor는 true
  const isSameMinute = prevChatDate && chatDate === prevChatDate
  const isSameAuthor = index!==0 && authorId === chats[index-1].authorId
  // console.log(isSameMinute, isSameAuthor)
  const messageBoxStyle = isAuthor ? 
    "chatMessage-myMessage" : 
    "chatMessage-receivedMessage";
  const chatMessageBodyStyle = isAuthor ?
    "chatMessage-body-mine" :
    "chatMessage-body-received";
  return (
    <div className={messageBoxStyle}>
      {!isAuthor && !( isSameAuthor && isSameMinute ) && (
        <div className="chatMessage-avatar-container">
          <UserAvatar
            name={authorName}
            chat={chat}
            thumbnailUrl="dummy data"
          ></UserAvatar>
        </div>
      )}
      <div className={
        !( isSameAuthor && isSameMinute ) ?
        "chatMessage-bodyContainer" :
        "chatMessage-bodyContainer-noProfile"
      }>
        {
          !isAuthor && !( isSameAuthor && isSameMinute ) && (
            <div className="chatMessage-userName">{authorName}</div>
          )
        }
        <div className={chatMessageBodyStyle}>{text}</div>
      </div>

      {/* <div className="chatMessage-bodyContainer">
        {!isAuthor && !( isSameAuthor && isSameMinute ) && (
          <div className="chatMessage-userName">{authorName}</div>
        )}
        <div className={chatMessageBodyStyle}>{text}</div>
      </div> */}
      {
        !( isSameAuthor && isSameMinute ) && (
          <div className="chatMessage-date">{chatDate.slice(-8)}</div>
        )
      }
    </div>
  );
};

export default ChatMessage;
