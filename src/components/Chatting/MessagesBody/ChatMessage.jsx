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

const ChatMessage = ({ chat, chats, index, user }) => {
  ChatMessage.propTypes = {
    chat: PropTypes.any,
    chats: PropTypes.any,
    index: PropTypes.number,
    user: PropTypes.any,
  };
  const {
    roomId,
    authorName,
    authorId,
    text,
    time,
  } = chat;

  const chatDate = (new Date(time)).toLocaleString().slice(0,-3) // date format minute 까지
  const prevChatDate = index!==0 ? (new Date(chats[index-1].time)).toLocaleString().slice(0,-3) : null // 직전 메세지 minute까지
  const nextChatDate = index!==chats.length-1 ? (new Date(chats[index+1].time)).toLocaleString().slice(0,-3) : null
  const isAuthor = authorId === user.id; // 만약 자신이라면 isAuthor는 true
  const isSameTimePrev = prevChatDate && chatDate === prevChatDate
  const isSameTimeNext = nextChatDate && chatDate === nextChatDate
  const isSameAuthorPrev = index!==0 && authorId === chats[index-1].authorId
  const isSameAuthorNext = index!==chats.length-1 && authorId === chats[index+1].authorId
  console.log(isSameTimeNext, isSameAuthorPrev)
  const messageBoxStyle = isAuthor ? 
    "chatMessage-myMessage" : 
    "chatMessage-receivedMessage";
  const chatMessageBodyStyle = isAuthor ?
    "chatMessage-body-mine" :
    "chatMessage-body-received";
  return (
    <div className={messageBoxStyle}>
      {!isAuthor && !( isSameAuthorPrev && isSameTimePrev ) && (
        <div className="chatMessage-avatar-container">
          <UserAvatar
            name={authorName}
            chat={chat}
            thumbnailUrl="dummy data"
          ></UserAvatar>
        </div>
      )}
      <div className={
        isAuthor || !( isSameAuthorPrev && isSameTimePrev ) ?
        "chatMessage-bodyContainer" :
        "chatMessage-bodyContainer-noProfile"
      }>
        {
          !isAuthor && !( isSameAuthorPrev && isSameTimePrev ) && (
            <div className="chatMessage-userName">{authorName}</div>
          )
        }
        <div className={chatMessageBodyStyle}>{text}</div>
      </div>
      {
        !( isSameAuthorNext && isSameTimeNext ) && (
          <div className="chatMessage-date">{chatDate.slice(-8)}</div>
        )
      }
    </div>
  );
};

export default ChatMessage;
