import React, { useState } from "react";
import FullChatMessageForm from "./FullChatMessageForm";
import NewMessage from "./NewMessage";
import PropTypes from "prop-types";

const MessageForm = (props) => {
  const [message, setMessage] = useState("");

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const onChangeImage = (e) => {
    const image = e.target?.files?.[0];
    props.handleSendImage(image);
  };
  const onSend = () => {
    const result = props.handleSendMessage(message);
    if (result) setMessage("");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "76px",
        position: props.isSideChat ? "absolute" : "fixed",
        left: "0px",
        bottom: "0px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "36px",
          left: "0px",
          bottom: "40px",
        }}
      >
        <NewMessage
          show={props.showNewMessage}
          onClick={props.onClickNewMessage}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "40px",
          left: "0px",
          bottom: "0px",
        }}
      >
        <FullChatMessageForm
          message={message}
          onChangeMessage={onChangeMessage}
          onChangeImage={onChangeImage}
          onSend={onSend}
        />
      </div>
    </div>
  );
};

MessageForm.propTypes = {
  isSideChat: PropTypes.bool,
  handleSendMessage: PropTypes.func,
  handleSendImage: PropTypes.func,
  showNewMessage: PropTypes.bool,
  onClickNewMessage: PropTypes.func,
};

export default MessageForm;
