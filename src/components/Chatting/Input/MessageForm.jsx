import React, { useState } from "react";
import SideChatMessageForm from "./SideChatMessageForm";
import FullChatMessageForm from "./FullChatMessageForm";
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
    <>
      {props.isSideChat ? (
        <SideChatMessageForm
          message={message}
          onChangeMessage={onChangeMessage}
          onSend={onSend}
        />
      ) : (
        <FullChatMessageForm
          message={message}
          onChangeMessage={onChangeMessage}
          onChangeImage={onChangeImage}
          onSend={onSend}
        />
      )}
    </>
  );
};

MessageForm.propTypes = {
  isSideChat: PropTypes.bool,
  handleSendMessage: PropTypes.func,
  handleSendImage: PropTypes.func,
};

export default MessageForm;
