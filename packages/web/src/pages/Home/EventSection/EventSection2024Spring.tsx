import { Link } from "react-router-dom";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CreditAmountContainer from "@/components/Event/CreditAmoutContainer";
import EventButton from "@/components/Event/EventButton";
import SuggestJoinEventContainer from "@/components/Event/SuggestJoinEventContainer";

import { getDday } from "@/tools/day";
import eventTheme from "@/tools/eventTheme";

import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";

const EventSection2024Spring = () => {
  const styleContainer = {
    position: "relative" as const,
    height: "fit-content",
    width: "100%",
    padding: "5px",
    background: eventTheme.black,
  };

  const { isEligible, isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2024SpringInfo") || {};

  return (
    <>
      {isEligible ? (
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
                새터반 택시대제전
              </div>
              <div
                css={{
                  ...eventTheme.font16,
                  color: eventTheme.white,
                }}
              >
                {getDday("2024-03-18")}
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
              {isAgreeOnTermsOfEvent && <CreditAmountContainer />}
              <div css={{ display: "flex", gap: "15px" }}>
                <Link
                  to="/event/2024spring"
                  css={{ width: 0, flexGrow: 1, textDecoration: "none" }}
                >
                  <EventButton
                    title="이벤트 안내"
                    css={{ background: eventTheme.blue_button }}
                  />
                </Link>
                <Link
                  to="/event/2024spring-missions"
                  css={{ width: 0, flexGrow: 1, textDecoration: "none" }}
                >
                  <EventButton
                    title="퀘스트"
                    css={{ background: eventTheme.purple_button }}
                  />
                </Link>
                <Link
                  to="/event/2024spring-leaderboard"
                  css={{ width: 0, flexGrow: 1, textDecoration: "none" }}
                >
                  <EventButton
                    title="새터반 순위"
                    css={{ background: eventTheme.orange_button }}
                  />
                </Link>
              </div>
            </div>
            <SuggestJoinEventContainer />
          </AdaptiveDiv>
        </div>
      ) : null}
    </>
  );
};

export default EventSection2024Spring;
