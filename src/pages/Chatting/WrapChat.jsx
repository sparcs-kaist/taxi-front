import Chatting from "pages/Chatting/Chatting";
import { useParams } from "react-router-dom";

const WrapChat = () => {
  const { roomId } = useParams();
  return <Chatting roomId={roomId} isSideChat={false} />;
};

export default WrapChat;
