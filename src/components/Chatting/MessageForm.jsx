import React from "react";
import "./MessageForm.css";
import PropTypes from "prop-types";
import { IoMdSend } from "react-icons/io";

MessageForm.propTypes = {
  newMessage: PropTypes.string,
  handleNewMessageChange: PropTypes.func,
  handleStartTyping: PropTypes.func,
  handleStopTyping: PropTypes.func,
  handleSendMessage: PropTypes.func,
};

export default function MessageForm({
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
      <div className="MessageForm-container">
        <form className="MessageForm">
          <input
            type="text"
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="채팅을 입력해주세요..."
            className="MessageForm-input-field"
            // onKeyPress={handleStartTyping}
            // onKeyUp={handleStopTyping}
          />
          <button
            className="MessageForm-send-icon-container"
            type="submit"
            onClick={handleSendMessage}
          >
            {" "}
            <IoMdSend className="MessageForm-send-icon" />
          </button>
        </form>
      </div>
    </>
  );
}
