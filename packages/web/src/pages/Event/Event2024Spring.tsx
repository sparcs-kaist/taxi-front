import { ReactNode, memo, useState } from "react";
import { Link } from "react-router-dom";

import { QuestId } from "@/types/event2024spring";

import useQuery from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import EventButton from "@/components/Event/EventButton";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import { ModalEvent2024SpringShare } from "@/components/ModalPopup";

import { MissionContainer } from "./Event2024SpringMissions";

import eventTheme from "@/tools/eventTheme";
import theme from "@/tools/theme";

import AIArt from "@/static/events/2024springAIArt.png";
import GoldPrize from "@/static/events/2024springGoldPrize.png";
import LineArt from "@/static/events/2024springLineArt.png";
import NupzukCoin from "@/static/events/2024springNubzukcoinLarge.gif";
import NupzukiEyes from "@/static/events/2024springNubzukiEyes.png";
import SilverPrize from "@/static/events/2024springSilverPrize.png";
import { ReactComponent as MainTitle } from "@/static/events/2024springTitle.svg";

type EventStepProps = {
  step: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

const EventStep = ({
  step,
  title,
  subtitle = "",
  children,
}: EventStepProps) => {
  return (
    <div
      css={{
        display: "flex",
        padding: "16px",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        border: "1px solid #FFF",
        borderRadius: "12px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        css={{
          ...eventTheme.font12,
          color: theme.white,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          textAlign: "center",
        }}
      >
        {step}
        <div css={{ ...eventTheme.font20, color: theme.white }}>
          {title}
          <br></br>
          {subtitle}
        </div>
      </div>
      {children}
    </div>
  );
};

const Event2024Spring = () => {
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [, inviteUrl_] = useQuery.post(`/events/2024spring/invite/create`, {}, [
    isOpenShare,
  ]);

  const inviteUrl = inviteUrl_?.inviteUrl;

  const styleTextBox = {
    ...eventTheme.font20,
    display: "flex",
    padding: "24px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    border: "4px solid #000",
    background: "#FFF",
  } as const;
  const styleVerticalCenter = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  } as const;

  const styleAdaptiveDiv = {
    ...styleVerticalCenter,
    width: "100%",
    margin: 0,
  } as const;

  const exampleMission = {
    name: "첫 발걸음",
    description:
      "로그인만 해도 넙죽코인을 얻을 수 있다고?? 이벤트 기간에 처음으로 SPARCS Taxi 서비스에 로그인하여 넙죽코인을 받아보세요.",
    imageUrl:
      "https://sparcs-taxi-prod.s3.ap-northeast-2.amazonaws.com/assets/event-2024spring/quest_firstLogin.png",
    reward: {
      credit: 50,
      ticket1: 0,
    },
    id: "firstLogin" as QuestId,
    maxCount: 1,
  };

  return (
    <div
      css={{
        backgroundColor: eventTheme.black,
      }}
    >
      <HeaderWithBackButton>
        <div css={{ color: theme.purple, ...theme.font18 }}>이벤트 안내</div>
      </HeaderWithBackButton>
      <AdaptiveDiv
        type="center"
        css={{
          ...styleVerticalCenter,
          gap: "16px",
          padding: "20px",
        }}
      >
        <MainTitle css={{ width: "100%", marginTop: "12px" }} />
        <div
          css={{
            ...eventTheme.font20,
            color: theme.white,
          }}
        >
          2024.02.23. ~ 03.18.
        </div>
        <img src={LineArt} alt="line art" css={{ width: "100%" }} />
        <EventButton
          title="이벤트 공유하기"
          css={{ background: eventTheme.home_button }}
          onClick={() => setIsOpenShare(true)}
        />
        <ModalEvent2024SpringShare
          isOpen={isOpenShare}
          onChangeIsOpen={setIsOpenShare}
          inviteUrl={inviteUrl}
        />
      </AdaptiveDiv>
      <AdaptiveDiv
        type="center"
        css={{
          ...styleAdaptiveDiv,
          background: eventTheme.nubzuki_eyes,
          padding: "80px 0 20px 0",
        }}
      >
        <img
          src={NupzukiEyes}
          alt="Nupzuki Eyes"
          css={{ width: "100%", maxWidth: "380px" }}
        />
        <div css={{ ...styleTextBox, width: "335px" }}>
          <span css={{ color: eventTheme.kaist, ...eventTheme.font20 }}>
            KAIST
          </span>
          24학번 새내기들이여...
        </div>
      </AdaptiveDiv>
      <AdaptiveDiv
        type="center"
        css={{
          ...styleAdaptiveDiv,
          padding: "80px 0",
          gap: "10px",
        }}
      >
        <div
          css={{
            ...styleVerticalCenter,
            position: "relative",
            width: "100%",
            height: "631px",
            background: eventTheme.ai_img,
          }}
        >
          <div
            css={{
              ...styleTextBox,
              position: "absolute",
              top: 0,
              left: "40px",
              width: "calc(100% - 200px)",
              minWidth: "120px",
              maxWidth: "250px",
            }}
          >
            아주 오래전부터
          </div>
          <img
            src={AIArt}
            alt="AI Art of a taxi"
            css={{
              position: "absolute",
              top: "129px",
              width: "100%",
              flexShrink: 0,
              maxWidth: "380px",
            }}
          />
          <div
            css={{
              ...styleTextBox,
              position: "absolute",
              bottom: "84px",
              right: "20px",
              width: "calc(100% - 120px)",
              minWidth: "200px",
              display: "block",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            KAIST 학생들은{" "}
            <span
              css={{
                color: theme.purple,
                ...eventTheme.font20,
                display: "inline",
              }}
            >
              택시
            </span>
            를 타고 곳곳을 모험했습니다.
          </div>
        </div>
      </AdaptiveDiv>
      <AdaptiveDiv
        type="center"
        css={{
          ...styleVerticalCenter,
          padding: "32px 11px 97.75px 11px",
          gap: "40px",
          background: eventTheme.radial_coin,
          ...eventTheme.font28,
          color: theme.white,
          textAlign: "center",
        }}
      >
        이제 여러분들의 차례입니다!
        <img src={NupzukCoin} alt="Nupzuk Coin" css={{ width: "180px" }} />
      </AdaptiveDiv>
      <AdaptiveDiv
        type="center"
        css={{
          ...styleVerticalCenter,
          padding: "20px 0",
          gap: "10px",
          width: "100%",
          ...eventTheme.font20,
          color: theme.white,
          textAlign: "center",
          background: eventTheme.blue_title,
          backgroundClip: "text",
          textFillColor: "transparent",
        }}
      >
        이벤트 참여 방법<br></br>↓
      </AdaptiveDiv>
      <AdaptiveDiv
        type="center"
        css={{
          ...styleVerticalCenter,
          padding: "0 20px",
          gap: "16px",
          // width: "100%",
          boxSizing: "border-box",
        }}
      >
        <EventStep
          step="STEP 1"
          title="퀘스트 달성하고"
          subtitle="넙죽코인 획득 !"
        >
          <div css={{ width: "100%" }}>
            <MissionContainer quest={exampleMission} />
          </div>
          <Link
            to="/event/2024spring-missions"
            css={{ textDecoration: "none", width: "100%" }}
          >
            <EventButton
              title="퀘스트 보러가기"
              css={{ background: eventTheme.purple_button }}
            />
          </Link>
        </EventStep>
        <EventStep
          step="STEP 2"
          title="이벤트 종료 후"
          subtitle="세터반 순위대로 상품 지급 !"
        >
          <div
            css={{
              ...styleVerticalCenter,
              gap: "8px",
              width: "100%",
            }}
          >
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                color: theme.white,
                textAlign: "center",
              }}
            >
              <span css={{ ...eventTheme.font12, width: "144px" }}>
                1등 세터반
              </span>
              <span css={{ ...eventTheme.font12, width: "144px" }}>
                2등 세터반
              </span>
            </div>
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img src={GoldPrize} alt="prize" css={{ width: "144px" }} />
              <img src={SilverPrize} alt="prize" css={{ width: "144px" }} />
            </div>
          </div>
          <Link
            to="/event/2024spring-leaderboard"
            css={{ textDecoration: "none", width: "100%" }}
          >
            <EventButton
              title="세터반 순위 보러가기"
              css={{ background: eventTheme.orange_button }}
            />
          </Link>
        </EventStep>
        <EventStep step="EVENT" title="인스타그램 공유이벤트">
          <Link to="/" css={{ textDecoration: "none", width: "100%" }}>
            <EventButton
              title="인스타그램 게시물 보러가기"
              css={{ background: eventTheme.instagram_button }}
            />
          </Link>
        </EventStep>
      </AdaptiveDiv>
      <Footer type="event-2024spring" />
    </div>
  );
};

export default memo(Event2024Spring);
