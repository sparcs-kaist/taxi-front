import { RefObject, memo } from "react";

import { LayoutType } from "types/chat";

import useSendMessage from "hooks/chat/useSendMessage";

import InputText from "./InputText";
import NewMessage from "./NewMessage";
import ToolSheet from "./ToolSheet";
import ToolSheetOpenButton from "./ToolSheetOpenButton";

import isVirtualKeyboardDetectedAtom from "atoms/isVirtualKeyboardDetected";
import { useRecoilValue } from "recoil";

import { scrollToBottom } from "tools/chat/scroll";
import theme from "tools/theme";

type MessageFormProps = {
  layoutType: LayoutType;
  isDisplayNewMessage: boolean;
  isOpenToolSheet: boolean;
  onChangeIsOpenToolSheet: (x: boolean) => void;
  messageBodyRef: RefObject<HTMLDivElement>;
  sendMessage: ReturnType<typeof useSendMessage>;
};

const MessageForm = ({
  layoutType,
  isDisplayNewMessage,
  isOpenToolSheet,
  onChangeIsOpenToolSheet,
  messageBodyRef,
  sendMessage,
}: MessageFormProps) => {
  const isVKDetected = useRecoilValue(isVirtualKeyboardDetectedAtom);

  const onClickNewMessage = () => {
    if (!messageBodyRef.current) return;
    scrollToBottom(messageBodyRef.current, true);
  };

  const styleHead = {
    position: "relative" as any,
    zIndex: theme.zIndex_nav - 1,
  };
  const styleBody = {
    position: "relative" as any,
    zIndex: theme.zIndex_nav,
    padding: `8px 12px calc(8px + ${
      layoutType === "sidechat" || isVKDetected
        ? "0px"
        : "env(safe-area-inset-bottom)"
    })`,
    display: "flex",
    alignItems: "flex-end",
    gap: "10px",
    boxShadow: theme.shadow_clicked,
    background: theme.white,
  };

  return (
    <>
      <div css={styleHead}>
        <NewMessage
          isDisplay={isDisplayNewMessage}
          onClick={onClickNewMessage}
        />
        <ToolSheet
          isOpen={isOpenToolSheet}
          onChangeIsOpen={onChangeIsOpenToolSheet}
          sendMessage={sendMessage}
        />
      </div>
      <div css={styleBody}>
        <ToolSheetOpenButton
          isOpen={isOpenToolSheet}
          onChangeIsOpen={onChangeIsOpenToolSheet}
        />
        <InputText sendMessage={sendMessage} />
      </div>
    </>
  );
};

export default memo(MessageForm);
