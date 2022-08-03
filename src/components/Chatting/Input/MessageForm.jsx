import React from "react";
import "../Style/MessageForm.css";
import PropTypes from "prop-types";
import { IoMdSend } from "react-icons/io";
import { BsImageFill } from "react-icons/bs";

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
            onChange={(e) => props.handleSendImage(e.target.files[0])}
            id="upload-image"
          />
          <button
            className="MessageForm-send-icon-container"
            type="submit"
            onClick={props.handleSendMessage}
          >
            <IoMdSend fontSize={17.5} />
          </button>
        </form>
      </div>
    </>
  );
};

MessageForm.propTypes = {
  newMessage: PropTypes.string,
  handleNewMessageChange: PropTypes.func,
  handleSendMessage: PropTypes.func,
  handleSendImage: PropTypes.func,
  inputImage: PropTypes.object,
};

export default MessageForm;
