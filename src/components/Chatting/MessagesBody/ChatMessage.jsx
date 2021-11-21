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

const ChatMessage = ({ chatMessage, chatMessages, index }) => {
  ChatMessage.propTypes = {
    chatMessage: PropTypes.any,
    chatMessages: PropTypes.any,
    index: PropTypes.number,
  };
  const isAuthor = chatMessage.author === "Me!";
  return (
    <>
      <div
        className={`${
          isAuthor ? "chatMessage-myMessage" : "chatMessage-receivedMessage"
        }`}
      >
        {!isAuthor && (
          <div className="chatMessage-avatar-container">
            <UserAvatar
              user={chatMessage.author}
              chatMessage={chatMessage}
              thumbnailUrl="dummy data"
            ></UserAvatar>
          </div>
        )}
        message
      </div>
    </>
  );
};

export default ChatMessage;
