import { useHistory, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import {
  ModalEvent2025SpringJoin,
  ModalPrivacyPolicy,
} from "@/components/ModalPopup";

import EventSection from "./EventSection";
import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

const Home = () => {
  const history = useHistory();

  const { roomId: _roomId, inviterId } = useParams<{
    roomId?: string;
    inviterId?: string;
  }>();

  const isOpenEventJoin = inviterId ? true : _roomId === "eventJoin";
  const onChangeIsOpenPrivacyPolicy = () => history.replace("/home");
  const onChangeIsOpenEventJoin = () => history.replace("/home");

  const roomId =
    _roomId === "privacyPolicy" ? null : isOpenEventJoin ? null : _roomId;

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
      <ModalEvent2025SpringJoin
        inviterId={inviterId}
        isOpen={isOpenEventJoin}
        onChangeIsOpen={onChangeIsOpenEventJoin}
      />
    </>
  );
};

export default Home;
