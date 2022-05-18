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
import { useScroll } from "./Hooks/useScroll";
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
  const { scroll } = useScroll(chattingMessagesBox);

  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [headerInfo, setHeaderInfo] = useState(undefined);
  const [user, setUser] = useState({
    name: "",
    id: "",
    nickname: "",
    profileImageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (!newMessage) {
      scrollToBottom();
    }
  }, [newMessage]);

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

  // scroll to bottom
  const scrollToBottom = () => {
    if (chattingMessagesBox.current) {
      chattingMessagesBox.current.scrollTop =
        chattingMessagesBox.current.scrollHeight;
    }
  };

  useEffect(() => {
    const _socket = io(backServer, {
      withCredentials: true,
    });
    socket.current = _socket;
    socket.current.on("chats-join", (chats) => {
      setChats(chats.chats);
      // scroll to bottom on join
      scrollToBottom();
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

  // check if scroll is at the top, send chats-load event
  useEffect(() => {
    if (scroll === 0 && !isLoading && chats.length > 0) {
      setIsLoading(true);
      socket.current.emit("chats-load", chats[0].time, 30);
    }
  }, [scroll]);

  // load more chats upon recieving chats-load event (infinite scroll)
  useEffect(() => {
    socket.current.on("chats-load", (loadChats) => {
      const bottom =
        chattingMessagesBox.current.scrollHeight -
        chattingMessagesBox.current.scrollTop;
      setChats((prevChats) => {
        return [...loadChats.chats, ...prevChats];
      });
      setIsLoading(false);
      chattingMessagesBox.current.scrollTop =
        chattingMessagesBox.current.scrollHeight - bottom;
    });
  }, []);

  // recieve chats
  useEffect(() => {
    socket.current.on("chats-receive", (receiveChats) => {
      setChats((prevChats) => {
        return [...prevChats, receiveChats.chat];
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
