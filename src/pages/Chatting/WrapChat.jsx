import { useParams } from "react-router-dom";

import Chatting from "pages/Chatting";

const WrapChat = () => {
  const { roomId } = useParams();
  return <Chatting roomId={roomId} isSideChat={false} />;
};

export default WrapChat;
