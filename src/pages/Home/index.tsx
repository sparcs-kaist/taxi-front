import { useHistory, useParams } from "react-router-dom";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import Footer from "components/Footer";
import { ModalPrivacyPolicy } from "components/ModalPopup";

import InfoSection from "./InfoSection";
import RoomSection from "./RoomSection";
import SuggestAppTopBar from "./SuggestAppTopBar";

import isAppAtom from "atoms/isApp";
import { useRecoilValue } from "recoil";

import isMobile from "tools/isMobile";

const Home = () => {
  const history = useHistory();
  const { roomId: _roomId } = useParams<{ roomId: string }>();
  const roomId = _roomId === "privacyPolicy" ? null : _roomId;

  const { deviceType } = useValueRecoilState("loginInfo") || {};
  const isApp = useRecoilValue(isAppAtom) || deviceType === "app";
  const [isAndroid, isIOS] = isMobile();

  const onChangeIsOpenPrivacyPolicy = () => history.replace("/home");

  return (
    <>
      {(isAndroid || isIOS) && !isApp ? <SuggestAppTopBar /> : null}
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
