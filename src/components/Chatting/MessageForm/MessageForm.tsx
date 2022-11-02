import React, { useState, useEffect } from "react";
import FullChatMessageForm from "./FullChatMessageForm";
import NewMessage from "./NewMessage";
import PropTypes from "prop-types";
import { theme } from "styles/theme";

type MessageFormPRops = {
  isSideChat: boolean;
  showNewMessage: boolean;
  handleSendMessage: (message: string) => void;
  handleSendImage: (image: File) => void;
  onClickNewMessage: () => void;
  setContHeight: (height: PixelValue) => void;
};

const MessageForm = (props: MessageFormPRops) => {
  const [contHeight, setContHeight] = useState<PixelValue>("48px");

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

export default MessageForm;
