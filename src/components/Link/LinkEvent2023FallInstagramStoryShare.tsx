import { HTMLAttributes, ReactNode, useCallback, useState } from "react";

import { useEvent2023FallQuestComplete } from "@/hooks/event/useEvent2023FallQuestComplete";
import { sendPopupInstagramStoryShareToFlutter } from "@/hooks/skeleton/useFlutterEventCommunicationEffect";
import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";

import ModalEvent2023FallJoin from "@/components/ModalPopup/ModalEvent2023FallJoin";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { deviceType } from "@/tools/loadenv";

const backgroundLayerDefaultUrl =
  "https://sparcs-taxi-prod.s3.ap-northeast-2.amazonaws.com/assets/event-2023fall/instagram_background.png";
const stickerLayerDefaultUrl =
  "https://sparcs-taxi-prod.s3.ap-northeast-2.amazonaws.com/assets/event-2023fall/instagram_sticker.png";

type LinkEvent2023FallInstagramStoryShareProps = {
  type: "eventSharingOnInstagram" | "purchaseSharingOnInstagram";
  backgroundLayerUrl?: string;
  stickerLayerUrl?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLAnchorElement>;

const LinkEvent2023FallInstagramStoryShare = ({
  type,
  backgroundLayerUrl = backgroundLayerDefaultUrl,
  stickerLayerUrl = stickerLayerDefaultUrl,
  children,
  ...aProps
}: LinkEvent2023FallInstagramStoryShareProps) => {
  const setAlert = useSetRecoilState(alertAtom);
  const isLogin = useIsLogin();
  const { isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2023FallInfo") || {};
  const [isOpenJoin, setIsOpenJoin] = useState<boolean>(false);

  //#region event2023Fall
  const event2023FallQuestComplete = useEvent2023FallQuestComplete();
  //#endregion

  const onClick = useCallback(async () => {
    if (!deviceType.startsWith("app/")) {
      setAlert("앱에서만 이용 가능합니다.");
    } else if (!isLogin) {
      setAlert("로그인 이후 이용해주세요.");
    } else if (!isAgreeOnTermsOfEvent) {
      setIsOpenJoin(true);
    } else {
      const result = await sendPopupInstagramStoryShareToFlutter({
        backgroundLayerUrl,
        stickerLayerUrl,
      });
      if (result) {
        event2023FallQuestComplete(type);
      } else {
        setAlert("인스타그램 실행에 실패하였습니다.");
        return;
      }
    }
  }, [
    isLogin,
    isAgreeOnTermsOfEvent,
    backgroundLayerUrl,
    stickerLayerUrl,
    event2023FallQuestComplete,
  ]);

  return (
    <>
      <a onClick={onClick} css={{ textDecoration: "none" }} {...aProps}>
        {children}
      </a>
      <ModalEvent2023FallJoin
        isOpen={isOpenJoin}
        onChangeIsOpen={setIsOpenJoin}
      />
    </>
  );
};

export default LinkEvent2023FallInstagramStoryShare;
