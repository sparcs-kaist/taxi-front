import { useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

import Footer from "components/Footer";
import { ModalPrivacyPolicy } from "components/ModalPopup";

// import EventSection from "./EventSection";
import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

const Home = () => {
  const history = useHistory();
  const { roomId } = useParams<{ roomId: string }>();

  const onCloseModal = useCallback(() => history.replace("/home"), [history]);

  return (
    <>
      <ModalPrivacyPolicy
        isOpen={roomId === "privacyPolicy"}
        onChangeIsOpen={onCloseModal}
      />
      <InfoSection />
      <div css={{ marginTop: "-10px" }} />
      {/* <EventSection /> */}
      <RoomSection roomId={roomId} />
      <Footer />
    </>
  );
};

export default Home;
