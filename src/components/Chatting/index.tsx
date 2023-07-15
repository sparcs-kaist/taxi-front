import { useRef, useState } from "react";

import useDateToken from "hooks/useDateToken";
import useDisableScrollEffect from "hooks/useDisableScrollEffect";
import useQuery from "hooks/useTaxiAPI";

import Container from "./chatting-components/Container";
import Header from "./chatting-components/Header";
import MessageForm from "./chatting-components/MessageForm";
import MessagesBody from "./chatting-components/MessagesBody";
import useSendMessage from "./chatting-hooks/useSendMessage";

import theme from "tools/theme";

type ChattingProps = {
  roomId: string;
  layoutType: "sidechat" | "fullchat";
};
type FullChatProps = {
  roomId: ChattingProps["roomId"];
};
type SideChatProps = {
  roomId: ChattingProps["roomId"];
};

const Chatting = ({ roomId, layoutType }: ChattingProps) => {
  const isSendingMessage = useRef<boolean>(false); // 메시지 전송 중인지 여부

  // Remove me - move to child
  const sendMessage = useSendMessage(roomId, isSendingMessage);
  const handleSendMessage = (text: string) => sendMessage("text", { text });
  const handleSendAccount = (account: string) =>
    sendMessage("account", { text: account });
  const handleSendImage = (image: File) =>
    sendMessage("image", { file: image });

  // Remove me - move to child
  const [roomInfoToken, fetchRoomInfo] = useDateToken();
  const [, roomInfo] = useQuery.get(`/rooms/info?id=${roomId}`, {}, [
    roomInfoToken,
  ]);

  // Remove me - for test
  const chats: Array<any> = [];
  const [isDisplayNewMessage] = useState(false);

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
        // forwardedRef={messagesBody}
        // handleScroll={handleScroll}
        isBottomOnScroll={() => true}
        // scrollToBottom={() => scrollToBottom(false)}
      />
      <MessageForm
        layoutType={layoutType}
        handleSendMessage={handleSendMessage}
        handleSendAccount={handleSendAccount}
        handleSendImage={handleSendImage}
        showNewMessage={isDisplayNewMessage}
        onClickNewMessage={() => {}}
        setContHeight={() => {}}
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
