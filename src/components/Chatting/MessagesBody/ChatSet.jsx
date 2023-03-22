import { useEffect, useState } from "react";
import moment from "tools/moment";
import ProfileImg from "components/Mypage/ProfileImg";
import ImageFullscreen from "components/Chatting/MessagesBody/ImageFullscreen";
import { getS3Url } from "tools/trans";
import PropTypes from "prop-types";
import theme from "styles/theme";
import ChatPaySettle from "./ChatPaySettle";
import WalletIcon from "@mui/icons-material/Wallet";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import hoverEventSet from "tools/hoverEventSet";
import CheckIcon from "@mui/icons-material/Check";
import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

const ChatAccount = (props) => {
  const bankName = props.account.split(" ")[0];
  const accounNumber = props.account.split(" ")[1];
  const [isClicked, setIsClicked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const setAlert = useSetRecoilState(alertAtom);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const nameStyle = {
    color: theme.gray_text,
  };
  const accountWrapperStyle = {
    display: "flex",
    gap: "6px",
  };
  const handleCopy = () => {
    if (!navigator.clipboard) {
      setAlert("복사를 지원하지 않는 브라우저입니다.");
      return;
    }
    navigator.clipboard.writeText(props.account);
    setIsCopied(true);
  };

  return (
    <div
      style={{
        width: "210px",
        height: "90px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "6px",
          alignItems: "center",
          ...theme.font16,
          color: theme.white,
          padding: "7px 10px 6px",
          boxSizing: "border-box",
          height: "32px",
          backgroundColor: theme.purple,
        }}
      >
        <WalletIcon />
        정산 계좌
      </div>
      <div
        style={{
          padding: "7px 10px 6px",
          ...theme.font14,
          color: theme.black,
          backgroundColor: props.isSideChat ? theme.purple_light : theme.white,
          width: "210px",
          height: "58px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {isCopied ? (
          <div style={accountWrapperStyle}>계좌가 복사되었습니다!</div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            <div style={accountWrapperStyle}>
              <div style={nameStyle}>은행</div>
              {bankName}
            </div>
            <div style={accountWrapperStyle}>
              <div style={nameStyle}>계좌</div>
              {accounNumber}
            </div>
          </div>
        )}

        <div
          style={{
            boxShadow: theme.shadow_gray_button_inset,
            color: theme.gray_text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            borderRadius: "6px",
            backgroundColor: theme.gray_background,
            cursor: "pointer",
          }}
          onClick={handleCopy}
          {...hoverEventSet(() => {}, setIsClicked)}
        >
          {isCopied ? (
            <CheckIcon
              style={{
                fontSize: "16px",
              }}
            />
          ) : (
            <ContentCopyIcon
              style={{
                fontSize: "16px",
              }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          ...theme.overlay(isClicked),
          position: "relative",
          width: "210px",
          height: "90px",
          top: "-90px",
          zIndex: theme.zIndex_modal,
        }}
      ></div>
    </div>
  );
};
ChatAccount.propTypes = {
  account: PropTypes.string,
  isSideChat: PropTypes.bool,
};

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
            maxHeight: "360px",
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
    maxWidth: "max(75%, 210px)",
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
      case "account":
        return <ChatAccount isSideChat={props.isSideChat} account={content} />;
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
