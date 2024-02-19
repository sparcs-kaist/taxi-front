import useQuery from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Empty from "@/components/Empty";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import ProfileImage from "@/components/User/ProfileImage";

import eventTheme from "@/tools/eventTheme";
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
        textAlign: "center",
        ...eventTheme.font12,
      }}
    >
      순위
    </span>
    <span
      css={{
        width: "65px",
        textAlign: "center",
        color: theme.white,
        ...eventTheme.font12,
      }}
    >
      새터반
    </span>
    <span
      css={{
        marginLeft: "auto",
        marginRight: "auto",
        color: theme.white,
        textAlign: "center",
        ...eventTheme.font12,
      }}
    >
      MVP
    </span>
    <span
      css={{
        color: theme.white,
        width: "80px",
        textAlign: "right",
        ...eventTheme.font12,
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
          background: eventTheme.gold_leaderboard,
        };
      case 1:
        return {
          background: eventTheme.silver_leaderboard,
        };
      case 2:
        return {
          background: eventTheme.copper_leaderboard,
        };
      case -1:
        return {
          background: eventTheme.blue_leaderboard,
        };
      default:
        return {
          background: eventTheme.black,
          border: "1px solid",
          borderColor: theme.white,
        };
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
          ...eventTheme.font16_bold,
        };
      default:
        return {
          color: theme.white,
          ...eventTheme.font16,
        };
    }
  };
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "12px",
        padding: "14px 16px 13px 16px",
        gap: "8px",
        flexDirection: "row",
        height: "fit-content",
        boxShadow: eventTheme.shadow_leaderboard,
        ...styleContainer(isMe ? -1 : rank),
      }}
    >
      <span
        className="rank"
        css={{
          width: "24px",
          color: theme.white,
          textAlign: "center",
          ...eventTheme.font16_bold,
        }}
      >
        {rank + 1}
      </span>
      <span
        className="group"
        css={{
          ...theme.font16,
          ...theme.ellipsis,
          ...styleText(isMe ? -1 : rank),
        }}
      >
        {"새터 " + value.group + "반"}
      </span>
      <div
        className="profileContainer"
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
          className="profileImageContainer"
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
          className="mvpNickname"
          css={{
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "130px",
            color: theme.white,
            ...eventTheme.font10,
          }}
        >
          {value.mvpNickname}
        </span>
      </div>
      <div
        className="creditAmountContainer"
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
        <span
          className="creditAmount"
          css={{
            ...eventTheme.font16_bold,
            color: theme.white,
            textAlign: "center",
          }}
        >
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

      <div css={{ background: eventTheme.black, height: "100%" }}>
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
                          : a.group === group
                          ? -1
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
