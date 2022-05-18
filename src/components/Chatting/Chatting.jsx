import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import Header from "./Header/Header";
import SideChatHeader from "./Header/SideChatHeader";
import MessagesBody from "./MessagesBody/MessagesBody";
import MessageForm from "./Input/MessageForm";
import SideChatMessageForm from "./Input/SideChatMessageForm";
import { backServer } from "../../serverconf";
import "./Style/Chatting.css";
import axios from "../Tool/axios";
// Reponse
// {
//   data: Chat[], // pageSize 개의 채팅 내역
//   page: Number, // 페이지 번호
//   totalPage: Number, //총 페이지 수(전체 채팅 수를 pageSize로 나눈 것)
//   totalChats: Number, //총 채팅 개수
// }

const Chatting = (prop) => {
  const isSideChat = prop?.roomId !== undefined;
  const roomId = isSideChat ? prop.roomId : useParams().roomId;
  const socket = useRef(undefined);
  const messagesBody = useRef();

  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [headerInfo, setHeaderInfo] = useState(undefined);
  const [user, setUser] = useState({
    name: "",
    id: "",
    nickname: "",
    profileImageUrl: "",
  });
  const isInfScrollLoading = useRef(false);

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
  useEffect(() => {
    const scrollListener = () => {
      const scrollTop = messagesBody.current.scrollTop;

      // check if scroll is at the top, send chats-load event
      if (scrollTop === 0 && !isInfScrollLoading.current && chats.length > 0) {
        isInfScrollLoading.current = true;
        socket.current.emit("chats-load", chats[0].time, 30);
      }
    };
    messagesBody.current.addEventListener("scroll", scrollListener);
    return () => {
      messagesBody.current.removeEventListener("scroll", scrollListener);
    };
  }, []);

  // socket setting
  useEffect(async () => {
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
        return [...prevChats, receiveChats.chat];
      });
    });

    // load more chats upon receiving chats-load event (infinite scroll)
    socket.current.on("chats-load", (loadChats) => {
      const bottom =
        messagesBody.current.scrollHeight - messagesBody.current.scrollTop;
      setChats((prevChats) => {
        return [...loadChats.chats, ...prevChats];
      });
      isInfScrollLoading.current = false;
      messagesBody.current.scrollTop =
        messagesBody.current.scrollHeight - bottom;
    });

    // init
    const roomInfo = await axios.get(`/rooms/${roomId}/info`);
    setHeaderInfo(roomInfo.data);
    socket.current.emit("chats-join", roomId);
  }, [roomId]);

  // when there is new message, scroll to bottom
  useEffect(() => {
    if (!newMessage) {
      scrollToBottom();
    }
  }, [newMessage]);

  // scroll function
  const scrollToBottom = () => {
    if (messagesBody.current) {
      messagesBody.current.scrollTop = messagesBody.current.scrollHeight;
    }
  };

  // handler
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = (event) => {
    event?.preventDefault();
    if (newMessage) sendMessage(newMessage);
    setNewMessage("");
  };
  const sendMessage = (messageStr) => {
    socket.current.emit("chats-send", { roomId: roomId, content: messageStr });
    const chatComp = {
      authorId: user.id,
      authorName: user.nickname,
      text: messageStr,
      time: new Date().toISOString(),
    };
    setChats((prevChats) => {
      return [...prevChats, chatComp];
    });
  };

  return (
    <div className="ChatContainer">
      <div className="ChatRoomContainer">
        {isSideChat ? (
          <SideChatHeader info={headerInfo} />
        ) : (
          <Header info={headerInfo} />
        )}

        <MessagesBody
          chats={chats}
          user={user}
          isSideChat={isSideChat}
          forwardedRef={messagesBody}
        />

        {isSideChat ? (
          <SideChatMessageForm
            newMessage={newMessage}
            handleNewMessageChange={handleNewMessageChange}
            handleSendMessage={handleSendMessage}
          />
        ) : (
          <MessageForm
            newMessage={newMessage}
            handleNewMessageChange={handleNewMessageChange}
            handleSendMessage={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Chatting;
