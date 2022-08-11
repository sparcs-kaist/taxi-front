import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import { IoMdSend } from "react-icons/io";
import { BsImageFill } from "react-icons/bs";
import regExpTest from "tools/regExpTest";

const BtnSend = (props) => {
  const style = useSpring({});
  return <animated.div style={style}></animated.div>;
};

const FullChatMessageForm = (props) => {
  const textareaContRef = useRef();
  const textareaRef = useRef();
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
            width: "calc(100% - 12px)",
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
          }}
        />
        <BtnSend />
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
