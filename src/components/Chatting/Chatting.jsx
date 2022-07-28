import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import Header from "./Header/Header";
import SideChatHeader from "./Header/SideChatHeader";
import MessagesBody from "./MessagesBody/MessagesBody";
import MessageForm from "./Input/MessageForm";
import SideChatMessageForm from "./Input/SideChatMessageForm";
import regExpTest from "@tools/regExpTest";
import axios from "@tools/axios";
import { backServer } from "serverconf";
import NewMessage from "./MessagesBody/NewMessage";

import "./Style/Chatting.css";
// Reponse
// {
//   data: Chat[], // pageSize 개의 채팅 내역
//   page: Number, // 페이지 번호
//   totalPage: Number, //총 페이지 수(전체 채팅 수를 pageSize로 나눈 것)
//   totalChats: Number, //총 채팅 개수
// }

const Chatting = (prop) => {
  const isSideChat = true;
  let roomId;
  const socket = useRef(undefined);
  const messagesBody = useRef();
  let param = useParams();

  // check to see if side chat
  if (param.roomId) {
    roomId = param.roomId;
  } else {
    roomId = prop.roomId;
  }

  const [isReceieveChat, setIsReceiveChat] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [chats, setChats] = useState([]);
  const [headerInfo, setHeaderInfo] = useState(undefined);
  const [user, setUser] = useState({
    name: "",
    id: "",
    nickname: "",
    profileImageUrl: "",
  });
  const isInfScrollLoading = useRef(false);

  // scroll functions
  const scrollToBottom = (bottom = 0) => {
    if (messagesBody.current) {
      messagesBody.current.scrollTop =
        messagesBody.current.scrollHeight - bottom;
    }
  };

  // get user info
  useEffect(async () => {
    const userInfo = await axios.get("/json/logininfo");
    if (userInfo.data) {
      const detailedUserInfo = await axios.get("/json/logininfo/detail");
      if (detailedUserInfo.data) {
        setUser({
          name: userInfo.data.name,
          id: userInfo.data.id,
          profileImageUrl: `${backServer}/static/profile-images/${userInfo.data.id}`,
          nickname: detailedUserInfo.data.nickname,
        });
      }
    }
  }, []);

  // scroll event
  const handleScroll = () => {
    const scrollTop = messagesBody.current.scrollTop;

    // check if scroll is at the top, send chats-load event
    // 맨 상단의 경우 인피니티 스크롤 요청을 call하면 안됨
    if (scrollTop <= 0 && !isInfScrollLoading.current && chats.length > 0) {
      isInfScrollLoading.current = true;
      socket.current.emit("chats-load", chats[0].time, 30);
    } else if (
      messagesBody.current.scrollHeight - scrollTop <
        50 + messagesBody.current.clientHeight - 10 &&
      isReceieveChat
    ) {
      setIsReceiveChat(false);
    }
  };

  // socket setting
  useEffect(async () => {
    socket.current?.disconnect();

    socket.current = io(backServer, {
      withCredentials: true,
    });

    socket.current.on("chats-join", (chats) => {
      setChats(chats.chats);
      // scroll to bottom on join
      scrollToBottom();
    });

    // when receive chats
    socket.current.on("chats-receive", (receiveChats) => {
      setChats((prevChats) => {
        setIsReceiveChat(true);
        return [...prevChats, receiveChats.chat];
      });
    });

    // load more chats upon receiving chats-load event (infinite scroll)
    socket.current.on("chats-load", (loadChats) => {
      const bottom =
        messagesBody.current.scrollHeight - messagesBody.current.scrollTop;
      console.log(bottom);
      setChats((prevChats) => {
        return [...loadChats.chats, ...prevChats];
      });
      isInfScrollLoading.current = false;
      messagesBody.current.scrollTop =
        messagesBody.current.scrollHeight - bottom;
    });

    // init
    const roomInfo = await axios.get("/rooms/info", {
      params: { id: roomId },
    });
    setHeaderInfo(roomInfo.data);
    setChats([]);
    socket.current.emit("chats-join", roomId);

    // disconnect socket
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [roomId]);

  // when there is new message, scroll to bottom
  useEffect(() => {
    if (!inputStr) {
      scrollToBottom();
    }
  }, [inputStr]);

  useEffect(() => {
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const onUnmount = () => {
    socket.current?.disconnect();
    console.log("unmount");
  };

  // handler
  const sendMessage = (messageStr) => {
    socket.current.emit("chats-send", { roomId: roomId, content: messageStr });
    const chatComp = {
      authorId: user.id,
      authorName: user.nickname,
      text: messageStr,
      time: new Date().toISOString(),
    };
    // 보내졌는지 확인 여부 필요함?
    setChats((prevChats) => {
      return [...prevChats, chatComp];
    });
  };
  const handleInputStr = (event) => {
    setInputStr(event.target.value);
  };
  const handleSendMessage = (event) => {
    event?.preventDefault();
    if (regExpTest.chatMsg(inputStr)) {
      sendMessage(inputStr);
      setInputStr("");
    }
  };

  const onClick = (event) => {
    setIsReceiveChat(false);
    scrollToBottom();
  };

  return (
    <div className="ChatContainer">
      <div className="ChatRoomContainer">
        {isSideChat ? (
          <SideChatHeader info={headerInfo} onUnmount={onUnmount} />
        ) : (
          <Header info={headerInfo} />
        )}
        <MessagesBody
          chats={chats}
          user={user}
          isSideChat={isSideChat}
          isReceieveChat={isReceieveChat}
          onClick={onClick}
          forwardedRef={messagesBody}
          handleScroll={handleScroll}
        />
        {isSideChat ? (
          <SideChatMessageForm
            newMessage={inputStr}
            handleNewMessageChange={handleInputStr}
            handleSendMessage={handleSendMessage}
          />
        ) : (
          <MessageForm
            newMessage={inputStr}
            handleNewMessageChange={handleInputStr}
            handleSendMessage={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Chatting;
