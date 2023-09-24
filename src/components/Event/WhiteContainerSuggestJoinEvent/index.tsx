import { useMemo, useState } from "react";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import Button from "components/Button";
import LinkEvent2023FallInstagramStoryShare from "components/Link/LinkEvent2023FallInstagramStoryShare";
import {
  ModalEvent2023FallJoin,
  ModalNotification,
} from "components/ModalPopup";
import WhiteContainer from "components/WhiteContainer";

import { deviceType } from "tools/loadenv";
import theme from "tools/theme";

const WhiteContainerSuggestJoinEvent = () => {
  const isLogin = !!useValueRecoilState("loginInfo")?.id;
  const { isAgreeOnTermsOfEvent, completedQuests } =
    useValueRecoilState("event2023FallInfo") || {};

  const randomToken = useMemo(() => !!Math.floor(Math.random() * 2), []);
  const [isOpenJoin, setIsOpenJoin] = useState<boolean>(false);
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);

  const styleText = {
    ...theme.font14,
    marginBottom: "12px",
  };
  const styleButton = {
    padding: "14px 0 13px",
    borderRadius: "12px",
    ...theme.font14_bold,
  };

  return (
    <>
      {!isLogin ? null : !isAgreeOnTermsOfEvent ? (
        <WhiteContainer>
          <div css={styleText}>
            <b>🌟 첫 발걸음</b>
          </div>
          <div css={styleText}>
            이벤트 참여 동의 이후 퀘스트 달성 및 달토끼 상점 이용이 가능합니다.
            많은 혜택과 기회를 놓치지 마세요!
          </div>
          <Button
            type="purple"
            css={styleButton}
            onClick={() => setIsOpenJoin(true)}
          >
            이벤트 참여하기
          </Button>
        </WhiteContainer>
      ) : randomToken &&
        completedQuests &&
        !completedQuests.includes("adPushAgreement") ? (
        <WhiteContainer>
          <div css={styleText}>
            <b>🌟 Taxi의 소울메이트</b>
          </div>
          <div css={styleText}>
            Taxi 서비스를 잊지 않도록 가끔 찾아갈게요! 광고성 푸시 알림 수신
            동의를 해주시면 방이 많이 모이는 시즌, 주변에 택시앱 사용자가 있을
            때 알려드릴 수 있어요.
          </div>
          <Button
            type="purple"
            css={styleButton}
            onClick={() => setIsOpenNotification(true)}
          >
            광고성 푸시 알림 수신 동의하고 송편 50개 얻기
          </Button>
        </WhiteContainer>
      ) : completedQuests &&
        !completedQuests.includes("eventSharingOnInstagram") &&
        deviceType.startsWith("app/") ? (
        <WhiteContainer>
          <div css={styleText}>
            <b>🌟 나만 알기에는 아까운 이벤트</b>
          </div>
          <div css={styleText}>
            추석에 맞춰 쏟아지는 혜택들. 나만 알 순 없죠. 인스타그램 친구들에게
            스토리로 공유해보아요.
          </div>
          <LinkEvent2023FallInstagramStoryShare type="eventSharingOnInstagram">
            <Button type="purple" css={styleButton}>
              인스타그램 스토리에 공유하고 송편 100개 얻기
            </Button>
          </LinkEvent2023FallInstagramStoryShare>
        </WhiteContainer>
      ) : completedQuests && !completedQuests.includes("adPushAgreement") ? (
        <WhiteContainer>
          <div css={styleText}>
            <b>🌟 Taxi의 소울메이트</b>
          </div>
          <div css={styleText}>
            Taxi 서비스를 잊지 않도록 가끔 찾아갈게요! 광고성 푸시 알림 수신
            동의를 해주시면 방이 많이 모이는 시즌, 주변에 택시앱 사용자가 있을
            때 알려드릴 수 있어요.
          </div>
          <Button
            type="purple"
            css={styleButton}
            onClick={() => setIsOpenNotification(true)}
          >
            광고성 푸시 알림 수신 동의하고 송편 50개 얻기
          </Button>
        </WhiteContainer>
      ) : null}
      <ModalEvent2023FallJoin
        isOpen={isOpenJoin}
        onChangeIsOpen={setIsOpenJoin}
      />
      <ModalNotification
        isOpen={isOpenNotification}
        onChangeIsOpen={setIsOpenNotification}
      />
    </>
  );
};

export default WhiteContainerSuggestJoinEvent;
