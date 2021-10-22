import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat"
import InputForm from "./InputForm";
import _ from "lodash"
import useInfiniteScrollInverse from "../../hooks/useInfiniteScrollInverse";
import Cookies from "js-cookie";
import PropTypes from "prop-types"
import { backServer } from "../../serverconf"

Chatting.propTypes = {
  roomId: PropTypes.number,
  exitRoom: PropTypes.func
}
export default function Chatting(props) {
  console.log("chatting()")
  const scrollLength = 25;

  const self = useRef(null);
  const [socket, setSocket] = useState();

  const { items, hasNext, next, newChat, isFetching, setIsFetching } = useInfiniteScrollInverse(props.roomId, scrollLength);
  const topEl = useRef(null);

  const renderChats = (chats) => {
    // Chat[] 을 받아 jsx element로 변환
    if (!chats || chats.length === 0) return;
    return chats.map((chat, index) => <Chat key={index} author={chat.author} text={chat.text} time={chat.time} />)
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToTop = self.current.scrollTop === 0;
      console.log("handleScroll()");
      if (isScrolledToTop && hasNext && !isFetching) next();
    }
    const div = self.current;
    const throttledHandleScroll = _.throttle(handleScroll, 500)
    div.addEventListener('scroll', throttledHandleScroll);

    return () => {
      div.removeEventListener('scroll', throttledHandleScroll);
    }
  }, [isFetching, hasNext, self])

  useEffect(() => {
    if (!topEl.current) {
      // 처음 렌더링돼었을 때
      // 맨 아래로 스크롤하고, top element 설정
      self.current.scrollTop = self.current.scrollHeight - self.current.clientHeight;
      topEl.current = document.getElementById("chats")?.children[1];
    } else {
      // 두번째 이후 렌더링
      if (!items.isNewChat) {
        // load more을 통해 렌더링 된 경우
        // top element로 스크롤 후 top element를 재설정
        // topEl.current.scrollIntoView(true);
        topEl.current = document.getElementById("chats")?.children[1];
        console.log("setIsFetching false")
      } else {
        // newChat을 통해 렌더링 된 경우
        // 맨 아래로 스크롤
        self.current.scrollTop = self.current.scrollHeight - self.current.clientHeight;
      }
    }
    setIsFetching(false);
  }, [items])


  useEffect(() => {
    console.log("useEffect of chatting[]")
    // 소켓 연결 및 이벤트 등록
    const socket = io(backServer);
    socket.on("connect", () => {
      socket.emit("join", props.roomId, Cookies.get('credential'))
    })
    socket.on('joined', (roomId, username) => {
      console.log(username + " joined");
      const newUserChat = { author: username, text: "님이 채팅방에 참여했습니다.", time: new Date() };
      socket.emit('chatEvent', newUserChat);
    })

    // 소켓에서 chat이벤트 받을시 채팅 새로 렌더링
    const handleChat = (chat) => { newChat(chat); }
    socket.on('chatEvent', handleChat);
    setSocket(socket);

    return () => {
      console.log("useEffect[] cleaned")
      socket.off('chatEvent', handleChat);
      socket.disconnect();
    }
  }, [])

  return (
    <>
      {props.roomId}번 채팅방입니다. &nbsp; <input type="button" value="나가기" onClick={props.exitRoom} />
      <div ref={self} id="chatting">
        <table id="chattingTable">
          <tbody id="chats">
            <tr>
              <td>
                {isFetching && 'Loading...'}
              </td>
            </tr>
            {renderChats(items.data)}
          </tbody>
        </table>
      </div >
      <InputForm socket={socket} />
    </>
  )
}