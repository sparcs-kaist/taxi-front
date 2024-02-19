import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";

type EventButtonProps = {
  title: string;
  background: string;
};

export const EventButton = ({ title, background }: EventButtonProps) => {
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
    background: eventTheme.black,
  };

  return (
    <div css={styleContainer}>
      <AdaptiveDiv type="center">
        <div
          css={{
            display: "flex",
            alignItems: "center",
            padding: "30px 0 25px",
            gap: "8px",
          }}
        >
          <svg width={0} height={0}>
            <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
              <stop offset={0} stopColor={eventTheme.blue_icon_top} />
              <stop offset={1} stopColor={eventTheme.blue_icon_bottom} />
            </linearGradient>
          </svg>
          <EmojiEventsRounded
            sx={{ fill: "url(#linearColors)" }}
            css={{
              width: "24px",
              height: "24px",
            }}
          />
          <div
            css={{
              ...eventTheme.font20,
              background: eventTheme.blue_title,
              backgroundClip: "text",
              textFillColor: "transparent",
            }}
          >
            세터반 택시대제전
          </div>
          <div
            css={{
              ...eventTheme.font16,
              color: eventTheme.white,
            }}
          >
            D-001
          </div>
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            paddingBottom: "15px",
          }}
        >
          <div
            css={{
              ...eventTheme.font16,
              display: "flex",
              padding: "14px 16px",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "12px",
              border: "1px solid #FFF",
              color: eventTheme.white,
            }}
          >
            새터 00반 넙죽코인
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
        </div>
      </AdaptiveDiv>
      <WhiteContainerSuggestJoinEvent />
    </div>
  );
};

export default EventSection2024Spring;
