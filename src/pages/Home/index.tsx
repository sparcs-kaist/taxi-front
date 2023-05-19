import { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import Footer from "components/Footer";
import { ModalPrivacyPolicy } from "components/ModalPopup";

import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

import { getDynamicLink } from "tools/trans";

const Home = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { roomId: _roomId } = useParams<{ roomId: string }>();
  const roomId = _roomId === "privacyPolicy" ? null : _roomId;

  useEffect(() => {
    if (pathname === "/") history.replace("/home");
    if (pathname.startsWith("/invite") && roomId) {
      // dynamic link로 웹에서 앱으로 이동가능할 시 이동합니다.
      window.location.href = getDynamicLink(`/home/${roomId}`);
    }
  }, [roomId, pathname]);

  const onChangeIsOpenPrivacyPolicy = () => history.replace("/home");

  return (
    <>
      <InfoSection />
      <div css={{ marginTop: "-10px" }} />
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
