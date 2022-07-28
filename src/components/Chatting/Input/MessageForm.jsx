import React from "react";
import "../Style/MessageForm.css";
import PropTypes from "prop-types";
import { IoMdSend } from "react-icons/io";

const MessageForm = (props) => {

  return (
    <>
      <div className="MessageForm-container">
        <form className="MessageForm">
          <input
            type="text"
            value={props.newMessage}
            onChange={props.handleNewMessageChange}
            placeholder="채팅을 입력해주세요..."
            className="MessageForm-input-field"
          />
          <button
            className="MessageForm-send-icon-container"
            type="submit"
            onClick={props.handleSendMessage}
          >
            <IoMdSend fontSize={17.5}/>
          </button>
        </form>
      </div>
    </>
  );
}

MessageForm.propTypes = {
  newMessage: PropTypes.string,
  handleNewMessageChange: PropTypes.func,
  handleSendMessage: PropTypes.func,
};

export default MessageForm;