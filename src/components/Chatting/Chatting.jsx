import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "./Header/Header";
import MessagesBody from "./MessagesBody/MessagesBody";
import MessageForm from "./Input/MessageForm";
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
const dummyDate = new Date().toISOString();
const chatRoomResponse = {
  data: [
    {
      roomId: "roomId",
      authorName: "펭귄",
      authorId: "펭귄",
      text: "여러분 택시타요",
      time: dummyDate,
    },
    {
      roomId: "roomId",
      authorName: "펭귄",
      authorId: "펭귄",
      text: "택시 타",
      time: dummyDate,
    },
    {
      roomId: "roomId",
      authorName: "펭귄",
      authorId: "펭귄",
      text: "괜찮나요?",
      time: dummyDate,
    },
    {
      roomId: "roomId",
      authorName: "크롱",
      authorId: "크롱",
      text: "네 좋습니다",
      time: dummyDate,
    },
    {
      roomId: "roomId",
      authorName: "크롱",
      authorId: "크롱",
      text: "고고링",
      time: dummyDate,
    },
    {
      roomId: "roomId",
      authorName: "test1",
      authorId: "test1",
      text: "음 전 싫어요",
      time: dummyDate,
    },
    {
      roomId: "roomId",
      authorName: "test1",
      authorId: "test1",
      text: "크롱 있어서",
      time: dummyDate,
    },
  ],
  // page: 0,
  // totalPage: 0,
  totalChats: 3,
};

const Chatting = (props) => {
  const roomId = useParams().roomId;
  const socket = useRef(undefined);

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

  // MessageForm 관련 함수들 - 시작-----
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = (event) => {
    event?.preventDefault();
    if (newMessage) sendMessage(newMessage);
    setNewMessage("");
  };
  // MessageForm 관련 함수들 - 끝-------

  // Events
  const endterRoom = () => {};
  const receiveMessage = () => {};
  const requestMoreChats = () => {};
  const incomeUser = () => {};
  const exitUser = () => {};
  // const updateReadCnt = () => {}
  const sendMessage = (messageStr) => {
    socket.current.emit("chats-send", { roomId: roomId, content: messageStr });
    socket.current.emit("chats-load", new Date().toISOString());
    console.log(messageStr);
  };

  // socket conncet
  const getSocket = () => {};
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
    socket.current.on("chats-recieve", (chats) => {
      if (chats) {
        setChats(chats.chats);
      }
    });
    socket.current.on("chats-load", (chats) => {
      if (chats) {
        setChats(chats.chats);
      }
    });
  }, []);

  return (
    <div className="ChatRoomContainer">
      <Header info={headerInfo} />
      <MessagesBody chats={chats} user={user} />
      <MessageForm
        newMessage={newMessage}
        handleNewMessageChange={handleNewMessageChange}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chatting;
