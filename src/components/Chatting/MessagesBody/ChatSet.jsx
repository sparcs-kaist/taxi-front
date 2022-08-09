import React, { useEffect, useState } from "react";
import moment from "moment";
import ProfileImg from "@components/Mypage/ProfileImg";
import { getS3Url } from "@tools/trans";
import PropTypes from "prop-types";

const ChatImageLoading = (props) => {
  return <div>이미지 불러오는 중...</div>;
};

const ChatImage = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imageObj = new Image();
    imageObj.onload = () => {
      const doScroll = props.isBottomOnScroll();
      setImage(
        <img
          src={getS3Url(`/chat-img/${props.id}`)}
          style={{ maxWidth: "100%", maxHeight: "400px" }}
          onLoad={() => {
            if (doScroll) props.scrollToBottom();
          }}
        />
      );
    };
    imageObj.src = getS3Url(`/chat-img/${props.id}`);
    //setSrc(image);
  }, [props.id]);

  return image ? image : <ChatImageLoading />;
};
ChatImage.propTypes = {
  id: PropTypes.string,
  isBottomOnScroll: PropTypes.func,
  scrollToBottom: PropTypes.func,
};

const ChatText = (props) => {
  return (
    <div
      style={{
        padding: "8px 12px 7px",
        color: props.itsme ? "#FFFFFF" : "#323232",
        wordBreak: "break-all",
        letterSpacing: "0.05em",
        fontSize: "13px",
      }}
    >
      {props.text}
    </div>
  );
};
ChatText.propTypes = {
  itsme: PropTypes.bool,
  text: PropTypes.string,
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
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
    borderRadius: "8px",
    lineHeight: "15px",
    overflow: "hidden",
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
            <div style={styleChat}>
              {chat.type === "text" ? (
                <ChatText itsme={itsme} text={chat.content} />
              ) : (
                <ChatImage
                  id={chat.content}
                  isBottomOnScroll={props.isBottomOnScroll}
                  scrollToBottom={props.scrollToBottom}
                />
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
  isBottomOnScroll: PropTypes.func,
  scrollToBottom: PropTypes.func,
};

export default ChatSet;
