import { css } from "@emotion/react";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "components/AdaptiveDiv";
import CreditAmountStatusContainer from "components/Event/CreditAmountStatusContainer";
import RabbitAnimatedBackground from "components/Event/RabbitAnimatedBackground";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import MissionBackground from "static/events/2023fallMissionBackground.png";
import { ReactComponent as RiceCake1Icon } from "static/events/2023fallRiceCake1.svg";
import { ReactComponent as RiceCake2Icon } from "static/events/2023fallRiceCake2.svg";
import { ReactComponent as RiceCake3Icon } from "static/events/2023fallRiceCake3.svg";
import { ReactComponent as RiceCake4Icon } from "static/events/2023fallRiceCake4.svg";

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

const BodyMissions = () => {
  const styleCake1 = css`
    position: absolute;
    top: 11%;
    left: 10%;
    width: 50%;
    animation: ricecake1ㅡani 1s infinite alternate;
    @keyframes ricecake1ㅡani {
      from {
        transform: translate(0, 0) rotate(0deg);
      }
      to {
        transform: translate(10%, 10%) rotate(10deg);
      }
    }
  `;
  const styleCake2 = css`
    position: absolute;
    top: -10%;
    left: 5%;
    width: 40%;
    animation: ricecake2ㅡani 1s infinite alternate;
    @keyframes ricecake2ㅡani {
      from {
        transform: translate(0, 0) rotate(0deg);
      }
      to {
        transform: translate(-5%, 5%) rotate(-10deg);
      }
    }
  `;
  const styleCake3 = css`
    position: absolute;
    top: 0;
    left: 55%;
    width: 40%;
    animation: ricecake3ㅡani 1s infinite alternate;
    @keyframes ricecake3ㅡani {
      from {
        transform: translate(0, 0) rotate(0deg);
      }
      to {
        transform: translate(15%, -12%) rotate(20deg);
      }
    }
  `;
  const styleCake4 = css`
    position: absolute;
    top: 30%;
    left: -3%;
    width: 40%;
    animation: ricecake4ㅡani 1s infinite alternate;
    @keyframes ricecake4ㅡani {
      from {
        transform: translate(0, 0) rotate(0deg);
      }
      to {
        transform: translate(17%, -12%) rotate(10deg);
      }
    }
  `;

  return (
    <div css={{ position: "relative", width: "100%", height: "100%" }}>
      <img
        src={MissionBackground}
        css={{ width: "100%", height: "100%" }}
        alt=""
      />
      <RiceCake4Icon css={styleCake4} />
      <RiceCake1Icon css={styleCake1} />
      <RiceCake2Icon css={styleCake2} />
      <RiceCake3Icon css={styleCake3} />
      <div
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
};

const BodyStore = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const getBodyWidth = useCallback(() => {
    return bodyRef.current ? bodyRef.current.clientWidth : 0;
  }, []);

  const [width, setWidth] = useState<number>(getBodyWidth());
  useEffect(() => {
    const resizeEvent = () => setWidth(getBodyWidth());
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);
  const ratio = (width / 600) * 1.7;
  // 참고 : RabbitAnimatedBackground 크기 =  800 * 600

  return (
    <>
      <div
        ref={bodyRef}
        css={{
          position: "relative",
          background: "linear-gradient(to right, #1e3c72, #2a5298)",
        }}
      >
        <div
          css={{
            width: "800px",
            height: "600px",
            transform: `scale(${ratio}) translate(-1%, -16%)`,
            marginLeft: `${400 * ratio - 400}px`,
            marginTop: `${300 * ratio - 300}px`,
          }}
        >
          <RabbitAnimatedBackground />
        </div>
      </div>
      <div
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(0,0,0,0.3)",
        }}
      />
    </>
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
        추석 이벤트
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
                2023/09/10 - 10/11
                <br />
                절찬리 진행 중!
              </>
            }
          />
        </Link>
        <Link to="/event/2023fall-missions" css={{ width: 0, flexGrow: 1 }}>
          <ButtonContainer
            title="퀘스트"
            description={<>이지피지하게 달성하고 달달한 송편 받기</>}
          >
            <BodyMissions />
          </ButtonContainer>
        </Link>
        <Link to="/event/2023fall-store" css={{ width: 0, flexGrow: 1 }}>
          <ButtonContainer
            title="달토끼 상점"
            description={
              <>
                00명의 사용자가
                <br />
                상품을 구매했어요
              </>
            }
          >
            <BodyStore />
          </ButtonContainer>
        </Link>
      </div>
    </AdaptiveDiv>
  );
};

export default EventSection2023Fall;
