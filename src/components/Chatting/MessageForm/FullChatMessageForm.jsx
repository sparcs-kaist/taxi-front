import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import regExpTest from "tools/regExpTest";
import PropTypes from "prop-types";
import { theme } from "styles/theme";

import { IoMdSend } from "react-icons/io";
import { BsImageFill } from "react-icons/bs";

const BtnSend = (props) => {
  const style = useSpring({
    position: "absolute",
    width: "20px",
    height: "20px",
    bottom: "4px",
    right: "7px",
    cursor: theme.cursor(!props.enable),
  });
  return (
    <animated.div style={style} onClick={props.onClick}>
      <IoMdSend
        style={{
          width: "100%",
          height: "100%",
          fill: props.enable ? "#323232" : "#888888",
        }}
      />
    </animated.div>
  );
};
BtnSend.propTypes = {
  enable: PropTypes.bool,
  onClick: PropTypes.func,
};

const BtnImage = (props) => {
  const style = useSpring({
    position: "absolute",
    width: "16px",
    height: "16px",
    bottom: "12px",
    left: "19px",
    cursor: theme.cursor(),
  });
  return (
    <animated.div style={style} onClick={props.onClick}>
      <BsImageFill style={{ width: "100%", height: "100%", fill: "#323232" }} />
    </animated.div>
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
    props.setContHeight(`calc(12px + ${formHeight})`);
  }, [formHeight]);

  return (
    <div
      style={{
        position: "relative",
        background: "white",
        minHeight: "40px",
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
      <div style={{ height: "6px" }} />
      <div
        ref={textareaContRef}
        style={{
          position: "relative",
          background: "#EEEEEE",
          boxShadow: "inset 1px 1px 2.5px -1px rgba(0, 0, 0, 0.075)",
          borderRadius: "8px",
          marginLeft: "53px",
          marginRight: "18px",
          overflow: "hidden",
          minHeight: "28px",
          height: formHeight,
          color: "#323232",
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
            width: "calc(100% - 46px)",
            height: "calc(100% - 12px)",
            background: "none",
            border: "none",
            resize: "none",
            outline: "none",
            fontSize: "14px",
            lineHeight: "16px",
            paddingTop: "6px",
            paddingBottom: "6px",
            paddingLeft: "12px",
            paddingRight: "34px",
          }}
        />
        <BtnSend onClick={onSend} enable={isMessageValid()} />
      </div>
      <div style={{ height: "6px" }} />
    </div>
  );
};

FullChatMessageForm.propTypes = {
  handleSendMessage: PropTypes.func,
  handleSendImage: PropTypes.func,
  setContHeight: PropTypes.func,
};

export default FullChatMessageForm;
