import React, { useState, useEffect } from "react";
import FullChatMessageForm from "./FullChatMessageForm";
import NewMessage from "./NewMessage";
import PropTypes from "prop-types";

const MessageForm = (props) => {
  const [contHeight, setContHeight] = useState("40px");

  useEffect(() => {
    props.setContHeight(contHeight);
  }, [contHeight]);

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
          bottom: contHeight,
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
          left: "0px",
          bottom: "0px",
          filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.1))",
        }}
      >
        <FullChatMessageForm
          handleSendMessage={props.handleSendMessage}
          handleSendImage={props.handleSendImage}
          setContHeight={setContHeight}
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
  setContHeight: PropTypes.func,
};

export default MessageForm;
