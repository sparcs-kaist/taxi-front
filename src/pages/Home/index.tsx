import { useParams } from "react-router-dom";
import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

const Home = () => {
  const { roomId } = useParams<{ roomId: string }>();
  console.log(roomId);
  return (
    <>
      <InfoSection />
      <RoomSection roomId={roomId || null} />
    </>
  );
};

export default Home;
