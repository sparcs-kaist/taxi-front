import { memo, useMemo } from "react";

import type { Quest } from "types/event2023fall";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import AdaptiveDiv from "components/AdaptiveDiv";
import CreditAmountStatusContainer from "components/Event/CreditAmountStatusContainer";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import { ReactComponent as CreditIcon } from "static/events/2023fallCredit.svg";

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
    aspectRatio: "1 / 1",
    border: `2px solid #EEEEEE`,
    borderRadius: "10px",
    overflow: "hidden",
    marginRight: "12px",
    backgroundColor: theme.white,
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
    justifyContent: "space-between",
    marginTop: "12px",
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
          <img src={quest.imageUrl} alt={quest.name} />
        </div>
        <div css={styleContentBox}>
          <div css={styleTitle}>{quest.name}</div>
          <div css={styleDescription}>{quest.description}</div>
        </div>
      </div>
      {!isDone && (
        <div css={styleReward}>
          <div css={theme.font12}>
            달성 {questCompletedCnt}번 / 최대 {quest.maxCount}번
          </div>
          <div
            css={{
              display: "flex",
              width: "57px",
              justifyContent: "space-between",
            }}
          >
            <CreditIcon css={{ width: "27px", height: "16px" }} />
            <div css={theme.font12}>{quest.reward?.credit}</div>
          </div>
        </div>
      )}
    </WhiteContainer>
  );
};

const Event2023FallMissions = () => {
  const { quests } = useValueRecoilState("event2023FallInfo") || {};
  return (
    <AdaptiveDiv type="center">
      <HeaderWithLeftNav
        value="missions"
        options={[
          {
            value: "missions",
            label: "퀘스트",
            to: "/event/2023fall-missions",
          },
        ]}
      />
      <div css={{ height: "30px" }} />
      <CreditAmountStatusContainer />
      {quests?.map((quest) => (
        <MissionContainer key={quest.id} quest={quest} />
      ))}
    </AdaptiveDiv>
  );
};

export default memo(Event2023FallMissions);
