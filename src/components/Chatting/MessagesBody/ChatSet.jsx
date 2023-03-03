import React, { useEffect, useState } from "react";
import moment from "tools/moment";
import ProfileImg from "components/Mypage/ProfileImg";
import ImageFullscreen from "components/Chatting/MessagesBody/ImageFullscreen";
import { getS3Url } from "tools/trans";
import isMobile from "tools/isMobile";
import PropTypes from "prop-types";
import theme from "styles/theme";
import ChatPaySettle from "./ChatPaySettle";

const ChatImageLoading = (props) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "7px 10px 6px",
      }}
    >
      <div
        style={{
          color: props.itsme ? theme.white : theme.black,
          ...theme.font14,
        }}
      >
        이미지 불러오는 중...
      </div>
    </div>
  );
};
ChatImageLoading.propTypes = {
  itsme: PropTypes.bool,
};

const ChatImage = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imageObj = new Image();
    const src = getS3Url(`/chat-img/${props.id}`);
    imageObj.onload = () => {
      const doScroll = props.isBottomOnScroll(40);
      setImage(
        <img
          src={src}
          style={{
            maxWidth: "100%",
            maxHeight: isMobile ? "360px" : "210px",
            verticalAlign: "middle",
            cursor: "pointer",
          }}
          //loading="lazy"
          onLoad={() => {
            if (doScroll) props.scrollToBottom();
          }}
          onClick={() => {
            props.setFullImage(src);
          }}
        />
      );
    };
    imageObj.loading = "eager";
    imageObj.src = getS3Url(`/chat-img/${props.id}`);
  }, [props.id]);

  return image ? image : <ChatImageLoading itsme={props.itsme} />;
};
ChatImage.propTypes = {
  itsme: PropTypes.bool,
  id: PropTypes.string,
  isBottomOnScroll: PropTypes.func,
  scrollToBottom: PropTypes.func,
  setFullImage: PropTypes.func,
};

const ChatText = (props) => {
  return (
    <div
      style={{
        padding: "7px 10px 6px",
        color: props.itsme ? theme.white : theme.black,
        wordBreak: "break-all",
        ...theme.font14,
        whiteSpace: "pre-line",
      }}
      className="selectable"
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
  const [fullImage, setFullImage] = useState("");
  const itsme = props.authorId === props.chats[0].authorId;
  const style = {
    position: "relative",
    display: "flex",
    paddingTop: "10px",
  };
  const styleProfCont = {
    display: itsme ? "none" : null,
    marginLeft: "18px",
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: theme.shadow,
  };
  const styleName = {
    display: itsme ? "none" : null,
    ...theme.font12,
    paddingLeft: "5px",
    color: theme.black,
    margin: "1px 0 -2px",
  };
  const styleChatCont = {
    display: "flex",
    flexDirection: itsme ? "row-reverse" : "row",
    alignItems: "flex-end",
    position: "relative",
    gap: "4px",
  };
  const styleChat = {
    maxWidth: isMobile ? "75%" : "210px",
    boxShadow: props.isSideChat
      ? itsme
        ? theme.shadow_purple_button_inset
        : theme.shadow_purple_input_inset
      : theme.shadow,
    borderRadius: "8px",
    overflow: "hidden",
  };
  const getBackground = (type) => {
    if (type === "pay" || type === "settlement") {
      if (itsme) return theme.purple_dark;
      return theme.gray_background;
    }
    if (itsme) return theme.purple;
    if (props.isSideChat) return theme.purple_hover;
    return theme.white;
  };
  const styleTime = {
    ...theme.font8,
    color: theme.gray_text,
    marginBottom: "1px",
    minWidth: "fit-content",
  };

  const handleOpen = () => {
    props.setIsOpen(true);
    props.setPath(props.chats[0].authorProfileUrl);
    props.setName(props.chats[0].authorName);
    props.setReportedId(props.chats[0].authorId);
  };

  const onClose = () => {
    setFullImage("");
  };

  const getChat = (type, content) => {
    switch (type) {
      case "text":
        return <ChatText itsme={itsme} text={content} />;
      case "s3img":
        return (
          <ChatImage
            itsme={itsme}
            id={content}
            isBottomOnScroll={props.isBottomOnScroll}
            scrollToBottom={props.scrollToBottom}
            setFullImage={setFullImage}
          />
        );
      case "payment":
      case "settlement":
        return <ChatPaySettle itsme={itsme} type={type} />;
      default:
        return <></>;
    }
  };

  return (
    <div style={style}>
      {fullImage ? (
        <ImageFullscreen path={fullImage} onClose={onClose} />
      ) : null}
      <div
        style={{
          width: "53px",
        }}
      >
        <div style={styleProfCont} onClick={handleOpen}>
          <ProfileImg path={props.chats[0].authorProfileUrl} />
        </div>
      </div>
      <div
        style={{
          width: "calc(100% - 71px)",
          display: "flex",
          flexDirection: "column",
          rowGap: "6px",
        }}
      >
        <div style={styleName} className="selectable">
          {props.chats[0].authorName}
        </div>
        {props.chats.map((chat, index) => (
          <div key={index} style={styleChatCont}>
            <div
              style={{
                ...styleChat,
                backgroundColor: getBackground(chat.type),
              }}
            >
              {getChat(chat.type, chat.content)}
            </div>
            {index === props.chats.length - 1 ? (
              <div style={styleTime} className="selectable">
                {moment(chat.time).format("H시 mm분")}
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
  setIsOpen: PropTypes.func,
  setPath: PropTypes.func,
  setName: PropTypes.func,
  setReportedId: PropTypes.func,
  isSideChat: PropTypes.bool,
};

export default ChatSet;
