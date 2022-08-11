import React from "react";
import PropTypes from "prop-types";

import { IoMdSend } from "react-icons/io";
import { BsImageFill } from "react-icons/bs";
import "../Style/MessageForm.css";

const FullChatMessageForm = (props) => {
  return (
    <>
      <div>
        <div className="MessageForm">
          <input
            type="text"
            value={props.message}
            onChange={props.onChangeMessage}
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
            onChange={props.onChangeImage}
            id="upload-image"
          />
          <button
            className="MessageForm-send-icon-container"
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

FullChatMessageForm.propTypes = {
  message: PropTypes.string,
  onChangeMessage: PropTypes.func,
  onChangeImage: PropTypes.func,
  onSend: PropTypes.func,
};

export default FullChatMessageForm;
