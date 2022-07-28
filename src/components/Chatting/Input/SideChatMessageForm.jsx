import React from "react";
import "../Style/SideChatMessageForm.css";
import PropTypes from "prop-types";
import { IoMdSend } from "react-icons/io";

const SideChatMessageForm = (props) => {

  return (
    <>
      <div className="SideChatMessageForm-container">
        <form className="SideChatMessageForm">
          <input
            type="text"
            value={props.newMessage}
            onChange={props.handleNewMessageChange}
            placeholder="채팅을 입력해주세요..."
            className="SideChatMessageForm-input-field"
          />
          <button
            className="SideChatMessageForm-send-icon-container"
            type="submit"
            onClick={props.handleSendMessage}
          >
            <IoMdSend fontSize={17.5} />
          </button>
        </form>
      </div>
    </>
  );
}

SideChatMessageForm.propTypes = {
  newMessage: PropTypes.string,
  handleNewMessageChange: PropTypes.func,
  handleSendMessage: PropTypes.func,
};

export default SideChatMessageForm;
