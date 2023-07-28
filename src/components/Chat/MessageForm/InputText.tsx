import { CSSProperties, useEffect, useRef, useState } from "react";

import useSendMessage from "hooks/chat/useSendMessage";

import regExpTest from "tools/regExpTest";
import theme from "tools/theme";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

type BtnSendProps = {
  enable: boolean;
  onClick: () => void;
};

const BtnSend = (props: BtnSendProps) => (
  <div
    css={{
      position: "absolute" as any,
      width: "28px",
      height: "28px",
      bottom: "2px",
      right: "2px",
      backgroundColor: props.enable ? theme.purple : theme.gray_background,
      borderRadius: "14px",
      boxShadow: theme.shadow_gray_input_inset,
      ...theme.cursor(!props.enable),
    }}
    onClick={props.onClick}
  >
    <ArrowUpwardRoundedIcon
      style={{
        fontSize: "22px",
        margin: "3px",
        fill: props.enable ? theme.white : theme.gray_line,
      }}
    />
  </div>
);

type InputTextProps = {
  sendMessage: ReturnType<typeof useSendMessage>;
};

const InputText = ({ sendMessage }: InputTextProps) => {
  const textareaContRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>("");
  const [formHeight, setFormHeight] = useState<CSSProperties["height"]>("28px");

  const enterPressed = useRef<boolean>(false);
  const shiftPressed = useRef<boolean>(false);

  const isMessageValid = () => regExpTest.chatMsg(message);
  const onSend = async () => {
    textareaRef.current?.focus();
    if (isMessageValid()) {
      const result = await sendMessage("text", { text: message });
      if (result) setMessage("");
    }
  };
  const onKeyEvent = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    v: boolean
  ) => {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight")
      shiftPressed.current = v;
    if (e.code === "Enter") enterPressed.current = v;
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (enterPressed.current && !shiftPressed.current) {
      onSend();
      return;
    }
    const msg = e.target.value;
    setMessage(msg);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
    onKeyEvent(e, true);
  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
    onKeyEvent(e, false);

  const resizeEvent = () => {
    if (!textareaContRef.current) return;
    const cacheHeight = textareaContRef.current.style.height;
    textareaContRef.current.style.height = "0";
    const newHeight = `${Math.max(
      Math.min(
        textareaRef.current ? textareaRef.current.scrollHeight : 0,
        document.body.clientHeight / 3
      ),
      28
    )}px`;
    textareaContRef.current.style.height = cacheHeight;
    setFormHeight(newHeight);
  };

  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);
  useEffect(resizeEvent, [message]);

  return (
    <div
      ref={textareaContRef}
      css={{
        flex: 1,
        position: "relative",
        background: theme.purple_light,
        boxShadow: theme.shadow_purple_input_inset,
        borderRadius: "16px",
        overflow: "hidden",
        color: theme.black,
        height: formHeight,
      }}
    >
      <textarea
        ref={textareaRef}
        value={message}
        placeholder="채팅을 입력해주세요"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        css={{
          width: "calc(100% - 30px)",
          height: "100%",
          background: "none",
          border: "none",
          resize: "none",
          outline: "none",
          ...theme.font14,
          padding: "8px 12px",
          boxSizing: "border-box",
        }}
      />
      <BtnSend onClick={onSend} enable={isMessageValid()} />
    </div>
  );
};

export default InputText;
