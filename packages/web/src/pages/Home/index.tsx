import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import useQuery from "@/hooks/useTaxiAPI";

import Footer from "@/components/Footer";
import {
  ModalEvent2024SpringJoin,
  ModalPrivacyPolicy,
} from "@/components/ModalPopup";

import EventSection from "./EventSection";
import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

import { getDynamicLink } from "@/tools/trans";

const Home = () => {
  const history = useHistory();

  const { roomId: _roomId } = useParams<{ roomId: string }>();
  const { inviterId: _inviterId } = useParams<{ inviterId: string }>();

  const isOpenEventJoin = _inviterId ? true : _roomId == "startEvent";
  const onChangeIsOpenPrivacyPolicy = () => history.replace("/home");
  const onChangeIsOpenEventJoin = () => history.replace("/home");

  const roomId =
    _roomId === "privacyPolicy" ? null : isOpenEventJoin ? null : _roomId;

  useEffect(() => {
    if (!eventStatusId) return;
    const dynamicLink = getDynamicLink(window.location.pathname);
    window.location.replace(dynamicLink);
    
  }, [eventStatusId]);

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
      <ModalEvent2024SpringJoin
        isOpen={isOpenEventJoin}
        onChangeIsOpen={onChangeIsOpenEventJoin}
      />
    </>
  );
};

export default Home;
