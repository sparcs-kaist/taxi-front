import axiosOri from "axios";
import PropTypes from "prop-types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import useDateToken from "hooks/useDateToken";
import { useR2state } from "hooks/useReactiveState";
import { useAxios, useQuery } from "hooks/useTaxiAPI";

import Container from "./Container";
import Header from "./Header";
import MessageForm from "./MessageForm";
import MessagesBody from "./MessagesBody";

import loginInfoDetailAtom from "atoms/loginInfoDetail";
import { useRecoilValue } from "recoil";

import convertImg from "tools/convertImg";
import regExpTest from "tools/regExpTest";
import {
  registerSocketEventListener,
  resetSocketEventListener,
} from "tools/socket";

const Chatting = (props) => {
  const sendingMessage = useRef();
  const callingInfScroll = useRef();
  const isBottomOnScrollCache = useRef(true);
  const messagesBody = useRef();
  const history = useHistory();
  const axios = useAxios();

  const [chats, setChats] = useStateWithCallbackLazy([]);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [, setMessageFormHeight] = useStateWithCallbackLazy("48px");

  const socket = useRef(undefined);
  const reactiveState = useR2state();
  const prevReactiveState = useRef(reactiveState);
  const { oid: userOid } = useRecoilValue(loginInfoDetailAtom) || {};
  const [headerInfoToken, fetchHeaderInfo] = useDateToken();
  const [, headerInfo] = useQuery.get(`/rooms/info?id=${props.roomId}`, {}, [
    headerInfoToken,
  ]);

  useLayoutEffect(() => {
    if (!callingInfScroll.current) return;

    callingInfScroll.current = false;
    let scrollTop = -34; // 34는 ChatDate의 높이
    const bodyChildren = messagesBody.current.children;
    for (const children of bodyChildren) {
      if (children.getAttribute("chatcheckout")) break;
      scrollTop += children.clientHeight;
    }
    messagesBody.current.scrollTop = scrollTop;
  }, [chats]);

  useEffect(() => {
    if (reactiveState !== 3 && prevReactiveState.current === 3) {
      history.replace(`/myroom/${props.roomId}`);
    }
    if (reactiveState === 3 && prevReactiveState.current !== 3)
      prevReactiveState.current = reactiveState;
  }, [reactiveState]);

  // scroll event
  const isTopOnScroll = (tol = 0) => {
    if (messagesBody.current) {
      const scrollTop = Math.max(messagesBody.current.scrollTop, 0);
      if (scrollTop <= tol) {
        return true;
      }
    }
    return false;
  };
  const isBottomOnScroll = (tol = 20) => {
    if (messagesBody.current) {
      const scrollHeight = messagesBody.current.scrollHeight;
      const scrollTop = Math.max(messagesBody.current.scrollTop, 0);
      const clientHeight = messagesBody.current.clientHeight;
      const scrollBottom = Math.max(scrollHeight - clientHeight - scrollTop, 0);
      if (scrollBottom <= tol) {
        return true;
      }
    }
    return false;
  };
  const handleScroll = () => {
    if (isBottomOnScroll()) {
      if (showNewMessage) setShowNewMessage(false);
      isBottomOnScrollCache.current = true;
    } else {
      isBottomOnScrollCache.current = false;
    }

    if (
      isTopOnScroll() &&
      chats.length > 0 &&
      callingInfScroll.current == false
    ) {
      callingInfScroll.current = true;
      socket.current.emit("chats-load", chats[0].time, 30);
    }
  };

  // message Body auto scroll functions
  const scrollToBottom = (doAnimation = false) => {
    setShowNewMessage(false);
    if (messagesBody.current) {
      const scrollTop =
        messagesBody.current.scrollHeight - messagesBody.current.clientHeight;
      if (doAnimation) {
        messagesBody.current.scroll({
          behavior: "smooth",
          top: scrollTop,
        });
      } else {
        messagesBody.current.scrollTop = scrollTop;
      }
    }
  };

  // messageFrom Height function
  const handleMessageFormHeight = (height) => {
    let isBottom = isBottomOnScroll();
    setMessageFormHeight(height, () => {
      if (isBottom) scrollToBottom();
    });
  };

  // socket event
  useEffect(() => {
    registerSocketEventListener({
      initListener: (_roomId, chats) => {
        console.log(_roomId, chats);
        // setChats(data.chats, () => {
        //   scrollToBottom();
        //   callingInfScroll.current = false;
        // });
      },
      pushBackListener: (_roomId, chats) => {
        console.log(_roomId, chats);
        // if (data.chat.authorId === useOid) {
        //   sendingMessage.current = null;
        // }
        // const callback =
        //   data.chat.authorId === userOid || isBottomOnScroll()
        //     ? () => scrollToBottom(true)
        //     : () => setShowNewMessage(true);
        // setChats((prevChats) => [...prevChats, data.chat], callback);
      },
      pushFrontListener: (_roomId, chats) => {
        console.log(_roomId, chats);
        // if (data.chats.length === 0) {
        //   callingInfScroll.current = null;
        //   return;
        // }
        // const checkoutChat = { type: "inf-checkout" };
        // setChats((prevChats) => [...data.chats, checkoutChat, ...prevChats]);
      },
    });
    return resetSocketEventListener;
  }, [props.roomId]);

  // resize event
  const resizeEvent = () => {
    if (isBottomOnScrollCache.current) scrollToBottom();
  };
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    visualViewport?.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
      visualViewport?.removeEventListener("resize", resizeEvent);
    };
  }, []);

  // message function
  const handleSendMessage = (text) => {
    if (regExpTest.chatMsg(text) && !sendingMessage.current) {
      sendingMessage.current = true;
      socket.current.emit("chats-send", {
        roomId: props.roomId,
        content: text,
        type: "text",
      });
      return true;
    }
    return false;
  };
  const handleSendImage = async (image) => {
    if (!sendingMessage.current) {
      sendingMessage.current = true;
      const onFail = () => {
        sendingMessage.current = null;
      };
      try {
        image = await convertImg(image);
        if (!image) return onFail();
        axios({
          url: "chats/uploadChatImg/getPUrl",
          method: "post",
          data: { type: image.type },
          onSuccess: async ({ url, fields, id }) => {
            if (!url || !fields) return onFail();
            const formData = new FormData();
            for (const key in fields) {
              formData.append(key, fields[key]);
            }
            formData.append("file", image);
            const { status: s3Status } = await axiosOri.post(url, formData);
            if (s3Status !== 204) return onFail();
            axios({
              url: "chats/uploadChatImg/done",
              method: "post",
              data: { id },
              onSuccess: ({ result }) => {
                if (!result) onFail();
              },
              onError: onFail,
            });
          },
          onError: onFail,
        });
      } catch (e) {
        console.error(e);
        onFail();
      }
    }
  };
  const handleSendAccount = (account) => {
    if (!sendingMessage.current) {
      sendingMessage.current = true;
      socket.current.emit("chats-send", {
        roomId: props.roomId,
        content: account,
        type: "account",
      });
      return true;
    }
    return false;
  };

  return (
    <Container layoutType={props.layoutType}>
      <Header
        layoutType={props.layoutType}
        info={headerInfo}
        recallEvent={fetchHeaderInfo}
      />
      <MessagesBody
        layoutType={props.layoutType} // fixme : is required?
        chats={chats}
        forwardedRef={messagesBody}
        handleScroll={handleScroll}
        isBottomOnScroll={isBottomOnScroll}
        scrollToBottom={() => scrollToBottom(false)}
      />
      <MessageForm
        layoutType={props.layoutType}
        handleSendMessage={handleSendMessage}
        handleSendImage={handleSendImage}
        handleSendAccount={handleSendAccount}
        showNewMessage={showNewMessage}
        onClickNewMessage={() => scrollToBottom(true)}
        setContHeight={handleMessageFormHeight}
      />
    </Container>
  );
};

Chatting.propTypes = {
  layoutType: PropTypes.oneOf(["sidechat", "fullchat"]),
  roomId: PropTypes.string,
};

export default Chatting;
