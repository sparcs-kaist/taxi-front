import { useParams } from "react-router-dom";
import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

const Home = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <>
      <InfoSection />
      <RoomSection roomId={roomId} />
    </>
  );
};

export default Home;
