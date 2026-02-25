import { ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";

import { useFetchRecoilState } from "@/hooks/useFetchRecoilState";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as BackgroundMain } from "@/static/events/2026springHomeInfo.svg";
import { ReactComponent as BackgroundStore } from "@/static/events/2026springHomeMain.svg";
import { ReactComponent as BackgroundMission } from "@/static/events/2026springHomeMission.svg";

type ButtonContainerProps = {
  title: string;
  description: ReactElement;
  children?: ReactElement;
};

const ButtonContainer = ({
  title,
  description,
  children,
}: ButtonContainerProps) => {
  return (
    <WhiteContainer
      css={{
        padding: "0",
        aspectRatio: 1,
      }}
    >
      <div
        css={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: theme.purple,
        }}
      >
        {children}
      </div>
      <div
        css={{
          position: "absolute",
          left: "12px",
          right: "12px",
          bottom: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <div
          css={{ ...theme.font16_bold, textAlign: "right", color: theme.white }}
        >
          {title}
        </div>
        <div css={{ ...theme.font10, textAlign: "right", color: theme.white }}>
          {description}
        </div>
      </div>
    </WhiteContainer>
  );
};

const EventSection2026Spring = () => {
  const fetchGameInfo = useFetchRecoilState("gameInfo");

  useEffect(() => {
    fetchGameInfo();
  }, [fetchGameInfo]);

  return (
    <AdaptiveDiv type="center">
      <Title icon="festival" isHeader>
        택시 강화하기
      </Title>
      <CreditAmountStatusContainer type="credit" />
      <div css={{ display: "flex", gap: "15px" }}>
        <Link to="/event/2026spring" css={{ width: 0, flexGrow: 1 }}>
          <ButtonContainer
            title="이벤트 안내"
            description={
              <>
                2026 봄 택시
                <br />
                이벤트 진행 중!
              </>
            }
          >
            <BackgroundMain css={{ width: "100%", height: "100%" }} />
          </ButtonContainer>
        </Link>
        <div css={{ width: 0, flexGrow: 1 }}>
          <Link to="/event/2026spring-missions">
            <ButtonContainer
              title="퀘스트"
              description={
                <>
                  퀘스트 달성하고
                  <br />
                  아이템 받기
                </>
              }
            >
              <BackgroundMission css={{ width: "100%", height: "100%" }} />
            </ButtonContainer>
          </Link>
        </div>
        <div css={{ width: 0, flexGrow: 1 }}>
          <Link to="/game/main">
            <ButtonContainer
              title="강화 페이지"
              description={
                <>
                  택시 강화하고
                  <br />
                  랭킹 올리기
                </>
              }
            >
              <BackgroundStore css={{ width: "100%", height: "100%" }} />
            </ButtonContainer>
          </Link>
        </div>
      </div>
    </AdaptiveDiv>
  );
};

export default EventSection2026Spring;
