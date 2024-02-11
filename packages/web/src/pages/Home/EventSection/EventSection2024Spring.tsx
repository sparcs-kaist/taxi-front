import { ReactElement, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import CreditAmountContainer from "@/components/Event/CreditAmoutContainer";
import WhiteContainerSuggestJoinEvent from "@/components/Event/WhiteContainerSuggestJoinEvent";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import eventTheme from "@/tools/eventTheme";
import theme from "@/tools/theme";

import { ReactComponent as BackgroundMain } from "@/static/events/2023fallHomeMain.svg";
import { ReactComponent as BackgroundMission } from "@/static/events/2023fallHomeMission.svg";
import { ReactComponent as BackgroundStore } from "@/static/events/2023fallHomeStore.svg";

type EventButtonProps = {
  title: string;
  background: string;
};

const EventButton = ({ title, background }: EventButtonProps) => {
  return (
    <div
      css={{
        ...eventTheme.font16_bold,
        borderRadius: eventTheme.borderRadius,
        textAlign: "center",
        lineHeight: "50px",
        background,
        color: theme.white,
        width: "100%",
        height: "50px",
      }}
    >
      {title}
    </div>
  );
};

const EventSection2024Spring = () => {
  const styleContainer = {
    position: "relative" as const,
    height: "fit-content",
    width: "100%",
    padding: "5px",
    background: "black",
  };

  return (
    <div css={styleContainer}>
      <AdaptiveDiv type="center">
        <div
          css={{
            display: "flex",
            padding: "14px 16px",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "12px",
            border: "1px solid #FFF",
          }}
        >
          <CreditAmountContainer />
        </div>
        <div css={{ display: "flex", gap: "15px" }}>
          <Link
            to="/event/2024spring"
            css={{ width: 0, flexGrow: 1, textDecoration: "none" }}
          >
            <EventButton
              title="이벤트 안내"
              background={eventTheme.blue_button}
            ></EventButton>
          </Link>
          <Link
            to="/event/2024spring-missions"
            css={{ width: 0, flexGrow: 1, textDecoration: "none" }}
          >
            <EventButton
              title="퀘스트"
              background={eventTheme.purple_button}
            ></EventButton>
          </Link>
          <Link
            to="/event/2024spring-ranking"
            css={{ width: 0, flexGrow: 1, textDecoration: "none" }}
          >
            <EventButton
              title="세터반 순위"
              background={eventTheme.orange_button}
            ></EventButton>
          </Link>
        </div>
      </AdaptiveDiv>

      <WhiteContainerSuggestJoinEvent />
    </div>
  );
};

export default EventSection2024Spring;
