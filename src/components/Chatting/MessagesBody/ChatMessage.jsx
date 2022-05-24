import React, { useState } from "react";
import "../Style/MessagesBody.css";
import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";
import { date2str } from "../../Tool/trans";
/*
메세지 객체
Chat{
  author: Stirng,
  text: String,
  time: Date,
}*/

const NewUserComeMessage = ({ newUser }) => {
  NewUserComeMessage.propTypes = {
    newUser: PropTypes.string,
  };
  return (
    <div className="chatMessage-newUserComeContainer">
      <div className="chatMessage-newUserComeItem">
        {`${newUser} 님이 입장했습니다`}
      </div>
    </div>
  );
};

const ChatMessage = ({ chat, chats, index, user }) => {
  ChatMessage.propTypes = {
    chat: PropTypes.any,
    chats: PropTypes.any,
    index: PropTypes.number,
    user: PropTypes.any,
  };
  const { roomId, authorName, authorId, text, time } = chat;

  const date = new Date(time);
  const chatDate = date.toLocaleString().slice(0, -3); // date format minute 까지
  const dateString = date2str(date);
  // console.log(dateString)
  const prevChatDate =
    index !== 0
      ? new Date(chats[index - 1].time).toLocaleString().slice(0, 11)
      : null;
  const prevChatMinute =
    index !== 0
      ? new Date(chats[index - 1].time).toLocaleString().slice(0, -3)
      : null; // 직전 메세지 minute까지
  const nextChatMinute =
    index !== chats.length - 1
      ? new Date(chats[index + 1].time).toLocaleString().slice(0, -3)
      : null;
  const isAuthor = authorId === user.id; // 만약 자신이라면 isAuthor는 true
  const isSameDatePrev = prevChatDate && chatDate.slice(0, 11) === prevChatDate;
  const isSameMinutePrev = prevChatMinute && chatDate === prevChatMinute;
  const isSameMinuteNext = nextChatMinute && chatDate === nextChatMinute;
  const isSameAuthorPrev =
    index !== 0 && authorId === chats[index - 1].authorId;
  const isSameAuthorNext =
    index !== chats.length - 1 && authorId === chats[index + 1].authorId;
  const messageBoxStyle = isAuthor
    ? "chatMessage-myMessage"
    : "chatMessage-receivedMessage";
  const chatMessageBodyStyle = isAuthor
    ? "chatMessage-body-mine"
    : "chatMessage-body-received";
  return (
    <>
      {!isSameDatePrev && (
        <>
          <div className="chatMessage-newDateLineContainer">
            <div className="newDateLine left"></div>
            <div className="newDateText">{dateString}</div>
            <div className="newDateLine right"></div>
          </div>
          <NewUserComeMessage newUser={"루피"} />
        </>
      )}
      <div className={messageBoxStyle}>
        {!isAuthor && !(isSameAuthorPrev && isSameMinutePrev) && (
          <div className="chatMessage-avatar-container">
            <UserAvatar
              name={authorName}
              chat={chat}
              thumbnailUrl="dummy data"
            ></UserAvatar>
          </div>
        )}
        <div
          className={
            isAuthor || !(isSameAuthorPrev && isSameMinutePrev)
              ? "chatMessage-bodyContainer"
              : "chatMessage-bodyContainer-noProfile"
          }
        >
          {!isAuthor && !(isSameAuthorPrev && isSameMinutePrev) && (
            <div className="chatMessage-userName">{authorName}</div>
          )}
          <div className={chatMessageBodyStyle}>{text}</div>
        </div>
        {!(isSameAuthorNext && isSameMinuteNext) && (
          <div className="chatMessage-date">{chatDate.slice(-8)}</div>
        )}
      </div>
    </>
  );
};

export default ChatMessage;
