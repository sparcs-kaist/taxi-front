import { useParams } from "react-router-dom";

import useDisableScrollEffect from "hooks/useDisableScrollEffect";

import Chatting from "./index";

const FullChat = () => {
  const { roomId } = useParams() as { roomId: string };

  // 전체화면 챗에서는 body의 스크롤을 막습니다.
  useDisableScrollEffect(true);

  return <Chatting roomId={roomId} layoutType="fullchat" />;
};

export default FullChat;
