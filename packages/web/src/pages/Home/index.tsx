import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

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

  const {
    roomId: _roomId,
    inviterId,
    eventStatusId,
  } = useParams<{
    roomId: string;
    inviterId: string;
    eventStatusId: string;
  }>();

  const isOpenEventJoin = inviterId ? true : _roomId == "startEvent";
  const onChangeIsOpenPrivacyPolicy = () => history.replace("/home");
  const onChangeIsOpenEventJoin = () => history.replace("/home");

  const roomId =
    _roomId === "privacyPolicy" ? null : isOpenEventJoin ? null : _roomId;

  useEffect(() => {
    if (!eventStatusId) return;
    const redirectPath = window.location.pathname.replace(
      "/event/2024spring-invite",
      "/home/startEvent"
    );
    const dynamicLink = getDynamicLink(redirectPath);
    window.location.href = dynamicLink;
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
        inviterId={inviterId}
        isOpen={isOpenEventJoin}
        onChangeIsOpen={onChangeIsOpenEventJoin}
      />
    </>
  );
};

export default Home;
