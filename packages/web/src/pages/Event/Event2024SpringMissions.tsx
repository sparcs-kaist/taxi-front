import { memo, useMemo } from "react";

import type { Quest } from "@/types/event2023fall";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CoinAmountStatusContainer from "@/components/Event/CoinAmountStatusContainer";
import WhiteContainerSuggestJoinEvent from "@/components/Event/WhiteContainerSuggestJoinEvent";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import WhiteContainer from "@/components/WhiteContainer";

import eventTheme from "@/tools/eventTheme";
import theme from "@/tools/theme";

import Coin from "@/static/events/2024springCoin.gif";
import { ReactComponent as CoinComplete } from "@/static/events/2024springCoinComplete.svg";

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
    ...eventTheme.font16_bold,
    background: isDone ? theme.gray_text : eventTheme.blue_title,
    backgroundClip: "text",
    textFillColor: "transparent",
    marginBottom: "4px",
  };
  const styleDescription = {
    ...eventTheme.font10,
    color: isDone ? theme.gray_text : theme.white,
  };
  const styleReward = {
    display: "flex",
    marginTop: "12px",
    gap: "4px",
  };
  const styleRewardText = {
    ...eventTheme.font12,
    color: isDone ? theme.gray_text : theme.white,
  };
  const styleRewardCoin = {
    ...eventTheme.font12_bold,
    color: isDone ? theme.gray_text : theme.white,
  };

  return (
    <WhiteContainer
      css={{
        padding: "1px",
        background: isDone ? theme.gray_text : eventTheme.blue_title,
      }}
    >
      <div
        css={{
          backgroundColor: "#000",
          padding: "16px",
          border: "1px solid transparent",
          borderRadius: "11px",
        }}
      >
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
            {questCompletedCnt}회 달성 (최대 {quest.maxCount}회)
          </div>
          <div css={{ flexGrow: 1 }} />
          <>
            {isDone ? (
              <CoinComplete width="16px" height="16px" />
            ) : (
              <img width="16px" src={Coin} alt="coin" />
            )}

            <div css={styleRewardCoin}>
              {quest.reward.credit + (quest.reward.ticket1 || 0)}
            </div>
          </>
        </div>
        {/* {isDone && <MissionCompleteIcon css={styleStamp} />} */}
      </div>
    </WhiteContainer>
  );
};

const Event2024SpringMissions = () => {
  const { quests } = useValueRecoilState("event2024SpringInfo") || {};

  return (
    <div
      css={{
        background: eventTheme.black,
      }}
    >
      <HeaderWithBackButton>
        <div css={{ color: theme.purple, ...theme.font18 }}>퀘스트</div>
      </HeaderWithBackButton>
      <AdaptiveDiv type="center">
        <div css={{ height: "30px" }} />
        <CoinAmountStatusContainer />
        <WhiteContainerSuggestJoinEvent />
        {quests?.map((quest) => (
          <MissionContainer key={quest.id} quest={quest} />
        ))}
        <Footer type="event-2024spring" />
      </AdaptiveDiv>
    </div>
  );
};

export default memo(Event2024SpringMissions);
