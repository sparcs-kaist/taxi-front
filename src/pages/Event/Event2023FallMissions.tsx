import { memo } from "react";

import AdaptiveDiv from "components/AdaptiveDiv";
import CreditAmountStatusContainer from "components/Event/CreditAmountStatusContainer";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

// const creditAmout = 1000;

// const mockData = [
//   {
//     id: 1,
//     userName: "wecode",
//     content: "Welcome to world best coding bootcamp!",
//     isLiked: true,
//   },
//   {
//     id: 2,
//     userName: "joonsikyang",
//     content: "Hi there.",
//     isLiked: false,
//   },
// ];

const MissionContainer = () => {
  const styleBody = {
    display: "flex",
    gap: "12px",
  };
  const styleImageWrap = {
    flexGrow: 0,
    width: "25%",
    aspectRatio: "1 / 1",
    border: `2px solid #EEEEEE`,
    borderRadius: "10px",
    overflow: "hidden",
  };
  const styleContentBox = {
    width: 0,
    flexGrow: 1,
  };
  const styleTitle = {
    ...theme.font16_bold,
  };
  const styleDescription = {
    ...theme.font12,
  };
  const styleReward = {
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <WhiteContainer css={{ padding: "12px 12px 12px 20px" }}>
      <div
        css={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "8px",
          background: theme.purple,
        }}
      />
      <div css={styleBody}>
        <div css={styleImageWrap}></div>
        <div css={styleContentBox}>
          <div css={styleTitle}>정산해요 택시의 숲</div>
          <div css={styleDescription}>
            2명 이상 탑승하고 정산 완료하기 여기는 미션 설명을 위한 공간입니다
            최대 세 줄까지 들어가도록 해볼게요
          </div>
        </div>
      </div>
      <div css={styleReward}>
        <div>hi</div>
        <div>hello</div>
      </div>
    </WhiteContainer>
  );
};

const Event2023FallMissions = () => {
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
      <MissionContainer />
      <MissionContainer />
      <MissionContainer />
    </AdaptiveDiv>
  );
};

export default memo(Event2023FallMissions);
