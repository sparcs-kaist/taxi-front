import { useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

import PopupPrivacyPolicy from "pages/Mypage/PopupPrivacyPolicy";

import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

const Home = () => {
  const history = useHistory();
  const { roomId } = useParams<{ roomId: string }>();

  const onCloseModal = useCallback(() => history.replace("/home"), [history]);

  return (
    <>
      <PopupPrivacyPolicy
        isOpen={roomId === "privacyPolicy"}
        onClose={onCloseModal}
      />
      <InfoSection />
      <RoomSection roomId={roomId} />
    </>
  );
};

export default Home;
