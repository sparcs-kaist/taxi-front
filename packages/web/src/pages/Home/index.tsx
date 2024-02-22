import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import useQuery from "@/hooks/useTaxiAPI";

import Footer from "@/components/Footer";
import { ModalPrivacyPolicy } from "@/components/ModalPopup";

import EventSection from "./EventSection";
import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";

import { getDynamicLink } from "@/tools/trans";

const Home = () => {
  const history = useHistory();
  const { roomId: _roomId, eventStatusId: eventStatusId } = useParams<{
    roomId: string;
    eventStatusId: string;
  }>();
  const roomId = _roomId === "privacyPolicy" ? null : _roomId;

  const [, eventProfile] = useQuery.get(
    `/events/2024spring/invite/search/:${roomId}`,
    {},
    [eventStatusId]
  );

  const onChangeIsOpenPrivacyPolicy = () => history.replace("/home");

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
      {/* 모달 완성되면 넣을 곳 */}
    </>
  );
};

export default Home;
