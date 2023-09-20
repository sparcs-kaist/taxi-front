import { useMemo } from "react";

import type { Leader } from "types/event2023fall";

import { useValueRecoilState } from "hooks/useFetchRecoilState";
import useQuery from "hooks/useTaxiAPI";

import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";
import ProfileImage from "components/User/ProfileImage";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import { ReactComponent as Ticket1Icon } from "static/events/2023fallTicket1.svg";
import { ReactComponent as Ticket2Icon } from "static/events/2023fallTicket2.svg";

const LeaderboardTopBar = () => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        gap: "8px",
        ...theme.font12,
        color: theme.purple_disabled,
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
};

const LeaderboardItem = ({
  index,
  nickname,
  profileImageUrl,
  ticket1Amount,
  ticket2Amount,
  probability,
  isMe,
}: Leader & { index: number; isMe: boolean }) => {
  const styleContainer = (index: number) => {
    switch (index) {
      case 0:
        return {
          color: "#C6B200",
          border: "0.5px solid #E4CD00",
          background: "#FFEE5A",
          boxShadow: "0px 1px 5px 0px #E4CD00",
          ...theme.font24,
        };
      case 1:
        return {
          color: "#96BCC6",
          border: "0.5px solid #BBD4DA",
          background: "#EEF6F8",
          boxShadow: "0px 1px 5px 0px #BBD4DA",
          ...theme.font24,
        };
      case 2:
        return {
          color: "#CD6830",
          border: "0.5px solid #DE8C5D",
          background: "#FFC5A4",
          boxShadow: "0px 1px 5px 0px #DE8C5D",
          ...theme.font24,
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
    () => 1 - (1 - probability) ** (ticket1Amount * 1 + ticket2Amount * 5),
    [probability, ticket1Amount, ticket2Amount]
  );

  return (
    <WhiteContainer
      css={{
        display: "flex",
        alignItems: "center",
        padding: "8px 15px",
        marginBottom: "8px",
        gap: "8px",
        ...styleContainer(isMe ? -1 : index),
      }}
    >
      {index + 1}
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
        <ProfileImage url={profileImageUrl} />
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
        {nickname}
      </div>
      <span css={{ marginLeft: "auto", ...styleTicketText }}>
        {ticket1Amount || 0}
      </span>
      <span css={{ ...styleTicketText }}>{ticket2Amount || 0}</span>
      <div
        css={{
          color: styleText(isMe ? -1 : index),
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
  const [, leaderboardResponse] = useQuery.get(
    "/events/2023fall/public-notice/leaderboard"
  );
  const { ticket1Amount, ticket2Amount } =
    useValueRecoilState("event2023FallInfo") || {};
  const { nickname, profileImgUrl } = useValueRecoilState("loginInfo") || {};

  return (
    <AdaptiveDiv type="center">
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
      <Title icon="leaderboard" isHeader>
        리더보드
      </Title>
      <LeaderboardTopBar />
      {leaderboardResponse?.leaderboard.map((item: Leader, index: number) => (
        <LeaderboardItem
          key={index}
          index={index}
          isMe={index == leaderboardResponse?.rank - 1}
          {...item}
        />
      ))}
      {leaderboardResponse?.rank > 20 && (
        <LeaderboardItem
          index={leaderboardResponse?.rank - 1}
          isMe={true}
          nickname={nickname ?? ""}
          profileImageUrl={profileImgUrl ?? ""}
          ticket1Amount={ticket1Amount ?? 0}
          ticket2Amount={ticket2Amount ?? 0}
          probability={leaderboardResponse?.probability}
        />
      )}
    </AdaptiveDiv>
  );
};

export default Event2023FallLeaderboard;
