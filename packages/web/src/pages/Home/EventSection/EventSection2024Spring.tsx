import { ReactElement, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import WhiteContainerSuggestJoinEvent from "@/components/Event/WhiteContainerSuggestJoinEvent";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as BackgroundMain } from "@/static/events/2023fallHomeMain.svg";
import { ReactComponent as BackgroundMission } from "@/static/events/2023fallHomeMission.svg";
import { ReactComponent as BackgroundStore } from "@/static/events/2023fallHomeStore.svg";

type EventButtonProps = {
  title: string;
  top: string;
  bottom: string;
};

const EventButton = ({ title, top, bottom }: EventButtonProps) => {
  const background = `linear-gradient(180deg, ${top} 0%, ${bottom} 100%);`;

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
      }}
    >
      <p
        css={{
          fontFamily: "Galmuri11",
          fontWeight: 700,
          fontSize: "16px",
          testAlign: "center",
          lineHeight: "19px",
          fontStyle: "normal",
          letterSpacing: "-0.4px",
          background,
          color: theme.white,
          borderRadius: "12px",
        }}
      >
        {title}
      </p>
    </div>
  );
};

const EventSection2024Spring = () => {
  const styleContainer = {
    position: "relative" as const,
    // height: "fit-content",
    width: "100%",
    paddingTop: "5px",
    background: "black",
  };

  return (
    <AdaptiveDiv type="center" css={styleContainer}>
      <div css={{ display: "flex", gap: "15px" }}>
        <Link to="/event/2024spring" css={{ width: 0, flexGrow: 1 }}>
          <EventButton
            title="이벤트 안내"
            top="#00B2FF"
            bottom="#0401B4"
          ></EventButton>
        </Link>
        <Link to="/event/2024spring-missions" css={{ width: 0, flexGrow: 1 }}>
          <EventButton
            title="퀘스트"
            top="#F111DA"
            bottom="#5E35B1"
          ></EventButton>
        </Link>
        <Link to="/event/2023fall-store" css={{ width: 0, flexGrow: 1 }}>
          <EventButton
            title="달토끼 상점"
            top="#FFC700"
            bottom="#C50A0A"
          ></EventButton>
        </Link>
      </div>
      <WhiteContainerSuggestJoinEvent />
    </AdaptiveDiv>
  );
};

export default EventSection2024Spring;
