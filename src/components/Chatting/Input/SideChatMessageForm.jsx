import React from "react";
import PropTypes from "prop-types";

import { IoMdSend } from "react-icons/io";
import "../Style/SideChatMessageForm.css";

const SideChatMessageForm = (props) => {
  return (
    <>
      <div className="SideChatMessageForm-container">
        <div className="SideChatMessageForm">
          <input
            type="text"
            value={props.message}
            onChange={props.onChangeMessage}
            placeholder="채팅을 입력해주세요..."
            className="SideChatMessageForm-input-field"
          />
          <button
            className="SideChatMessageForm-send-icon-container"
            type="submit"
            onClick={props.onSend}
          >
            <IoMdSend fontSize={17.5} />
          </button>
        </div>
      </div>
    </>
  );
};

SideChatMessageForm.propTypes = {
  message: PropTypes.string,
  onChangeMessage: PropTypes.func,
  onChangeImage: PropTypes.func,
  onSend: PropTypes.func,
};

export default SideChatMessageForm;
