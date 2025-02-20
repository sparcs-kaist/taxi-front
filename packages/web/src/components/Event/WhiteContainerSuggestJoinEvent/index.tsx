import { useState } from "react";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";

import Button from "@/components/Button";
import {
  ModalEvent2025SpringJoin,
  ModalNotification,
} from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const WhiteContainerSuggestJoinEvent = () => {
  const isLogin = useIsLogin();
  const { isAgreeOnTermsOfEvent, completedQuests } =
    useValueRecoilState("event2025SpringInfo") || {};
  const isAdPushAgreementCompleted = completedQuests?.some(
    ({ questId }) => questId === "adPushAgreement"
  );

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
            이벤트 참여 동의 이후 퀘스트 달성 및 응모권 교환소 이용이
            가능합니다. 많은 혜택과 기회를 놓치지 마세요!
          </div>
          <Button
            type="purple"
            css={styleButton}
            onClick={() => setIsOpenJoin(true)}
          >
            이벤트 참여하기
          </Button>
        </WhiteContainer>
      ) : completedQuests && !isAdPushAgreementCompleted ? (
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
            광고성 푸시 알림 수신 동의하고 넙죽코인 500개 얻기
          </Button>
        </WhiteContainer>
      ) : null}
      <ModalEvent2025SpringJoin
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
