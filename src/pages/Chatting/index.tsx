import { useParams } from "react-router-dom";

import Chat from "@/components/Chat";

const Chatting = () => {
  const { roomId } = useParams() as { roomId: string };
  return <Chat roomId={roomId} layoutType="fullchat" />;
};

export default Chatting;
