import { memo, useState } from "react";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";

import Button from "@/components/Button";
import {
  ModalEvent2024SpringJoin,
  ModalNotification,
} from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import eventTheme from "@/tools/eventTheme";
import theme from "@/tools/theme";

const SuggestJoinEventContainer = () => {
  const isLogin = useIsLogin();
  const { isAgreeOnTermsOfEvent, completedQuests } =
    useValueRecoilState("event2024SpringInfo") || {};

  const [isOpenJoin, setIsOpenJoin] = useState<boolean>(false);
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);

  const styleButton = {
    padding: "12px",
    borderRadius: "12px",
    ...eventTheme.font12_bold,
    background: eventTheme.blue_title,
  };
  const styleTitle = {
    ...eventTheme.font16_bold,
    background: eventTheme.blue_title,
    backgroundClip: "text",
    textFillColor: "transparent",
    marginBottom: "4px",
  };
  const styleDescription = {
    ...eventTheme.font10,
    color: theme.white,
    margin: "12px",
  };

  return (
    <>
      {!isLogin ? null : !isAgreeOnTermsOfEvent ? (
        <WhiteContainer
          css={{
            padding: "14px 16px",
            background: eventTheme.black,
            border: "1px solid #FFF",
          }}
        >
          <div css={styleTitle}>🌟 첫 발걸음</div>
          <div css={styleDescription}>
            이벤트 참여 동의 이후 퀘스트 달성이 가능합니다. 많은 혜택과 기회를
            놓치지 마세요!
          </div>
          <Button
            type="purple"
            css={styleButton}
            onClick={() => setIsOpenJoin(true)}
          >
            이벤트 참여하기
          </Button>
        </WhiteContainer>
      ) : completedQuests && !completedQuests.includes("adPushAgreement") ? (
        <WhiteContainer
          css={{
            padding: "14px 16px",
            background: eventTheme.black,
            border: "1px solid #FFF",
          }}
        >
          <div css={styleTitle}>🌟 Taxi의 소울메이트</div>
          <div css={styleDescription}>
            Taxi 서비스를 잊지 않도록 가끔 찾아갈게요! 광고성 푸시 알림 수신
            동의를 해주시면 방이 많이 모이는 시즌, 주변에 택시앱 사용자가 있을
            때 알려드릴 수 있어요.
          </div>
          <Button
            type="purple"
            css={styleButton}
            onClick={() => setIsOpenNotification(true)}
          >
            광고성 푸시 알림 수신 동의하고 넙죽코인 50개 얻기
          </Button>
        </WhiteContainer>
      ) : null}
      <ModalEvent2024SpringJoin
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

export default memo(SuggestJoinEventContainer);
