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
import convertImg from "@tools/convertImg";
import axiosOri from "axios";

import "./Style/Chatting.css";
// Reponse
// {
//   data: Chat[], // pageSize 개의 채팅 내역
//   page: Number, // 페이지 번호
//   totalPage: Number, //총 페이지 수(전체 채팅 수를 pageSize로 나눈 것)
//   totalChats: Number, //총 채팅 개수
// }

const Chatting = (props) => {
  const socket = useRef(undefined);
  const messagesBody = useRef();

  const [isReceieveChat, setIsReceiveChat] = useState(false);
  const [isSendingChat, setIsSendingChat] = useState("");
  const [inputStr, setInputStr] = useState("");
  const [chats, setChats] = useState([]);
  const [headerInfo, setHeaderInfo] = useState(undefined);
  const [user, setUser] = useState({
    id: "",
    nickname: "",
    profileImageUrl: "",
  });
  const isInfScrollLoading = useRef(false);
  const inputImage = useRef(null);

  console.log(chats);

  // scroll functions
  const scrollToBottom = (bottom = 0) => {
    if (messagesBody.current) {
      messagesBody.current.scrollTop =
        messagesBody.current.scrollHeight - bottom;
    }
  };

  // get user info
  useEffect(async () => {
    const detailedUserInfo = await axios.get("/json/logininfo/detail");
    if (detailedUserInfo.data) {
      setUser({
        id: detailedUserInfo.data.oid,
        profileImageUrl: detailedUserInfo.data.profileImageUrl,
        nickname: detailedUserInfo.data.nickname,
      });
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
      console.log(receiveChats);
      if (receiveChats.chat?.authorId === user.id) {
        setIsSendingChat("");
      } else {
        setIsReceiveChat(true);
        setChats((prevChats) => {
          return [...prevChats, receiveChats.chat];
        });
      }
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
    const roomInfo = await axios.get("/rooms/info", {
      params: { id: props.roomId },
    });
    setHeaderInfo(roomInfo.data);
    setChats([]);
    socket.current.emit("chats-join", props.roomId);

    // disconnect socket
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [user.id]);

  // when there is new message, scroll to bottom
  useEffect(() => {
    if (!inputStr) {
      scrollToBottom();
    }
  }, [inputStr]);

  // handler
  const sendMessage = (messageStr) => {
    socket.current.emit("chats-send", {
      roomId: props.roomId,
      content: messageStr,
    });
    const chatComp = {
      roomId: props.roomId,
      authorId: user.id,
      authorName: user.nickname,
      content: messageStr,
      time: new Date().toISOString(),
      type: "text",
    };
    // 보내졌는지 확인 여부 필요함?
    setIsSendingChat(user.id);
    setChats((prevChats) => {
      return [...prevChats, chatComp];
    });
  };
  const handleInputStr = (event) => {
    setInputStr(event.target.value);
  };
  const handleSendMessage = (event) => {
    event?.preventDefault();
    if (regExpTest.chatMsg(inputStr) && isSendingChat !== user.id) {
      sendMessage(inputStr);
      setInputStr("");
    }
  };
  const onClick = (event) => {
    setIsReceiveChat(false);
    scrollToBottom();
  };

  // handle image upload
  const handleSendImage = async (image) => {
    console.log(image);
    try {
      if (!image) return;
      axios
        .post("chats/uploadChatImg/getPUrl", { type: image.type })
        .then(async ({ data }) => {
          console.log(data);
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

              if (res2.data.result) {
                alert("채팅 사진이 업로드");
              } else {
                // FIXME
                alert("실패");
              }
            } else {
              // FIXME
              alert("실패");
            }
          } else {
            // FIXME
            alert("실패");
          }
        });
    } catch (e) {
      alert("실패");
    }
  };

  return (
    <div className="ChatContainer">
      <div className="ChatRoomContainer">
        {props.isSideChat ? (
          <SideChatHeader info={headerInfo} />
        ) : (
          <Header info={headerInfo} />
        )}
        <MessagesBody
          chats={chats}
          user={user}
          isSideChat={props.isSideChat}
          isReceieveChat={isReceieveChat}
          onClick={onClick}
          forwardedRef={messagesBody}
          handleScroll={handleScroll}
        />
        {props.isSideChat ? (
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
            handleSendImage={handleSendImage}
            inputImage={inputImage}
          />
        )}
      </div>
    </div>
  );
};

Chatting.propTypes = {
  isSideChat: PropTypes.bool,
  roomId: PropTypes.string,
};

export default Chatting;
