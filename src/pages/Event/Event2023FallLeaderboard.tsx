import { useMemo } from "react";

import { useValueRecoilState } from "hooks/useFetchRecoilState";
import useQuery from "hooks/useTaxiAPI";

import AdaptiveDiv from "components/AdaptiveDiv";
import Empty from "components/Empty";
import Footer from "components/Footer";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";
import ProfileImage from "components/User/ProfileImage";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import { ReactComponent as Ticket1Icon } from "static/events/2023fallTicket1.svg";
import { ReactComponent as Ticket2Icon } from "static/events/2023fallTicket2.svg";

const LeaderboardTopBar = () => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      ...theme.font12,
      color: theme.purple_disabled,
      marginTop: "-10px",
    }}
  >
    <span>순위</span>
    <span css={{ marginLeft: "16px" }}>플레이어</span>
    <Ticket1Icon
      css={{
        marginLeft: "auto",
        width: "30px",
        height: "27px",
        marginTop: "-4px",
        marginBottom: "-4px",
        flexShrink: 0,
      }}
    />
    <Ticket2Icon
      css={{
        width: "30px",
        height: "27px",
        marginTop: "-4px",
        marginBottom: "-4px",
        flexShrink: 0,
      }}
    />
    <span css={{ width: "56px" }}>상품 확률</span>
  </div>
);

type LeaderboardElem = {
  nickname: string;
  profileImageUrl: string;
  ticket1Amount: number;
  ticket2Amount: number;
  probability: number;
};

type LeaderboardItemProps = {
  value: LeaderboardElem;
  rank: number;
  isMe?: boolean;
};

const LeaderboardItem = ({
  value,
  rank,
  isMe = false,
}: LeaderboardItemProps) => {
  const styleContainer = (index: number) => {
    switch (index) {
      case 0:
        return {
          color: "#C6B200",
          border: "0.5px solid #E4CD00",
          background: "#FFEE5A",
          boxShadow: "0px 1px 5px 0px #E4CD00",
          ...theme.font20,
          fontSize: "24px",
        };
      case 1:
        return {
          color: "#96BCC6",
          border: "0.5px solid #BBD4DA",
          background: "#EEF6F8",
          boxShadow: "0px 1px 5px 0px #BBD4DA",
          ...theme.font20,
          fontSize: "24px",
        };
      case 2:
        return {
          color: "#CD6830",
          border: "0.5px solid #DE8C5D",
          background: "#FFC5A4",
          boxShadow: "0px 1px 5px 0px #DE8C5D",
          ...theme.font20,
          fontSize: "24px",
        };
      case -1:
        return {
          color: theme.purple_disabled,
          background: theme.purple,
          boxShadow: theme.shadow,
          ...theme.font20,
        };
      default:
        return {
          color: theme.purple_disabled,
          background: theme.white,
          boxShadow: theme.shadow,
          ...theme.font20,
        };
    }
  };

  const styleText = (index: number) => {
    switch (index) {
      case 0:
        return "#6B6000";
      case 1:
        return "#337182";
      case 2:
        return "#9E3800";
      case -1:
        return theme.white;
      default:
        return theme.purple;
    }
  };

  const styleTicketText = {
    ...theme.font16,
    width: "30px",
    flexShrink: 0,
    textAlign: "center",
  } as CSS;

  const realProbability = useMemo(
    () =>
      1 -
      (1 - value.probability) **
        (value.ticket1Amount * 1 + value.ticket2Amount * 5),
    [value]
  );

  return (
    <WhiteContainer
      css={{
        display: "flex",
        alignItems: "center",
        padding: "8px 15px",
        marginBottom: "8px",
        gap: "8px",
        ...styleContainer(isMe ? -1 : rank),
      }}
    >
      {rank + 1}
      <div
        css={{
          width: "30px",
          height: "30px",
          borderRadius: "15px",
          overflow: "hidden",
          flexShrink: 0,
          flexGrow: 0,
          marginLeft: "5px",
        }}
      >
        <ProfileImage url={value.profileImageUrl} />
      </div>
      {isMe && (
        <div
          css={{
            width: "20px",
            height: "20px",
            ...theme.font12_bold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme.purple_disabled,
            borderRadius: "5px",
            color: theme.purple,
          }}
        >
          나
        </div>
      )}
      <div
        css={{
          ...theme.font16_bold,
          ...theme.ellipsis,
          color: isMe ? theme.white : theme.black,
        }}
      >
        {value.nickname}
      </div>
      <span css={{ marginLeft: "auto", ...styleTicketText }}>
        {value.ticket1Amount || 0}
      </span>
      <span css={{ ...styleTicketText }}>{value.ticket2Amount || 0}</span>
      <div
        css={{
          color: styleText(isMe ? -1 : rank),
          ...theme.font16_bold,
          width: "56px",
          flexShrink: 0,
          textAlign: "right",
        }}
        title={(realProbability * 100).toString()}
      >
        <span css={{ ...theme.font20 }}>
          {Math.trunc(realProbability * 100) || 0}
        </span>
        .{Math.floor(((realProbability * 100) % 1) * 10)}%
      </div>
    </WhiteContainer>
  );
};

const Event2023FallLeaderboard = () => {
  const { leaderboard, rank, probability } = useQuery.get(
    "/events/2023fall/public-notice/leaderboard"
  )[1] || { leaderboard: [], rank: 0 };
  const { ticket1Amount, ticket2Amount } =
    useValueRecoilState("event2023FallInfo") || {};
  const { nickname, profileImgUrl } = useValueRecoilState("loginInfo") || {};
  const myLeaderboardInfo = useMemo<Nullable<LeaderboardElem>>(() => {
    if (!nickname || !profileImgUrl || !probability) return null;
    return {
      nickname,
      profileImageUrl: profileImgUrl,
      ticket1Amount: ticket1Amount || 0,
      ticket2Amount: ticket2Amount || 0,
      probability,
    };
  }, [nickname, profileImgUrl, ticket1Amount, ticket2Amount, probability]);

  return (
    <>
      <HeaderWithLeftNav
        value="leaderboard"
        options={[
          { value: "store", label: "달토끼 상점", to: "/event/2023fall-store" },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2023fall-history",
          },
          {
            value: "leaderboard",
            label: "리더보드",
            to: "/event/2023fall-leaderboard",
          },
        ]}
      />
      <AdaptiveDiv type="center">
        <Title icon="leaderboard" isHeader>
          리더보드
        </Title>
        {leaderboard.length > 0 ? (
          <>
            <LeaderboardTopBar />
            {leaderboard.map((elem: LeaderboardElem, index: number) => (
              <LeaderboardItem
                key={index}
                rank={index}
                value={elem}
                isMe={index === rank - 1}
              />
            ))}
            {rank > 20 && myLeaderboardInfo && (
              <LeaderboardItem rank={rank - 1} value={myLeaderboardInfo} isMe />
            )}
          </>
        ) : (
          <Empty type="mobile">리더보드가 비어있습니다.</Empty>
        )}
      </AdaptiveDiv>
      <Footer type="event-2023fall" />
    </>
  );
};

export default Event2023FallLeaderboard;
