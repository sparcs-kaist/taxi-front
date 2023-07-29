import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

import useSendMessage from "hooks/chat/useSendMessage";

import ButtonSend from "./ButtonSend";

import regExpTest from "tools/regExpTest";
import theme from "tools/theme";

type BodyTextProps = {
  sendMessage: ReturnType<typeof useSendMessage>;
};

const BodyText = ({ sendMessage }: BodyTextProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<CSSProperties["height"]>("32px");
  const [message, setMessage] = useState<string>("");
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const enterPressed = useRef<boolean>(false);
  const shiftPressed = useRef<boolean>(false);

  const isMessageValid: boolean =
    regExpTest.chatMsg(message) && !isSendingMessage;

  const onSend = async () => {
    textareaRef.current?.focus();
    if (isMessageValid) {
      setIsSendingMessage(true);
      const result = await sendMessage("text", { text: message });
      if (result) setMessage("");
      setIsSendingMessage(false);
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
    if (!isSendingMessage) setMessage(msg);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
    onKeyEvent(e, true);
  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
    onKeyEvent(e, false);

  const resizeEvent = useCallback(() => {
    if (!wrapRef.current) return;
    const cacheHeight = wrapRef.current.style.height;
    wrapRef.current.style.height = "0";
    const newHeight = `${Math.max(
      Math.min(
        textareaRef.current ? textareaRef.current.scrollHeight : 0,
        document.body.clientHeight / 3
      ),
      32
    )}px`;
    wrapRef.current.style.height = cacheHeight;
    setHeight(newHeight);
  }, [setHeight]);

  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);
  useEffect(resizeEvent, [message]);

  return (
    <div ref={wrapRef} css={{ height: height }}>
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
          color: theme.black,
          padding: "8px 12px",
          boxSizing: "border-box",
        }}
      />
      <ButtonSend
        onClick={onSend}
        status={
          isSendingMessage ? "pending" : isMessageValid ? "active" : "inactive"
        }
      />
    </div>
  );
};

export default BodyText;
