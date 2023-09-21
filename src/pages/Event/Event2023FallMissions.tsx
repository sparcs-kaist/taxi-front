import { memo, useMemo } from "react";

import type { Quest } from "types/event2023fall";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import AdaptiveDiv from "components/AdaptiveDiv";
import CreditAmountStatusContainer from "components/Event/CreditAmountStatusContainer";
import Footer from "components/Footer";
import HeaderWithBackButton from "components/Header/HeaderWithBackButton";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import { ReactComponent as CreditIcon } from "static/events/2023fallCredit.svg";
import { ReactComponent as MissionCompleteIcon } from "static/events/2023fallMissionComplete.svg";
import { ReactComponent as Ticket1Icon } from "static/events/2023fallTicket1.svg";

type MissionContainerProps = {
  quest: Quest;
};
const MissionContainer = ({ quest }: MissionContainerProps) => {
  const { completedQuests } = useValueRecoilState("event2023FallInfo") || {};
  const [isDone, questCompletedCnt] = useMemo(() => {
    const cnt =
      completedQuests?.filter((questId) => questId === quest?.id).length || 0;
    const isDone = quest.maxCount ? cnt >= quest.maxCount : false;
    return [isDone, cnt];
  }, [quest, completedQuests]);

  const styleBody = {
    display: "flex",
  };
  const styleImageWrap = {
    flexGrow: 0,
    width: "25%",
    overflow: "hidden",
    marginRight: "12px",
    position: "relative" as const,
  };
  const styleImageBorder = {
    position: "relative" as const,
    aspectRatio: "1 / 1",
    border: `1px solid ${theme.gray_line}`,
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: theme.white,
  };
  const styleImage = {
    width: "100%",
    height: "100%",
  };
  const styleBlur = {
    background: theme.black_40,
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };
  const styleContentBox = {
    width: 0,
    flexGrow: 1,
  };
  const styleTitle = {
    ...theme.font16_bold,
    color: isDone ? theme.gray_text : theme.black,
    marginBottom: "4px",
  };
  const styleDescription = {
    ...theme.font12,
    color: isDone ? theme.gray_text : theme.black,
  };
  const styleReward = {
    display: "flex",
    marginTop: "12px",
    gap: "4px",
  };
  const styleRewardText = {
    ...theme.font12_bold,
    color: isDone ? theme.gray_text : theme.black,
  };
  const styleStamp = {
    position: "absolute" as const,
    right: "-10px",
    bottom: "-10px",
    width: "100px",
    height: "100px",
    opacity: 0.5,
  };

  return (
    <WhiteContainer
      css={{
        padding: "12px 12px 12px 20px",
        backgroundColor: isDone ? theme.gray_background : theme.white,
      }}
    >
      <div
        css={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "8px",
          background: isDone ? theme.purple_disabled : theme.purple,
        }}
      />
      <div css={styleBody}>
        <div css={styleImageWrap}>
          <div css={styleImageBorder}>
            <img src={quest.imageUrl} alt={quest.name} css={styleImage} />
            {isDone && <div css={styleBlur} />}
          </div>
        </div>
        <div css={styleContentBox}>
          <div css={styleTitle}>{quest.name}</div>
          <div
            css={styleDescription}
            dangerouslySetInnerHTML={{ __html: quest.description }}
          />
        </div>
      </div>
      <div css={styleReward}>
        <div css={styleRewardText}>
          달성 {questCompletedCnt}번 / 최대 {quest.maxCount}번
        </div>
        <div css={{ flexGrow: 1 }} />
        {!isDone && (
          <>
            <div css={styleRewardText}>달성 시에</div>
            {quest.reward.credit ? (
              <CreditIcon
                css={{ width: "27px", height: "16px", marginTop: "-2px" }}
              />
            ) : (
              <Ticket1Icon
                css={{
                  width: "27px",
                  height: "27px",
                  marginTop: "-6px",
                }}
              />
            )}
            <div css={styleRewardText}>
              X {quest.reward.credit + (quest.reward.ticket1 || 0)} 획득
            </div>
          </>
        )}
      </div>
      {isDone && <MissionCompleteIcon css={styleStamp} />}
    </WhiteContainer>
  );
};

const Event2023FallMissions = () => {
  const { quests } = useValueRecoilState("event2023FallInfo") || {};

  return (
    <>
      <HeaderWithBackButton>
        <div css={{ color: theme.purple, ...theme.font18 }}>퀘스트</div>
      </HeaderWithBackButton>
      <AdaptiveDiv type="center">
        <div css={{ height: "30px" }} />
        <CreditAmountStatusContainer />
        <WhiteContainer>
          <div
            css={{
              ...theme.font14,
              color: theme.black,
              margin: "0 4px",
            }}
          >
            <div css={theme.font14}>
              <b>⏳ 이벤트 시작 대기 : </b>이벤트 시작일, 9월 25일(월) 전까지는
              퀘스트를 달성할 수 없습니다. 조금만 기다려주세요!
            </div>
          </div>
        </WhiteContainer>
        {quests?.map((quest) => (
          <MissionContainer key={quest.id} quest={quest} />
        ))}
        <Footer type="event-2023fall" />
      </AdaptiveDiv>
    </>
  );
};

export default memo(Event2023FallMissions);
