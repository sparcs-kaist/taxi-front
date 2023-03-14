import { useState, useEffect } from "react";
import FullChatMessageForm from "./FullChatMessageForm";
import NewMessage from "./NewMessage";
import theme from "styles/theme";

import { useRecoilValue } from "recoil";
import isVirtualKeyboardDetectedAtom from "recoil/isVirtualKeyboardDetectedAtom";

type MessageFormProps = {
  isSideChat: boolean;
  showNewMessage: boolean;
  handleSendMessage: (message: string) => boolean;
  handleSendImage: (image: File) => void;
  handleSendAccount: () => void;
  onClickNewMessage: () => void;
  setContHeight: (height: PixelValue) => void;
};

const MessageForm = (props: MessageFormProps) => {
  const isVKDetected = useRecoilValue(isVirtualKeyboardDetectedAtom);
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
        backgroundColor: theme.white,
        paddingBottom:
          props.isSideChat || isVKDetected
            ? "0px"
            : "env(safe-area-inset-bottom)",
      }}
    >
      <NewMessage
        show={props.showNewMessage}
        onClick={props.onClickNewMessage}
      />
      <FullChatMessageForm
        handleSendAccount={props.handleSendAccount}
        handleSendMessage={props.handleSendMessage}
        handleSendImage={props.handleSendImage}
        setContHeight={setContHeight}
      />
    </div>
  );
};

export default MessageForm;
