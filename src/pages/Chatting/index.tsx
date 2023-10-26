import Chat from "@/components/Chat";
import { useParams } from "react-router-dom";

const Chatting = () => {
  const { roomId } = useParams() as { roomId: string };
  return <Chat roomId={roomId} layoutType="fullchat" />;
};

export default Chatting;
