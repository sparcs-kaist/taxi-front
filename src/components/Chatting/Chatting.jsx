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
  const chattingMessagesBox = useRef();

  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [headerInfo, setHeaderInfo] = useState(undefined);
  const [user, setUser] = useState({
    name: "",
    id: "",
    nickname: "",
    profileImageUrl: "",
  });

  const getUserInfo = async () => {
    let newUser = user;
    // id, name, 프로필 사진의 url을 아직 불러오지 않은 경우에만 불러옴니다.
    if (!user.id) {
      const userInfo = await axios.get("/json/logininfo");
      if (userInfo.data) {
        newUser = userInfo.data;
        newUser.profileImageUrl = `${backServer}/static/profile-images/${newUser.id}`;
      }
    }
    // 닉네임을 불러옵니다.
    const detailedUserInfo = await axios.get("/json/logininfo/detail");
    if (detailedUserInfo.data) {
      newUser.nickname = detailedUserInfo.data.nickname;
    }
    setUser(newUser);
  };

  useEffect(async () => {
    await getUserInfo();
  }, []);

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
    setChats((chats) => {
      return [...chats, chatComp];
    });
  };

  //scroll to bottom
  useEffect(() => {
    if (chats.length && chats[chats.length - 1].authorId == user.id) {
      const box = chattingMessagesBox.current;
      box.scrollTop = box.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    const _socket = io(backServer, {
      withCredentials: true,
    });
    socket.current = _socket;
    socket.current.on("chats-join", (chats) => {
      setChats(chats.chats);
    });

    axios
      .get(`/rooms/${roomId}/info`)
      .then(({ data }) => {
        setHeaderInfo(data);
        socket.current.emit("chats-join", roomId);

        // setChats(data);
      })
      .catch(() => {
        // when error !
      });

    axios.get(`/rooms/${roomId}/info`).then(({ data }) => {
      // console.log(data);
    });
  }, [roomId]);

  // recieve chats
  useEffect(() => {
    socket.current.on("chats-receive", (receiveChats) => {
      setChats((chats) => {
        return [...chats, receiveChats.chat];
      });
    });
  }, []);

  return (
    <div className="ChatContainer">
      {isSideChat ? (
        <div className="ChatRoomContainer">
          <SideChatHeader info={headerInfo} />
          <MessagesBody
            chats={chats}
            user={user}
            isSideChat={isSideChat}
            forwardedRef={chattingMessagesBox}
          />
          <SideChatMessageForm
            newMessage={newMessage}
            handleNewMessageChange={handleNewMessageChange}
            handleSendMessage={handleSendMessage}
          />
        </div>
      ) : (
        <div className="ChatRoomContainer">
          <Header info={headerInfo} />
          <MessagesBody
            chats={chats}
            user={user}
            isSideChat={isSideChat}
            forwardedRef={chattingMessagesBox}
          />
          <MessageForm
            newMessage={newMessage}
            handleNewMessageChange={handleNewMessageChange}
            handleSendMessage={handleSendMessage}
          />
        </div>
      )}
    </div>
  );
};

export default Chatting;
