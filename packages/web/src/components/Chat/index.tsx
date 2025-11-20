import { useEffect, useRef, useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import type { Chats, LayoutType } from "@/types/chat";

import useBodyScrollControllerEffect from "@/hooks/chat/useBodyScrollControllerEffect";
import useReadChat from "@/hooks/chat/useReadChat";
import useSendMessage from "@/hooks/chat/useSendMessage";
import useSocketChatEffect from "@/hooks/chat/useSocketChatEffect";
import useDateToken from "@/hooks/useDateToken";
import useDisableScrollEffect from "@/hooks/useDisableScrollEffect";
import useQuery from "@/hooks/useTaxiAPI";

import ArrivalNotifications from "./ArrivalNotifications";
import Container from "./Container";
import Header from "./Header";
import MessageForm from "./MessageForm";
import MessagesBody from "./MessagesBody";

type ChatProps = {
  roomId: string;
  layoutType: LayoutType;
};

const Chat = ({ roomId, layoutType }: ChatProps) => {
  const [chats, setChats] = useStateWithCallbackLazy<Chats>([]); // 채팅 메시지 배열
  const [isDisplayNewMessage, setDisplayNewMessage] = useState<boolean>(false); // 새로운 메시지 버튼 표시 여부
  const [isOpenToolSheet, setIsOpenToolSheet] = useState<boolean>(false); // 툴 시트 표시 여부
  const messageBodyRef = useRef<HTMLDivElement>(null); // 스크롤 되는 메시지 HTML 요소
  const isSendingMessage = useRef<boolean>(false); // 메시지 전송 중인지 여부
  const sendMessage = useSendMessage(roomId, isSendingMessage); // 메시지 전송 핸들러

  // 방 정보 조회
  const [roomInfoToken, fetchRoomInfo] = useDateToken();
  const [, roomInfo] = useQuery.get(`/rooms/info?id=${roomId}`, {}, [
    roomInfoToken,
  ]);

  // 각 사용자가 언제 마지막으로 채팅을 읽었는지 알려주는 readAtList 조회
  //   r.f. 역시 방 정보를 조회하지만 readAt은 좀 더 자주 업데이트가 필요하기 때문에 roomInfo와 분리
  //        readAt을 위해 roomInfo 업데이트 시 useSocketChatEffect가 다시 렌더링되어 초기화되는 문제 발생
  const [readAtListToken, fetchReadAtList] = useDateToken();
  const [, roomInfoForReadAt] = useQuery.get(`/rooms/info?id=${roomId}`, {}, [
    readAtListToken,
  ]);
  const [readAtList, setReadAtList] = useState<Date[]>([]);

  useEffect(() => {
    if (!roomInfoForReadAt?.part) return;
    setReadAtList(
      roomInfoForReadAt.part.map((user: { readAt: any }) => user.readAt)
    );
  }, [roomInfoForReadAt?.part]);

  // 채팅 읽은 시간 업데이트
  const handleRead = useReadChat(roomId, true);

  // socket.io를 통해 채팅 전송 및 수신
  useSocketChatEffect(
    roomInfo,
    fetchRoomInfo,
    fetchReadAtList,
    setChats,
    setDisplayNewMessage,
    handleRead,
    messageBodyRef,
    isSendingMessage
  );

  // 채팅의 scroll을 제어
  useBodyScrollControllerEffect(
    roomId,
    chats,
    setDisplayNewMessage,
    setIsOpenToolSheet,
    messageBodyRef
  );

  // 전체화면 챗에서는 body의 스크롤을 막습니다.
  useDisableScrollEffect(layoutType === "fullchat");

  return (
    <Container layoutType={layoutType}>
      <Header layoutType={layoutType} roomInfo={roomInfo} />
      {roomInfo && (
        <ArrivalNotifications
          roomInfo={roomInfo}
          fetchRoomInfo={fetchRoomInfo}
        />
      )}
      <MessagesBody
        layoutType={layoutType}
        roomInfo={roomInfo}
        chats={chats}
        readAtList={readAtList}
        ref={messageBodyRef}
      />
      <MessageForm
        layoutType={layoutType}
        roomInfo={roomInfo}
        chats={chats}
        isDisplayNewMessage={isDisplayNewMessage}
        isOpenToolSheet={isOpenToolSheet}
        onChangeIsOpenToolSheet={setIsOpenToolSheet}
        messageBodyRef={messageBodyRef}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

export default Chat;
