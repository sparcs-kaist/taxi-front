import React from "react";
import ProfileImg from "@components/Mypage/ProfileImg";
import PropTypes from "prop-types";

const ChatSet = (props) => {
  const style = {
    position: "relative",
    display: "flex",
    paddingTop: "6px",
  };
  const styleProfCont = {
    marginLeft: "18px",
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    overflow: "hidden",
    filter:
      "drop-shadow(0px 1px 1px rgba(110, 54, 120, 0.05)) drop-shadow(0px 2px 1px rgba(110, 54, 120, 0.03)) drop-shadow(0px 1px 3px rgba(110, 54, 120, 0.11))",
  };
  const styleName = {
    height: "13px",
    lineHeight: "13px",
    fontSize: "11px",
    paddingBottom: "4px",
    paddingLeft: "5px",
    color: "#323232",
  };
  const styleChatCont = {
    display: "flex",
    marginBottom: "6px",
  };
  const styleChat = {
    background: "#FFFFFF",
    padding: "8px 12px 7px",
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "15px",
    color: "#323232",
  };
  return (
    <div style={style}>
      <div
        style={{
          width: "53px",
        }}
      >
        <div style={styleProfCont}>
          <ProfileImg path={props.chats[0].authorProfileUrl} />
        </div>
      </div>
      <div
        style={{
          width: "calc(100% - 71px)",
        }}
      >
        <div style={styleName}>{props.chats[0].authorName}</div>
        {props.chats.map((chat, index) => (
          <div key={index} style={styleChatCont}>
            <div style={styleChat}>{chat.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
ChatSet.propTypes = {
  chats: PropTypes.array,
};

export default ChatSet;
