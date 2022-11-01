import React, { useState, useEffect } from "react";
import FullChatMessageForm from "./FullChatMessageForm";
import NewMessage from "./NewMessage";
import PropTypes from "prop-types";
import { theme } from "styles/theme";

const MessageForm = (props) => {
  const [contHeight, setContHeight] = useState("48px");

  useEffect(() => {
    props.setContHeight(contHeight);
  }, [contHeight]);

  return (
    <div
      style={{
        width: "100%",
        height: contHeight,
        position: props.isSideChat ? "absolute" : "fixed",
        left: "0px",
        bottom: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        boxShadow: theme.shadow_clicked,
      }}
    >
      <NewMessage
        show={props.showNewMessage}
        onClick={props.onClickNewMessage}
      />
      <FullChatMessageForm
        handleSendMessage={props.handleSendMessage}
        handleSendImage={props.handleSendImage}
        setContHeight={setContHeight}
      />
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
