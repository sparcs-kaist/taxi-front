import { memo } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import LinkEvent2023FallInstagramStoryShare from "@/components/Link/LinkEvent2023FallInstagramStoryShare";
import WhiteContainer from "@/components/WhiteContainer";

import { EventButton } from "../Home/EventSection/EventSection2024Spring";

import eventTheme from "@/tools/eventTheme";
import theme from "@/tools/theme";

import { ReactComponent as TaxiLogoIcon } from "@/static/assets/sparcsLogos/TaxiLogo.svg";
import { ReactComponent as MainSection1 } from "@/static/events/2023fallMainSection1.svg";
import { ReactComponent as MainSection4 } from "@/static/events/2023fallMainSection4.svg";
import { ReactComponent as MainSection5 } from "@/static/events/2023fallMainSection5.svg";
import { ReactComponent as MainSection5Background } from "@/static/events/2023fallMainSection5Background.svg";
import { ReactComponent as MainSection6 } from "@/static/events/2023fallMainSection6.svg";
import { ReactComponent as MainStep2 } from "@/static/events/2023fallMainStep2.svg";
import { ReactComponent as MainStep3 } from "@/static/events/2023fallMainStep3.svg";
import { ReactComponent as MissionCompleteIcon } from "@/static/events/2023fallMissionComplete.svg";
import { ReactComponent as HomeSection1 } from "@/static/events/2024springHome01.svg";
import LineArt from "@/static/events/2024springLineArt.png";
import NupzukiEyes from "@/static/events/2024springNubzukiEyes.png";
import { ReactComponent as MainTitle } from "@/static/events/2024springTitle.svg";

const Event2024Spring = () => {
  const styleTextBox = {
    ...eventTheme.font20,
    display: "flex",
    padding: "24px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    border: "4px solid #000",
    background: "#FFF",
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        <img src={LineArt} css={{ width: "100%" }} />
        <EventButton
          title="이벤트 참여하기"
          background={eventTheme.home_button}
        />
      </AdaptiveDiv>
      <AdaptiveDiv
        type="center"
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(180deg, #00B2FF 0%, #000 100%)",
          padding: "80px 0px 20px 0px",
        }}
      >
        <img src={NupzukiEyes} css={{ width: "100%" }} />
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
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          background: "linear-gradient(180deg, #00B2FF 0%, #000 100%)",
          padding: "80px 0px",
        }}
      ></AdaptiveDiv>

      <Footer type="event-2024spring" />
    </div>
  );
};

export default memo(Event2024Spring);
