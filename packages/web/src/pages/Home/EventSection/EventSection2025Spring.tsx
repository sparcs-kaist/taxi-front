import { ReactElement } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import WhiteContainerSuggestJoinEvent from "@/components/Event/WhiteContainerSuggestJoinEvent";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as BackgroundMain } from "@/static/events/2023fallHomeMain.svg";
import { ReactComponent as BackgroundMission } from "@/static/events/2025springHomeMission.svg";
import { ReactComponent as BackgroundStore } from "@/static/events/2025springHomeStore.svg";

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

const EventSection2025Spring = () => {
  return (
    <AdaptiveDiv type="center">
      <Title icon="festival" isHeader>
        새학기 이벤트
      </Title>
      <CreditAmountStatusContainer />
      <div css={{ display: "flex", gap: "15px" }}>
        <Link to="/event/2025spring" css={{ width: 0, flexGrow: 1 }}>
          <ButtonContainer
            title="이벤트 안내"
            description={
              <>
                02/21 - 03/12
                <br />
                절찬리 진행 중!
              </>
            }
          >
            <BackgroundMain css={{ width: "100%", height: "100%" }} />
          </ButtonContainer>
        </Link>
        <div css={{ width: 0, flexGrow: 1 }}>
          <Link to="/event/2025spring-missions">
            <ButtonContainer
              title="퀘스트"
              description={<>이지피지하게 달성하고 넙죽코인 받기</>}
            >
              <BackgroundMission css={{ width: "100%", height: "100%" }} />
            </ButtonContainer>
          </Link>
        </div>
        <div css={{ width: 0, flexGrow: 1 }}>
          <Link to="/event/2025spring-store">
            <ButtonContainer
              title="응모권 교환소"
              description={
                <>
                  응모권 구매해서
                  <br />
                  경품 추첨에 참여하기
                </>
              }
            >
              <BackgroundStore css={{ width: "100%", height: "100%" }} />
            </ButtonContainer>
          </Link>
        </div>
      </div>
      <WhiteContainerSuggestJoinEvent />
    </AdaptiveDiv>
  );
};

export default EventSection2025Spring;
