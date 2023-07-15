import { useParams } from "react-router-dom";

import { FullChat } from "components/Chatting";

const Chatting = () => {
  const { roomId } = useParams() as { roomId: string };
  return <FullChat roomId={roomId} />;
};

export default Chatting;
