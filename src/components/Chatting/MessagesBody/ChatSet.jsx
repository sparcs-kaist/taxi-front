import React, { useEffect, useState } from "react";
import moment from "moment";
import ProfileImg from "@components/Mypage/ProfileImg";
import { getS3Url } from "@tools/trans";
import PropTypes from "prop-types";

// FIXME : default 이미지 변경
import defaultImg from "@assets/profileImgOnError.png";

const ChatImage = (props) => {
  const getSrc = () => getS3Url(`/chat-img/${props.id}`);
  const [src, setSrc] = useState(getSrc());
  useEffect(() => {
    setSrc(getSrc());
  }, [props.id]);

  return (
    <img
      src={src}
      alt={`/chat-img/${props.id}`}
      onError={() => setSrc(defaultImg)}
      style={{
        maxWidth: "100%",
        maxHeight: "400px",
      }}
    />
  );
};
ChatImage.propTypes = {
  id: PropTypes.string,
};

const ChatSet = (props) => {
  const itsme = props.authorId === props.chats[0].authorId;
  const style = {
    position: "relative",
    display: "flex",
    paddingTop: "6px",
  };
  const styleProfCont = {
    display: itsme ? "none" : null,
    marginLeft: "18px",
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    overflow: "hidden",
    filter:
      "drop-shadow(0px 1px 1px rgba(110, 54, 120, 0.05)) drop-shadow(0px 2px 1px rgba(110, 54, 120, 0.03)) drop-shadow(0px 1px 3px rgba(110, 54, 120, 0.11))",
  };
  const styleName = {
    display: itsme ? "none" : null,
    height: "13px",
    lineHeight: "13px",
    fontSize: "11px",
    paddingBottom: "4px",
    paddingLeft: "5px",
    color: "#323232",
  };
  const styleChatCont = {
    display: "flex",
    flexDirection: itsme ? "row-reverse" : "row",
    position: "relative",
    marginBottom: "6px",
    gap: "4px",
  };
  const styleChat = {
    maxWidth: "calc(100% - 70px)",
    background: itsme ? "#6E3678" : "#FFFFFF",
    padding: "8px 12px 7px",
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "15px",
    color: itsme ? "#FFFFFF" : "#323232",
    overflow: "hidden",
    wordBreak: "break-all",
    letterSpacing: "0.05em",
  };
  const styleTime = {
    height: "11px",
    lineHeight: "11px",
    marginTop: "auto",
    fontSize: "9px",
    color: "#888888",
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
            <div
              style={{
                ...styleChat,
                padding: chat.type === "text" ? "8px 12px 7px" : null,
              }}
            >
              {chat.type === "text" ? (
                chat.content
              ) : (
                <ChatImage id={chat.content} />
              )}
            </div>
            {index === props.chats.length - 1 ? (
              <div style={styleTime}>
                {moment(chat.time).hour()}시 {moment(chat.time).minute()}분
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
ChatSet.propTypes = {
  chats: PropTypes.array,
  authorId: PropTypes.string,
};

export default ChatSet;
