import React, { useEffect, useState, useRef } from "react";
import regExpTest from "tools/regExpTest";
import PropTypes from "prop-types";
import theme from "styles/theme";

import CropOriginalRoundedIcon from "@mui/icons-material/CropOriginalRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const BtnSend = (props) => {
  const style = {
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
BtnSend.propTypes = {
  enable: PropTypes.bool,
  onClick: PropTypes.func,
};

const BtnImage = (props) => {
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
BtnImage.propTypes = {
  onClick: PropTypes.func,
};

const FullChatMessageForm = (props) => {
  const textareaContRef = useRef();
  const textareaRef = useRef();
  const inputImage = useRef();
  const [message, setMessage] = useState("");
  const [formHeight, setFormHeight] = useState("28px");

  const enterPressed = useRef(false);
  const shiftPressed = useRef(false);

  const isMessageValid = () => {
    return regExpTest.chatMsg(message);
  };
  const onSend = () => {
    if (isMessageValid()) {
      const result = props.handleSendMessage(message);
      if (result) setMessage("");
    }
  };

  const onChangeMessage = (e) => {
    if (enterPressed.current && !shiftPressed.current) {
      onSend();
      return;
    }
    const msg = e.target.value;
    setMessage(msg);
  };
  const onChangeImage = (e) => {
    const image = e.target?.files?.[0];
    props.handleSendImage(image);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 16) shiftPressed.current = true;
    if (e.keyCode === 13) enterPressed.current = true;
  };
  const onKeyUp = (e) => {
    if (e.keyCode === 16) shiftPressed.current = false;
    if (e.keyCode === 13) enterPressed.current = false;
  };

  // resizeEvent
  const resizeEvent = () => {
    const cacheHeight = textareaContRef.current.style.height;
    textareaContRef.current.style.height = 0;
    const newHeight = `${Math.max(
      Math.min(
        textareaRef.current.scrollHeight,
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
    props.setContHeight(`calc(16px + ${formHeight})`);
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
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/heic"
        hidden
        ref={inputImage}
        onChange={onChangeImage}
      />
      <BtnImage onClick={() => inputImage.current.click()} />
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
        <BtnSend onClick={onSend} enable={isMessageValid()} />
      </div>
    </div>
  );
};

FullChatMessageForm.propTypes = {
  handleSendMessage: PropTypes.func,
  handleSendImage: PropTypes.func,
  setContHeight: PropTypes.func,
};

export default FullChatMessageForm;
