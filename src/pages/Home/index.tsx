import Footer from "@/components/Footer";
import { ModalPrivacyPolicy } from "@/components/ModalPopup";
import { useHistory, useParams } from "react-router-dom";

import EventSection from "./EventSection";
import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

const Home = () => {
  const history = useHistory();
  const { roomId: _roomId } = useParams<{ roomId: string }>();
  const roomId = _roomId === "privacyPolicy" ? null : _roomId;

  const onChangeIsOpenPrivacyPolicy = () => history.replace("/home");

  return (
    <>
      <InfoSection />
      <div css={{ marginTop: "-10px" }} />
      <EventSection />
      <RoomSection roomId={roomId} />
      <Footer />
      <ModalPrivacyPolicy
        isOpen={_roomId === "privacyPolicy"}
        onChangeIsOpen={onChangeIsOpenPrivacyPolicy}
      />
    </>
  );
};

export default Home;
