import { useEffect, useState, useRef } from "react";
import regExpTest from "tools/regExpTest";
import PropTypes from "prop-types";
import theme from "styles/theme";

import CropOriginalRoundedIcon from "@mui/icons-material/CropOriginalRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PopupAccount from "./Popup/PopupAccount";

type BtnSendProps = {
  enable: boolean;
  onClick: () => void;
};

const BtnSend = (props: BtnSendProps) => {
  const style: React.CSSProperties = {
    position: "absolute",
    width: "28px",
    height: "28px",
    bottom: "2px",
    right: "2px",
    backgroundColor: props.enable ? theme.purple : theme.gray_background,
    borderRadius: "14px",
    boxShadow: theme.shadow_gray_input_inset,
    ...theme.cursor(!props.enable),
  };
  return (
    <div style={style} onClick={props.onClick}>
      <ArrowUpwardRoundedIcon
        style={{
          fontSize: "22px",
          margin: "3px",
          fill: props.enable ? theme.white : theme.gray_line,
        }}
      />
    </div>
  );
};

type BtnImageProps = {
  onClick: () => void;
};

const BtnImage = (props: BtnImageProps) => {
  const style = {
    width: "22px",
    minWidth: "22px",
    height: "22px",
    marginBottom: "5px",
    ...theme.cursor(),
  };
  return (
    <div style={style} onClick={props.onClick}>
      <CropOriginalRoundedIcon
        style={{ width: "100%", height: "100%", fill: theme.gray_text }}
      />
    </div>
  );
};

type BtnAccountProps = {
  onClick: () => void;
};

const BtnAccount = (props: BtnAccountProps) => {
  const style = {
    width: "22px",
    minWidth: "22px",
    height: "22px",
    marginBottom: "5px",
    ...theme.cursor(),
  };
  return (
    <div style={style} onClick={props.onClick}>
      <LocalAtmIcon
        style={{ width: "100%", height: "100%", fill: theme.gray_text }}
      />
    </div>
  );
};

type FullChatMessageFormProps = {
  handleSendMessage: (message: string) => boolean;
  handleSendImage: (image: File) => void;
  handleSendAccount: (account: string) => void;
  setContHeight: (height: PixelValue) => void;
};

const FullChatMessageForm = (props: FullChatMessageFormProps) => {
  const textareaContRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputImage = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [formHeight, setFormHeight] = useState("28px");
  const [popupAccount, setPopupAccount] = useState(false);

  const enterPressed = useRef(false);
  const shiftPressed = useRef(false);

  const isMessageValid = () => {
    return regExpTest.chatMsg(message);
  };
  const onSend = () => {
    textareaRef.current?.focus();
    if (isMessageValid()) {
      const result = props.handleSendMessage(message);
      if (result) setMessage("");
    }
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (enterPressed.current && !shiftPressed.current) {
      onSend();
      return;
    }
    const msg = e.target.value;
    setMessage(msg);
  };
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target?.files?.[0];
    if (!image) return;
    props.handleSendImage(image);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight")
      shiftPressed.current = true;
    if (e.code === "Enter") enterPressed.current = true;
  };
  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight")
      shiftPressed.current = false;
    if (e.code === "Enter") enterPressed.current = false;
  };

  // resizeEvent
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
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);
  useEffect(() => {
    resizeEvent();
  }, [message]);
  useEffect(() => {
    props.setContHeight(`calc(16px + ${formHeight})` as PixelValue);
  }, [formHeight]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "100%",
        columnGap: "10px",
        padding: "8px 12px",
        boxSizing: "border-box",
        background: theme.white,
        borderRadius: "0 0 12px 12px",
      }}
    >
      <PopupAccount
        popup={popupAccount}
        onClickClose={() => setPopupAccount(false)}
        onClickOk={props.handleSendAccount}
      />
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/heic"
        hidden
        ref={inputImage}
        onChange={onChangeImage}
      />
      <BtnImage onClick={() => inputImage.current?.click()} />
      <BtnAccount onClick={() => setPopupAccount(true)} />
      <div
        ref={textareaContRef}
        style={{
          position: "relative",
          background: theme.purple_light,
          boxShadow: theme.shadow_purple_input_inset,
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          height: formHeight,
          color: theme.black,
        }}
      >
        <textarea
          ref={textareaRef}
          value={message}
          placeholder="채팅을 입력해주세요"
          onChange={onChangeMessage}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          style={{
            width: "100%",
            height: "100%",
            background: "none",
            border: "none",
            resize: "none",
            outline: "none",
            ...theme.font14,
            padding: "8px 46px 8px 12px",
            boxSizing: "border-box",
          }}
        />
        <PopupAccount
          popup={popupAccount}
          onClickClose={() => setPopupAccount(false)}
          onClickOk={(account: string) => {
            setPopupAccount(false);
            props.handleSendAccount(account);
          }}
        />
        <BtnSend onClick={onSend} enable={isMessageValid()} />
      </div>
    </div>
  );
};

export default FullChatMessageForm;
