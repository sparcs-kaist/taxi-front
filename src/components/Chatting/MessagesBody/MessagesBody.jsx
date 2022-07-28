import React from "react";
import "../Style/MessagesBody.css";
import ChatMessage from "./ChatMessage";
import NewMessage from "./NewMessage";
import PropTypes from "prop-types";
// Chat {
//   roomId: ObjectId, //방의 objectId
//   authorName: String, //작성자 닉네임 (사용자 입,퇴장 알림 등 전체 메시지일 때: null)
//   authorId: String, //작성자 id (!==ObjectId) (전체 메시지일 때: null)
//   text: String, //채팅 내용
//   time: Date, //UTC 시각
// }

const MessagesBody = (props) => {
  const chats = props.chats;
  const user = props.user;
  const isSideChat = props.isSideChat;
  const forwardedRef = props.forwardedRef;
  const handleScroll = props.handleScroll;
  const onClick = props.onClick;
  const isReceieveChat = props.isReceieveChat;

  return (
    <div
      className={isSideChat ? "sideChatMessagesBox" : "chatMessagesBox"}
      ref={forwardedRef}
      onScroll={handleScroll}
    >
      <ul className="MessagesBody-container">
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
      </ul>
      <NewMessage isReceieveChat={isReceieveChat} onClick={onClick} />
    </div>
  );
};

MessagesBody.propTypes = {
  chats: PropTypes.array,
  user: PropTypes.object,
  isSideChat: PropTypes.bool,
  forwardedRef: PropTypes.any,
  handleScroll: PropTypes.func,
  isReceieveChat: PropTypes.bool,
  onClick: PropTypes.func,
};

export default MessagesBody;
