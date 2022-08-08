import React, { useState } from "react";
import "../Style/SideChatMessageForm.css";
import PropTypes from "prop-types";
import { IoMdSend } from "react-icons/io";

const SideChatMessageForm = (props) => {
  const [inputStr, setInputStr] = useState("");

  const onSend = (e) => {
    e?.preventDefault();
    const result = props.handleSendMessage(inputStr);
    if (result) setInputStr("");
  };

  return (
    <>
      <div className="SideChatMessageForm-container">
        <form className="SideChatMessageForm">
          <input
            type="text"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            placeholder="채팅을 입력해주세요..."
            className="SideChatMessageForm-input-field"
          />
          <button
            className="SideChatMessageForm-send-icon-container"
            type="submit"
            onClick={onSend}
          >
            <IoMdSend fontSize={17.5} />
          </button>
        </form>
      </div>
    </>
  );
};

SideChatMessageForm.propTypes = {
  handleSendMessage: PropTypes.func,
};

export default SideChatMessageForm;
