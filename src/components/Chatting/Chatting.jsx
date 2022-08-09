import React, { useState, useEffect, useRef } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import FullChatHeader from "./Header/FullChatHeader";
import SideChatHeader from "./Header/SideChatHeader";
import MessagesBody from "./MessagesBody/MessagesBody";
import MessageForm from "./Input/MessageForm";
import regExpTest from "@tools/regExpTest";

import { backServer } from "serverconf";
import convertImg from "@tools/convertImg";
import axios from "@tools/axios";
import axiosOri from "axios";
import useTaxiAPI from "@components/Frame/useTaxiAPI/useTaxiAPI";

import "./Style/Chatting.css";

const Chatting = (props) => {
  const sendingMessage = useRef();
  const messagesBody = useRef();

  const [chats, setChats] = useStateWithCallbackLazy([]);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const socket = useRef(undefined);
  const [, userInfoDetail] = useTaxiAPI.get("/json/logininfo/detail");
  const [, headerInfo] = useTaxiAPI.get(`/rooms/info?id=${props.roomId}`);

  // scroll event
  const isTopOnScroll = () => {
    if (messagesBody.current) {
      const scrollTop = Math.max(messagesBody.current.scrollTop, 0);
      if (scrollTop <= 20) {
        return true;
      }
    }
    return false;
  };
  const isBottomOnScroll = () => {
    if (messagesBody.current) {
      const scrollHeight = messagesBody.current.scrollHeight;
      const scrollTop = Math.max(messagesBody.current.scrollTop, 0);
      const clientHeight = messagesBody.current.clientHeight;
      const scrollBottom = Math.max(scrollHeight - clientHeight - scrollTop, 0);
      if (scrollBottom <= 20) {
        return true;
      }
    }
    return false;
  };
  const handleScroll = () => {
    // check if scroll is at the top, send chats-load event
    // 맨 상단의 경우 인피니티 스크롤 요청을 call하면 안됨
    /*if (isTopOnScroll() && !isInfScrollLoading.current && chats.length > 0) {
      isInfScrollLoading.current = true;
      socket.current.emit("chats-load", chats[0].time, 30);
    }*/
    if (isBottomOnScroll()) {
      if (showNewMessage) setShowNewMessage(false);
    }
  };

  // message Body auto scroll functions
  const scrollToBottom = (doAnimation = false) => {
    setShowNewMessage(false);
    if (messagesBody.current) {
      if (doAnimation) {
        messagesBody.current.scroll({
          behavior: "smooth",
          top: messagesBody.current.scrollHeight,
        });
      } else {
        messagesBody.current.scrollTop = messagesBody.current.scrollHeight;
      }
    }
  };

  // socket setting
  useEffect(() => {
    if (headerInfo) {
      socket.current?.disconnect();
      socket.current = io(backServer, {
        withCredentials: true,
      });

      // when join chatting
      socket.current.on("chats-join", (data) => {
        setChats(data.chats, () => scrollToBottom());
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
      socket.current.on("chats-load", (loadChats) => {
        /*const bottom =
          messagesBody.current.scrollHeight - messagesBody.current.scrollTop;
        setChats((prevChats) => {
          return [...loadChats.chats, ...prevChats];
        });
        isInfScrollLoading.current = false;
        messagesBody.current.scrollTop =
          messagesBody.current.scrollHeight - bottom;*/
      });

      socket.current.emit("chats-join", props.roomId);
    }
    // FIXME : when error

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [headerInfo]);

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
    <div className="ChatContainer">
      <div className="ChatRoomContainer">
        {props.isSideChat ? (
          <SideChatHeader info={headerInfo} />
        ) : (
          <FullChatHeader info={headerInfo} />
        )}
        <MessagesBody
          isSideChat={props.isSideChat}
          chats={chats}
          user={userInfoDetail}
          forwardedRef={messagesBody}
          handleScroll={handleScroll}
          isBottomOnScroll={isBottomOnScroll}
        />
        <MessageForm
          isSideChat={props.isSideChat}
          handleSendMessage={handleSendMessage}
          handleSendImage={handleSendImage}
          showNewMessage={showNewMessage}
          onClickNewMessage={() => scrollToBottom(true)}
        />
      </div>
    </div>
  );
};

Chatting.propTypes = {
  isSideChat: PropTypes.bool,
  roomId: PropTypes.string,
};

export default Chatting;
