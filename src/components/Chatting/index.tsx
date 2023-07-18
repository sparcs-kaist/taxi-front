import { useRef, useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import { LayoutType } from "types/chatting";

import useDateToken from "hooks/useDateToken";
import useDisableScrollEffect from "hooks/useDisableScrollEffect";
import useQuery from "hooks/useTaxiAPI";

import Container from "./chatting-components/Container";
import Header from "./chatting-components/Header";
import MessageForm from "./chatting-components/MessageForm";
import MessagesBody from "./chatting-components/MessagesBody";
import useBodyScrollControllerEffect from "./chatting-hooks/useBodyScrollControllerEffect";
import useSendMessage from "./chatting-hooks/useSendMessage";
import useSocketChatEffect from "./chatting-hooks/useSocketChatEffect";
import { Chats } from "./chatting-utils/chats";

import theme from "tools/theme";

type ChattingProps = {
  roomId: string;
  layoutType: LayoutType;
};
type FullChatProps = {
  roomId: ChattingProps["roomId"];
};
type SideChatProps = {
  roomId: ChattingProps["roomId"];
};

const Chatting = ({ roomId, layoutType }: ChattingProps) => {
  const [chats, setChats] = useStateWithCallbackLazy<Chats>([]); // 채팅 메시지 배열
  const [isDisplayNewMessage, setDisplayNewMessage] = useState<boolean>(false); // 새로운 메시지 버튼 표시 여부
  const messageBodyRef = useRef<HTMLDivElement>(null); // 스크롤 되는 메시지 HTML 요소
  const isSendingMessage = useRef<boolean>(false); // 메시지 전송 중인지 여부
  const isCallingInfScroll = useRef<boolean>(false); // 무한 스크롤 메시지 요청 중인지 여부
  const sendMessage = useSendMessage(roomId, isSendingMessage); // 메시지 전송 핸들러

  // 방 정보 조회
  const [roomInfoToken, fetchRoomInfo] = useDateToken();
  const [, roomInfo] = useQuery.get(`/rooms/info?id=${roomId}`, {}, [
    roomInfoToken,
  ]);

  // socket.io를 통해 채팅 전송 및 수신
  useSocketChatEffect(
    roomId,
    setChats,
    setDisplayNewMessage,
    messageBodyRef,
    isSendingMessage,
    isCallingInfScroll
  );

  useBodyScrollControllerEffect(
    roomId,
    chats,
    setDisplayNewMessage,
    messageBodyRef,
    isCallingInfScroll
  );

  return (
    <Container layoutType={layoutType}>
      <Header
        layoutType={layoutType}
        roomInfo={roomInfo}
        fetchRoomInfo={fetchRoomInfo}
      />
      <MessagesBody
        layoutType={layoutType}
        chats={chats}
        ref={messageBodyRef}
      />
      <MessageForm
        layoutType={layoutType}
        isDisplayNewMessage={isDisplayNewMessage}
        messageBodyRef={messageBodyRef}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

export const FullChat = ({ roomId }: FullChatProps) => {
  // 전체화면 챗에서는 body의 스크롤을 막습니다.
  useDisableScrollEffect(true);

  return <Chatting roomId={roomId} layoutType="fullchat" />;
};

export const SideChat = ({ roomId }: SideChatProps) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column" as any,
      height: "100%",
      overflow: "hidden",
      backgroundColor: theme.white,
    }}
  >
    <Chatting roomId={roomId} layoutType="sidechat" />
  </div>
);
