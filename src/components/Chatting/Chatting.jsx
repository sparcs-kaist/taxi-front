import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useRecoilValue } from "recoil";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { useRecoilState } from "recoil";
import Header from "./Header/Header";
import MessagesBody from "./MessagesBody/MessagesBody";
import MessageForm from "./MessageForm/MessageForm";
import regExpTest from "tools/regExpTest";
import { useR2state } from "hooks/useReactiveState";

import { ioServer } from "serverconf";
import convertImg from "tools/convertImg";
import axios from "tools/axios";
import axiosOri from "axios";
import useTaxiAPI from "hooks/useTaxiAPI";
import myRoomAtom from "recoil/myRoom";

const Chatting = (props) => {
  const sendingMessage = useRef();
  const callingInfScroll = useRef();
  const isBottomOnScrollCache = useRef(true);
  const roomIdCache = useRef();
  const messagesBody = useRef();
  const history = useHistory();

  const [chats, setChats] = useStateWithCallbackLazy([]);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [messageFormHeight, setMessageFormHeight] =
    useStateWithCallbackLazy("48px");

  const socket = useRef(undefined);
  const reactiveState = useR2state();
  const prevReactiveState = useRef(reactiveState);
  const [, setMyRoom] = useRecoilState(myRoomAtom);
  const [headerInfToken, setHeaderInfToken] = useState(Date.now().toString());
  const userInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const [, headerInfo] = useTaxiAPI.get(
    `/rooms/v2/info?id=${props.roomId}`,
    {},
    [headerInfToken]
  );
  const [, roomList] = useTaxiAPI.get("/rooms/v2/searchByUser", {}, [
    headerInfToken,
  ]);

  useEffect(() => {
    if (reactiveState !== 3 && prevReactiveState.current === 3) {
      history.replace(`/myroom/${props.roomId}`);
    }
    if (reactiveState === 3 && prevReactiveState.current !== 3)
      prevReactiveState.current = reactiveState;
  }, [reactiveState]);

  // Update the ongoing room list
  useEffect(() => {
    setMyRoom(roomList);
  }, [roomList]);

  // scroll event
  const isTopOnScroll = (tol = 20) => {
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

  // socket setting
  useEffect(() => {
    if (headerInfo && userInfoDetail && roomIdCache.current !== props.roomId) {
      roomIdCache.current = props.roomId;

      socket.current?.disconnect();
      socket.current = io(ioServer, {
        withCredentials: true,
      });

      // when join chatting
      socket.current.on("chats-join", (data) => {
        setChats(data.chats, () => {
          scrollToBottom();
          callingInfScroll.current = false;
        });
      });

      // when receive chat
      socket.current.on("chats-receive", (data) => {
        if (data.chat.authorId === userInfoDetail.oid) {
          sendingMessage.current = null;
        }
        const callback =
          data.chat.authorId === userInfoDetail.oid || isBottomOnScroll()
            ? () => scrollToBottom(true)
            : () => setShowNewMessage(true);

        setChats((prevChats) => [...prevChats, data.chat], callback);
      });

      // load more chats upon receiving chats-load event (infinite scroll)
      socket.current.on("chats-load", (data) => {
        if (data.chats.length === 0) {
          callingInfScroll.current = null;
          return;
        }

        const checkoutChat = { type: "inf-checkout" };
        setChats(
          (prevChats) => [...data.chats, checkoutChat, ...prevChats],
          () => {
            let scrollTop = 0;
            const bodyChildren = messagesBody.current.children[0].children;
            for (let i = 0; i < bodyChildren.length; i++) {
              if (bodyChildren[i].getAttribute("chatcheckout")) break;
              scrollTop += bodyChildren[i].clientHeight;
            }
            messagesBody.current.scrollTop = scrollTop;
            callingInfScroll.current = false;
          }
        );
      });

      socket.current.emit("chats-join", props.roomId);
    }
    // FIXME : when error

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [headerInfo, userInfoDetail]);

  // resize event
  const resizeEvent = () => {
    if (isBottomOnScrollCache.current) scrollToBottom();
  };
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  // message function
  const handleSendMessage = (text) => {
    if (regExpTest.chatMsg(text) && !sendingMessage.current) {
      sendingMessage.current = true;
      socket.current.emit("chats-send", {
        roomId: props.roomId,
        content: text,
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
        if (!image) {
          onFail();
          return;
        }
        axios
          .post("chats/uploadChatImg/getPUrl", { type: image.type })
          .then(async ({ data }) => {
            if (data.url && data.fields) {
              const formData = new FormData();
              for (const key in data.fields) {
                formData.append(key, data.fields[key]);
              }
              formData.append("file", image);
              const res = await axiosOri.post(data.url, formData);
              if (res.status === 204) {
                const res2 = await axios.post("chats/uploadChatImg/done", {
                  id: data.id,
                });
                if (!res2.data.result) onFail();
              } else {
                onFail();
              }
            } else {
              onFail();
            }
          })
          .catch((e) => {
            onFail();
          });
      } catch (e) {
        // FIXME
        onFail();
        console.log(e);
      }
    }
  };

  return (
    <>
      <Header
        isSideChat={props.isSideChat}
        info={headerInfo}
        recallEvent={() => setHeaderInfToken(Date.now().toString())}
      />
      <MessagesBody
        isSideChat={props.isSideChat}
        chats={chats}
        user={userInfoDetail}
        forwardedRef={messagesBody}
        handleScroll={handleScroll}
        isBottomOnScroll={isBottomOnScroll}
        scrollToBottom={() => scrollToBottom(false)}
        marginBottom={messageFormHeight}
      />
      <MessageForm
        isSideChat={props.isSideChat}
        handleSendMessage={handleSendMessage}
        handleSendImage={handleSendImage}
        showNewMessage={showNewMessage}
        onClickNewMessage={() => scrollToBottom(true)}
        setContHeight={handleMessageFormHeight}
      />
    </>
  );
};

Chatting.propTypes = {
  isSideChat: PropTypes.bool,
  roomId: PropTypes.string,
};

export default Chatting;
