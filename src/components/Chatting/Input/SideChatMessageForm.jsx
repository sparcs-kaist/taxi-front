import React from "react";
import "../Style/SideChatMessageForm.css";
import PropTypes from "prop-types";
import { IoMdSend } from "react-icons/io";

SideChatMessageForm.propTypes = {
  newMessage: PropTypes.string,
  handleNewMessageChange: PropTypes.func,
  handleStartTyping: PropTypes.func,
  handleStopTyping: PropTypes.func,
  handleSendMessage: PropTypes.func,
};

export default function SideChatMessageForm({
  newMessage,
  handleNewMessageChange,
  //   handleStartTyping,
  //   handleStopTyping,
  handleSendMessage,
}) {
  const onEnterPress = (e) => {
    if (e.key == "Enter") {
      handleSendMessage();
    }
  };
  return (
    <>
      <div className="SideChatMessageForm-container">
        <form className="SideChatMessageForm">
          <input
            type="text"
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="채팅을 입력해주세요..."
            className="SideChatMessageForm-input-field"
          />
          <button
            className="SideChatMessageForm-send-icon-container"
            type="submit"
            onClick={handleSendMessage}
          >
            <IoMdSend fontSize={17.5} />
          </button>
        </form>
      </div>
    </>
  );
}
