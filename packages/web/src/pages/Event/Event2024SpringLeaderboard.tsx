import useQuery from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Empty from "@/components/Empty";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import ProfileImage from "@/components/User/ProfileImage";

import theme from "@/tools/theme";

import Nubzukcoin2 from "@/static/events/2024springCoin.gif";
import { ReactComponent as EventLogo } from "@/static/events/2024springEventLogo.svg";

const LeaderboardTopBar = () => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      padding: "0px 16px",
      gap: "8px",
    }}
  >
    <span
      css={{
        color: theme.white,
        ...theme.font12,
        fontFamily: "Galmuri11",
        textAlign: "center",
      }}
    >
      순위
    </span>
    <span
      css={{
        width: "65px",
        color: theme.white,
        ...theme.font12,
        fontFamily: "Galmuri11",
        textAlign: "center",
      }}
    >
      새터반
    </span>
    <span
      css={{
        marginLeft: "auto",
        marginRight: "auto",
        color: theme.white,
        ...theme.font12,
        fontFamily: "Galmuri11",
        textAlign: "center",
      }}
    >
      MVP
    </span>
    <span
      css={{
        color: theme.white,
        ...theme.font12,
        fontFamily: "Galmuri11",
        textAlign: "right",
        width: "80px",
      }}
    >
      넙죽코인
    </span>
  </div>
);

type LeaderboardElem = {
  group: number;
  creditAmount: number;
  mvpNickname: string;
  mvpProfileImageUrl: string;
};

type LeaderboardItemProps = {
  value: LeaderboardElem;
  rank: number;
  isMe: boolean;
};

const LeaderboardItem = ({ value, rank, isMe }: LeaderboardItemProps) => {
  const styleContainer = (index: number) => {
    switch (index) {
      case 0:
        return {
          background: "linear-gradient(180deg, #FFEB3B 0%, #FF9800 100%)",
          padding: "14px 16px 13px 16px",
          gap: "8px",
          flexDirection: "row",
          height: "fit-content",
          boxShadow:
            "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), " +
            "0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), " +
            "0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
        } as CSS;
      case 1:
        return {
          background: "linear-gradient(180deg, #D6DEE1 0%, #586D75 100%)",
          padding: "14px 16px 13px 16px",
          gap: "8px",
          flexDirection: "row",
          height: "fit-content",
          boxShadow:
            "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), " +
            "0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), " +
            "0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
        } as CSS;
      case 2:
        return {
          background: "linear-gradient(180deg, #FFAD94 0%, #954B2C 100%)",
          padding: "14px 16px 13px 16px",
          gap: "8px",
          flexDirection: "row",
          height: "fit-content",
          boxShadow:
            "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), " +
            "0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), " +
            "0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
        } as CSS;
      case -1:
        return {
          background: "linear-gradient(180deg, #00B2FF 0%, #5E35B1 100%)",
          padding: "14px 16px 13px 16px",
          gap: "8px",
          flexDirection: "row",
          height: "fit-content",
          boxShadow:
            "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), " +
            "0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), " +
            "0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
        } as CSS;
      default:
        return {
          background: "#000000",
          border: "1px solid",
          borderColor: theme.white,
          padding: "14px 16px 13px 16px",
          gap: "8px",
          flexDirection: "row",
          height: "fit-content",
          boxShadow:
            "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), " +
            "0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), " +
            "0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
        } as CSS;
    }
  };

  const styleText = (index: number) => {
    switch (index) {
      case 0:
      case 1:
      case 2:
      case -1:
        return {
          color: theme.white,
          fontFamily: "Galmuri11",
          letterSpacing: -0.75,
          lineHeight: "19px",
          fontSize: "16px",
          fontWeight: 700,
        };
      default:
        return {
          color: theme.white,
          fontFamily: "Galmuri11",
          letterSpacing: -0.75,
          lineHeight: "19px",
          fontSize: "16px",
          fontWeight: 400,
        };
    }
  };

  const styleLeaderboardText = {
    ...theme.font16_bold,
    color: theme.white,
    fontFamily: "Galmuri11",
    textAlign: "center",
  } as CSS;

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "12px",
        ...styleContainer(isMe ? -1 : rank),
      }}
    >
      <span
        css={{
          width: "24px",
          color: theme.white,
          fontFamily: "Galmuri11",
          fontWeight: 700,
          letterSpacing: -0.75,
          lineHeight: "19px",
          fontSize: "16px",
          textAlign: "center",
        }}
      >
        {rank + 1}
      </span>
      <div
        css={{
          ...theme.font16,
          ...theme.ellipsis,
          ...styleText(isMe ? -1 : rank),
        }}
      >
        {"새터 " + value.group + "반"}
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <ProfileImage url={value.mvpProfileImageUrl} />
        </div>
        <span
          css={{
            fontSize: "10px",
            fontWeight: 400,
            color: theme.white,
            fontFamily: "Galmuri11",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "130px",
          }}
        >
          {value.mvpNickname}
        </span>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "8px",
          width: "80px",
        }}
      >
        <img
          src={Nubzukcoin2}
          alt="넙죽코인"
          css={{ width: "24px", height: "24px" }}
        />
        <span css={{ ...styleLeaderboardText }}>
          {value.creditAmount || "000"}
        </span>
      </div>
    </div>
  );
};

const Event2024SpringLeaderboard = () => {
  const { leaderboard, group } = useQuery.get(
    "/events/2024spring/publicNotice/leaderboard"
  )[1] || {
    leaderboard: [],
    group: 0,
    rank: 0,
  };
  let prevRank = 0;
  let prevCreditAmount = 0;

  return (
    <>
      <HeaderWithBackButton>
        <span css={{ color: theme.purple, ...theme.font18 }}>새터반 순위</span>
      </HeaderWithBackButton>

      <div css={{ background: "#000000", height: "100%" }}>
        <AdaptiveDiv type="center">
          <div
            className="body"
            css={{
              paddingTop: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <EventLogo
              css={{
                minWidth: "335px",
                minHeight: "60px",
                margin: "0 auto",
              }}
            />
            <div
              className="Leaderboard Container"
              css={{
                paddingTop: "15px",
                width: "auto",
              }}
            >
              {leaderboard.length > 0 ? (
                <>
                  <div
                    css={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <LeaderboardTopBar />
                    {leaderboard
                      .sort((a: LeaderboardElem, b: LeaderboardElem) => {
                        return b.creditAmount - a.creditAmount ||
                          b.group === group
                          ? 1
                          : a.group - b.group;
                      })
                      .map((elem: LeaderboardElem, index: number) => {
                        if (prevCreditAmount !== elem.creditAmount) {
                          prevRank = index;
                          prevCreditAmount = elem.creditAmount;
                        }
                        return (
                          <LeaderboardItem
                            key={index}
                            rank={prevRank}
                            value={elem}
                            isMe={group === elem.group}
                          />
                        );
                      })}
                  </div>
                </>
              ) : (
                <Empty type="mobile">리더보드가 비어있습니다.</Empty>
              )}
            </div>
          </div>
        </AdaptiveDiv>
        <Footer type="event-2024spring" />
      </div>
    </>
  );
};

export default Event2024SpringLeaderboard;
