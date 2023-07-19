import { RefObject, memo } from "react";

import { LayoutType } from "types/chatting";

import useSendMessage from "hooks/chat/useSendMessage";

import Form from "./Form";
import NewMessage from "./NewMessage";

import isVirtualKeyboardDetectedAtom from "atoms/isVirtualKeyboardDetected";
import { useRecoilValue } from "recoil";

import { scrollToBottom } from "tools/chat/scroll";
import theme from "tools/theme";

type MessageFormProps = {
  layoutType: LayoutType;
  isDisplayNewMessage: boolean;
  messageBodyRef: RefObject<HTMLDivElement>;
  sendMessage: ReturnType<typeof useSendMessage>;
};

const MessageForm = ({
  layoutType,
  isDisplayNewMessage,
  messageBodyRef,
  sendMessage,
}: MessageFormProps) => {
  const isVKDetected = useRecoilValue(isVirtualKeyboardDetectedAtom);

  const onClickNewMessage = () => {
    if (!messageBodyRef.current) return;
    scrollToBottom(messageBodyRef.current, true);
  };

  const style = {
    zIndex: theme.zIndex_nav - 2,
    display: "flex",
    flexDirection: "column" as any,
    justifyContent: "flex-end",
    alignItems: "center" as any,
    boxShadow: theme.shadow_clicked,
    backgroundColor: theme.white,
    paddingBottom:
      layoutType === "sidechat" || isVKDetected
        ? "0px"
        : "env(safe-area-inset-bottom)",
  };

  return (
    <div css={style}>
      <NewMessage isDisplay={isDisplayNewMessage} onClick={onClickNewMessage} />
      <Form sendMessage={sendMessage} />
    </div>
  );
};

export default memo(MessageForm);
