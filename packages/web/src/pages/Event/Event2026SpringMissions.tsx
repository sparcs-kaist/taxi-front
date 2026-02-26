import { memo, useMemo } from "react";

import type { Quest } from "@/types/event2026spring";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as TaxiLogo } from "@/static/assets/sparcsLogos/TaxiLogo.svg";
import CoinGif from "@/static/events/2024springCoin.gif";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";

type MissionContainerProps = {
  quest: Quest;
};

const MissionContainer = ({ quest }: MissionContainerProps) => {
  const { completedQuests } = useValueRecoilState("event2026SpringInfo") || {};
  const [isDone, questCompletedCnt] = useMemo(() => {
    const cnt =
      completedQuests?.filter(({ questId }) => questId === quest.id).length ??
      0;
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.white,
  };
  const styleImage = {
    width: "60%",
    height: "60%",
    objectFit: "contain" as const,
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
    alignItems: "center",
  };
  const styleRewardText = {
    ...theme.font12,
    color: isDone ? theme.gray_text : theme.black,
  };

  return (
    <WhiteContainer
      css={{
        padding: "12px 12px 12px 20px",
        backgroundColor: isDone ? theme.gray_background : theme.white,
        marginBottom: "12px",
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
            {quest.imageUrl ? (
              <img
                src={quest.imageUrl}
                alt={quest.name}
                css={{ width: "100%", height: "100%" }}
              />
            ) : (
              <TaxiLogo css={styleImage} />
            )}
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
          달성 {questCompletedCnt}번 /{" "}
          {quest.maxCount > 0 ? `최대 ${quest.maxCount}번` : "무제한"}
        </div>
        <div css={{ flexGrow: 1 }} />
        <div css={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <img
            src={CoinGif}
            alt="coin"
            css={{ width: "22px", height: "22px" }}
          />
          <div css={{ ...theme.font14_bold, color: theme.black }}>
            {quest.reward.credit}
          </div>
        </div>
      </div>
    </WhiteContainer>
  );
};

const Event2026SpringMissions = () => {
  const { quests } = useValueRecoilState("event2026SpringInfo") || {};

  return (
    <>
      <HeaderWithLeftNav
        value="quests"
        options={[
          {
            value: "quests",
            label: "퀘스트",
            to: "/event/2026spring-missions",
          }
        ]}
      />
      <AdaptiveDiv type="center">
        <div css={{ height: "30px" }} />

        <CreditAmountStatusContainer type="onlycredit" />

        {quests && quests.length > 0 ? (
          quests.map((quest) => (
            <MissionContainer key={quest.id} quest={quest} />
          ))
        ) : (
          <WhiteContainer
            css={{
              padding: "24px",
              textAlign: "center",
              color: theme.gray_text,
              ...theme.font14,
            }}
          >
            현재 참여 가능한 퀘스트가 없습니다.
            <br />
            (백엔드 퀘스트 데이터를 불러오는 중이거나 이벤트에 아직 참여하지
            않았습니다.)
          </WhiteContainer>
        )}

        <Footer type="event-2026spring" />
      </AdaptiveDiv>
    </>
  );
};

export default memo(Event2026SpringMissions);
