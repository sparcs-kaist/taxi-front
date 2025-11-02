import { useHistory, useParams } from "react-router-dom";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";

import Footer from "@/components/Footer";
import {
  ModalEvent2025SpringJoin,
  ModalNoticeBadge,
  ModalPrivacyPolicy,
} from "@/components/ModalPopup";

import EventSection from "./EventSection";
import InfoSection from "./InfoSection";
import NoticeSection from "./NoticeSection";
import RoomSection from "./RoomSection";

import { atom } from "recoil";

export const homeRoomFilterAtom = atom<boolean>({
  key: "homeRoomFilterAtom",
  default: false,
});

const Home = () => {
  const history = useHistory();

  const { roomId: _roomId, inviterId } = useParams<{
    roomId?: string;
    inviterId?: string;
  }>();

  const isOpenEventJoin = inviterId ? true : _roomId === "eventJoin";
  const onChangeIsOpenPrivacyPolicy = () => history.replace("/home");
  const onChangeIsOpenEventJoin = () => history.replace("/home");
  const isLogin = useIsLogin();
  const loginInfo = useValueRecoilState("loginInfo");

  const roomId =
    _roomId === "privacyPolicy" ? null : isOpenEventJoin ? null : _roomId;

  return (
    <>
      <InfoSection />
      <NoticeSection />
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
      {isLogin && loginInfo?.agreeOnTermsOfService && <ModalNoticeBadge />}
    </>
  );
};

export default Home;
