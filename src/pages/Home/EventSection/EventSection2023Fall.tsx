import { ReactElement, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "components/AdaptiveDiv";
import CreditAmountStatusContainer from "components/Event/CreditAmountStatusContainer";
import WhiteContainerSuggestJoinEvent from "components/Event/WhiteContainerSuggestJoinEvent";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import { ReactComponent as BackgroundMain } from "static/events/2023fallHomeMain.svg";
import { ReactComponent as BackgroundMission } from "static/events/2023fallHomeMission.svg";
import { ReactComponent as BackgroundStore } from "static/events/2023fallHomeStore.svg";

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

const EventSection2023Fall = () => {
  const [amountType, setAmountType] = useState<"credit" | "ticket">("credit");
  const changeAmountType = useCallback(
    () => setAmountType((prev) => (prev === "credit" ? "ticket" : "credit")),
    []
  );
  useEffect(() => {
    const interval = setInterval(changeAmountType, 3000);
    return () => clearInterval(interval);
  });

  return (
    <AdaptiveDiv type="center">
      <Title icon="festival" isHeader>
        한가위 송편 이벤트
      </Title>
      <CreditAmountStatusContainer
        type={amountType}
        css={{ ...theme.cursor() }}
        onClick={changeAmountType}
      />
      <div css={{ display: "flex", gap: "15px" }}>
        <Link to="/event/2023fall" css={{ width: 0, flexGrow: 1 }}>
          <ButtonContainer
            title="이벤트 안내"
            description={
              <>
                2023/09/25 - 10/09
                <br />
                절찬리 진행 중!
              </>
            }
          >
            <BackgroundMain css={{ width: "100%", height: "100%" }} />
          </ButtonContainer>
        </Link>
        <Link to="/event/2023fall-missions" css={{ width: 0, flexGrow: 1 }}>
          <ButtonContainer
            title="퀘스트"
            description={<>이지피지하게 달성하고 달달한 송편 받기</>}
          >
            <BackgroundMission css={{ width: "100%", height: "100%" }} />
          </ButtonContainer>
        </Link>
        <Link to="/event/2023fall-store" css={{ width: 0, flexGrow: 1 }}>
          <ButtonContainer
            title="달토끼 상점"
            description={
              <>
                귀여운 달토끼가
                <br />
                상점 주인?
              </>
            }
          >
            <BackgroundStore css={{ width: "100%", height: "100%" }} />
          </ButtonContainer>
        </Link>
      </div>
      <WhiteContainerSuggestJoinEvent />
    </AdaptiveDiv>
  );
};

export default EventSection2023Fall;
