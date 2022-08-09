import React, { useMemo } from "react";
import moment from "moment";
import ChatSet from "./ChatSet";
import ChatDate from "./ChatDate";
import ChatInOut from "./ChatInOut";
import PropTypes from "prop-types";

import "../Style/MessagesBody.css";

// Chat {
//   roomId: ObjectId, // 방의 objectId
//   authorId: ObjectId, // 작성자 objectId
//   authorName: String, // 작성자 닉네임 (사용자 입,퇴장 알림 등 전체 메시지일 때: null)
//   content: String, // 채팅 content
//   time: Date, // UTC 시각
//   type: String // 메시지 종류 (text|in|out|s3img)
//   authorProfileUrl: String
// }

const MessagesBody = (props) => {
  const chats = useMemo(() => {
    const list = [];
    let momentCache = null;
    let chatsCache = null;
    const dateFormat = "YYYY.MM.DD";
    const minFormat = "YYYY.MM.DD HH:mm";
    props.chats.forEach((item) => {
      const currentMoment = moment(item.time);
      if (!momentCache) {
        momentCache = currentMoment.clone();
        momentCache.subtract(1, "years");
      }
      if (momentCache.format(dateFormat) !== currentMoment.format(dateFormat)) {
        list.push(
          <ChatDate
            key={"date" + currentMoment}
            date={currentMoment}
            background={""}
          />
        );
      }
      if (item.type === "in" || item.type === "out") {
        list.push(
          <ChatInOut
            key={"inout" + currentMoment}
            type={item.type}
            users={item.inOutNames}
          />
        );
      } else if (item.type === "text" || item.type === "s3img") {
        if (
          chatsCache &&
          (chatsCache[0].authorId !== item.authorId ||
            moment(chatsCache[0].time).format(minFormat) !==
              currentMoment.format(minFormat))
        ) {
          list.push(
            <ChatSet
              key={"chat" + currentMoment}
              chats={chatsCache}
              authorId={props.user.oid}
              isBottomOnScroll={props.isBottomOnScroll}
              scrollToBottom={props.scrollToBottom}
            />
          );
          chatsCache = null;
        }
        if (!chatsCache) chatsCache = [];
        chatsCache.push(item);
      }
      momentCache = currentMoment.clone();
    });
    if (chatsCache) {
      list.push(
        <ChatSet
          key={"chat" + chatsCache[0].time}
          chats={chatsCache}
          authorId={props.user.oid}
          isBottomOnScroll={props.isBottomOnScroll}
          scrollToBottom={props.scrollToBottom}
        />
      );
    }
    return list;
  }, [props.chats, props.user]);

  return (
    <div
      className={props.isSideChat ? "sideChatMessagesBox" : "chatMessagesBox"}
      ref={props.forwardedRef}
      onScroll={props.handleScroll}
    >
      <div>
        {chats.map((chat) => (
          <div key={chat.time}>{chat}</div>
        ))}
      </div>
    </div>
  );
};

MessagesBody.propTypes = {
  chats: PropTypes.array,
  user: PropTypes.object,
  isSideChat: PropTypes.bool,
  forwardedRef: PropTypes.any,
  handleScroll: PropTypes.func,
  isBottomOnScroll: PropTypes.func,
  scrollToBottom: PropTypes.func,
};

MessagesBody.defaultProps = {
  chats: [],
};

export default MessagesBody;
