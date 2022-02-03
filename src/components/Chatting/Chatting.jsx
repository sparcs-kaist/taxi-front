import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
import InputForm from "./InputForm";
import _ from "lodash";
import useInfiniteScrollInverse from "../../hooks/useInfiniteScrollInverse";
import PropTypes from "prop-types";
import { backServer } from "../../serverconf";
import { useParams } from "react-router-dom";
import axios from "../Tool/axios";
// import "./Chatting.css"
import { useLayoutEffect } from "react";

export default function Chatting(props) {
  // react router로부터 param을 받아온다.
  const { roomId } = useParams();
  // 무한스크롤 로딩시 한번에 받아오는 채팅 개수
  const scrollLength = 25;
  // 채팅을 위한 소켓 연결
  const [socket, setSocket] = useState();

  // type Chat
  // {
  //   author: string,
  //   text: string,
  //   time: Date
  // }

  // items: 채팅 내용, Chat[]
  // hasNext: 다음 채팅이 있는지?, boolean
  // next(): 다음 채팅 가져오기, () => void
  // newChat(): 새로운 채팅 등록, (Chat) => void
  // isFetching: 채팅 가져오는 중인지 여부, boolean
  // setIsFetching(): 채팅 가져오는 중으로 표시하기, (boolean) => void
  const { items, hasNext, next, newChat, isFetching, setIsFetching } =
    useInfiniteScrollInverse(roomId, scrollLength);

  // 스크롤 처리 관련 변수들
  const self = useRef(null);
  const topEl = useRef(null);
  const scrollHeight = useRef(0);
  const scrollTop = useRef(0);

  // socket.io auth token
  const [token, setToken] = useState("");
  // 토큰을 받아오는 중인지를 표시
  const [isComponentLoading, setIsComponentLoading] = useState(true);

  // Chat[] 을 받아 jsx element로 변환
  const renderChats = (chats) => {
    if (!chats || chats.length === 0) return;
    return chats.map((chat, index) => (
      <Chat
        key={index}
        author={chat.author}
        text={chat.text}
        time={chat.time}
      />
    ));
  };

  // 백서버로부터 토큰을 받아오고 isComponentLoading을 false로 변경
  const getToken = async () => {
    setIsComponentLoading(true);
    try {
      const res = await axios.get(`${backServer}/auth/getToken`, {
        withCredentials: true,
      });
      setToken(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsComponentLoading(false);
    }
  };

  // 새로운 채팅 등록하기
  const handleChat = (chat) => {
    newChat(chat);
  };

  const getSocket = () => {
    // 소켓 연결 및 이벤트 등록
    console.log(token);
    const socket = io(backServer, {
      auth: { token: token },
    });
    socket.on("connect", () => {
      socket.emit("join", roomId);
    });
    // 소켓에서 chat이벤트 받을시 채팅 새로 렌더링
    socket.on("chatEvent", handleChat);

    return socket;
  };

  useEffect(() => {
    getToken();
  }, []);

  // 소켓 연결하기
  useEffect(() => {
    let socket;
    if (!isComponentLoading || token.length !== 0) {
      socket = getSocket();
      setSocket(socket);
    }
    return () => {
      socket?.off("chatEvent", handleChat);
      socket?.disconnect();
    };
  }, [isComponentLoading, token]);

  // 스크롤시 예전 채팅 로드 이벤트 등록(FIXME: dependancy array 조정 필요)
  useEffect(() => {
    if (!isComponentLoading) {
      const handleScroll = () => {
        const isScrolledToTop = self.current.scrollTop === 0;
        if (isScrolledToTop && hasNext && !isFetching) next();
      };
      const div = self.current;
      const throttledHandleScroll = _.throttle(handleScroll, 500);
      div?.addEventListener("scroll", throttledHandleScroll);

      return () => {
        div?.removeEventListener("scroll", throttledHandleScroll);
      };
    }
  }, [isComponentLoading, isFetching, hasNext, self]);

  // TODO: 스크롤 처리
  useLayoutEffect(() => {
    if (!isComponentLoading) {
      scrollHeight.current = self.current.scrollHeight;
      scrollTop.current = self.current.scrollTop;
    }
  }, [self]);

  // TODO: 스크롤 처리 2
  useEffect(() => {
    if (isComponentLoading) return;
    if (items.isInitialLoad) {
      console.log("first render, should be scrolled to bottom");
      // 처음 렌더링돼었을 때
      // 맨 아래로 스크롤하고, top element 설정
      self.current.scrollTop =
        scrollTop.current +
        (self.current.scrollHeight - self.current.scrollHeight);
      topEl.current = document.getElementById("chats")?.children[1];
      console.log(topEl.current);
    } else {
      // 두번째 이후 렌더링
      if (!items.isNewChat) {
        console.log("load more, should be scrolled to prior top");
        // load more을 통해 렌더링 된 경우
        // top element로 스크롤 후 top element를 재설정
        self.current.scrollTop =
          scrollTop.current +
          (self.current.scrollHeight - scrollHeight.current);

        topEl.current = document.getElementById("chats")?.children[1];
      } else {
        console.log("new chat, should be scrolled to bottom");
        // newChat을 통해 렌더링 된 경우
        // 맨 아래로 스크롤
        self.current.scrollTop =
          self.current.scrollHeight - self.current.clientHeight;
      }
    }
    setIsFetching(false);
  }, [items, isComponentLoading, self.current]);

  return (
    <>
      {isComponentLoading && <div>Getting token for chatting...</div>}
      {!isComponentLoading && (
        <>
          {roomId}번 채팅방입니다. &nbsp;{" "}
          <input type="button" value="나가기" onClick={props.exitRoom} />
          <div ref={self} id="chatting">
            <table id="chattingTable">
              <tbody id="chats">
                <tr>
                  <td>{isFetching && "Loading more message..."}</td>
                </tr>
                {renderChats(items.data)}
              </tbody>
            </table>
          </div>
          <InputForm socket={socket} />
        </>
      )}
    </>
  );
}

Chatting.propTypes = {
  // roomId: PropTypes.number,
  exitRoom: PropTypes.func,
};
