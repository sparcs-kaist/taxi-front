import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { IoMdSend } from "react-icons/io";
import { BsImageFill } from "react-icons/bs";
import "../Style/MessageForm.css";

const MessageForm = (props) => {
  const [inputStr, setInputStr] = useState("");
  const inputImage = useRef(null);

  const onSend = (e) => {
    e?.preventDefault();
    const result = props.handleSendMessage(inputStr);
    if (result) setInputStr("");
  };
  const onSendImage = (e) => {
    const image = e.target?.files?.[0];
    props.handleSendImage(image);
  };

  return (
    <>
      <div className="MessageForm-container">
        <form className="MessageForm">
          <input
            type="text"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            placeholder="채팅을 입력해주세요..."
            className="MessageForm-input-field"
          />
          <label
            htmlFor="upload-image"
            className="MessageForm-send-icon-container"
          >
            <BsImageFill fontSize={17.5} />
          </label>
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg, image/heic"
            hidden
            onChange={onSendImage}
            id="upload-image"
          />
          <button
            className="MessageForm-send-icon-container"
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

MessageForm.propTypes = {
  handleSendMessage: PropTypes.func,
  handleSendImage: PropTypes.object,
};

export default MessageForm;
