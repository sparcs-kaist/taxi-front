import { useParams } from "react-router-dom";

import Footer from "components/Footer";

// import EventSection from "./EventSection";
import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

const Home = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <>
      <InfoSection />
      <div css={{ marginTop: "-10px" }} />
      {/* <EventSection /> */}
      <RoomSection roomId={roomId} />
      <Footer />
    </>
  );
};

export default Home;
