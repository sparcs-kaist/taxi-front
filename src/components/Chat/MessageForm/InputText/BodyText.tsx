import useSendMessage from "@/hooks/chat/useSendMessage";
import regExpTest from "@/tools/regExpTest";
import theme from "@/tools/theme";
import { css } from "@emotion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import ButtonSend from "./ButtonSend";

type BodyTextProps = {
  sendMessage: ReturnType<typeof useSendMessage>;
};

const BodyText = ({ sendMessage }: BodyTextProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>();
  const [height, setHeight] = useState<CSS["height"]>("32px");
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const isEnterPressed = useRef<boolean>(false);
  const isShiftPressed = useRef<boolean>(false);

  /* form height handler */
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
  }, []);
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  /* message validation handler */
  const [isMessageValidState, setIsMessageValidState] =
    useState<boolean>(false);
  const getIsMessageValid = useCallback(
    (message: string): boolean =>
      regExpTest.chatMsg(message) && !isSendingMessage,
    [isSendingMessage]
  );
  useEffect(
    () =>
      setIsMessageValidState(
        getIsMessageValid(textareaRef.current?.value || "")
      ),
    [getIsMessageValid]
  );

  /* send message handler */
  const onSend = async () => {
    if (!textareaRef.current) return;

    const message = textareaRef.current.value;
    const isMessageValid = getIsMessageValid(message);
    refreshTextArea();
    textareaRef.current.focus();
    resizeEvent();

    if (isMessageValid) {
      setIsSendingMessage(true);
      const result = await sendMessage("text", { text: message });
      if (!result) textareaRef.current.value = message;
      setIsSendingMessage(false);
    }
  };

  /* textarea event handler */
  const onChange = useCallback(
    (e: Event) => {
      if (!textareaRef.current) return;
      if (isSendingMessage) refreshTextArea();
      setIsMessageValidState(getIsMessageValid(textareaRef.current.value));

      if (isEnterPressed.current && !isShiftPressed.current) {
        onSend();
        return;
      }
      resizeEvent();
    },
    [isSendingMessage, getIsMessageValid, onSend]
  );
  const onKeyEvent = (e: KeyboardEvent, v: boolean) => {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight")
      isShiftPressed.current = v;
    if (e.code === "Enter") {
      if (textareaRef.current && !v && !isShiftPressed.current) {
        refreshTextArea();
        textareaRef.current.focus();
      }
      isEnterPressed.current = v;
    }
  };
  const onKeyDown = (e: KeyboardEvent) => onKeyEvent(e, true);
  const onKeyUp = (e: KeyboardEvent) => onKeyEvent(e, false);

  /* textarea refresh handler */
  const refreshTextArea = () => {
    if (!wrapRef.current) return;
    if (textareaRef.current) wrapRef.current.removeChild(textareaRef.current);
    const textarea = document.createElement("textarea");
    textarea.oninput = onChange;
    textarea.addEventListener("keydown", onKeyDown);
    textarea.addEventListener("keyup", onKeyUp);
    textarea.placeholder = "채팅을 입력해주세요";
    textarea.value = "";
    textareaRef.current = textarea;
    wrapRef.current.prepend(textarea);
    resizeEvent();
  };
  useEffect(refreshTextArea, [sendMessage]);

  return (
    <div
      ref={wrapRef}
      css={css`
        height: ${height};
        & > textarea {
          ${[
            css`
              width: calc(100% - 30px);
              height: 100%;
              background: none;
              border: none;
              resize: none;
              outline: none;
              color: ${theme.black};
              padding: 8px 12px;
              box-sizing: border-box;
            `,
            theme.font14,
          ]}
        }
      `}
    >
      <ButtonSend
        onClick={onSend}
        status={
          isSendingMessage
            ? "pending"
            : isMessageValidState
            ? "active"
            : "inactive"
        }
      />
    </div>
  );
};

export default BodyText;
