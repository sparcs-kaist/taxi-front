import { useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

import { ModalPrivacyPolicy } from "components/ModalPopup";

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
      <RoomSection roomId={roomId} />
    </>
  );
};

export default Home;
