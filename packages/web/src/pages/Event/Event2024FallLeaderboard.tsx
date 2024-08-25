import { useMemo } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import useQuery from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Empty from "@/components/Empty";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import Title from "@/components/Title";
import ProfileImage from "@/components/User/ProfileImage";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

// ToDo : 2023fall 이미지
import { ReactComponent as LeaderBoardItems } from "@/static/events/2023fallLeaderBoardItems.svg";
import { ReactComponent as Ticket1Icon } from "@/static/events/2023fallTicket1.svg";
import { ReactComponent as Ticket2Icon } from "@/static/events/2023fallTicket2.svg";

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
    <span css={{ marginLeft: "16px" }}>닉네임</span>
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
    <span css={{ width: "56px" }}>추첨 확률</span>
  </div>
);

type LeaderboardElem = {
  nickname: string;
  profileImageUrl: string;
  ticket1Amount: number;
  ticket2Amount: number;
  probability: number;
  probabilityV2: number;
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
    textAlign: "center" as const,
  };

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
      <span css={styleTicketText}>{value.ticket2Amount || 0}</span>
      <div
        css={{
          color: styleText(isMe ? -1 : rank),
          ...theme.font16_bold,
          width: "56px",
          flexShrink: 0,
          textAlign: "right",
        }}
        title={(value.probabilityV2 * 100).toString()}
      >
        <span css={{ ...theme.font20 }}>
          {Math.trunc(value.probabilityV2 * 100) || 0}
        </span>
        .{Math.floor(((value.probabilityV2 * 100) % 1) * 10)}%
      </div>
    </WhiteContainer>
  );
};

const Event2024FallLeaderboard = () => {
  const {
    leaderboard,
    rank,
    probability,
    probabilityV2,
    totalUserAmount,
    totalTicket1Amount,
    totalTicket2Amount,
  } = useQuery.get("/events/2023fall/public-notice/leaderboard")[1] || {
    leaderboard: [],
    rank: 0,
  }; // ToDo : 2023fall 엔드포인트
  const { ticket1Amount, ticket2Amount } =
    useValueRecoilState("event2024FallInfo") || {};
  const { nickname, profileImgUrl } = useValueRecoilState("loginInfo") || {};
  const myLeaderboardInfo = useMemo<Nullable<LeaderboardElem>>(() => {
    if (!nickname || !profileImgUrl || !probability) return null;
    return {
      nickname,
      profileImageUrl: profileImgUrl,
      ticket1Amount: ticket1Amount || 0,
      ticket2Amount: ticket2Amount || 0,
      probability,
      probabilityV2,
    };
  }, [nickname, profileImgUrl, ticket1Amount, ticket2Amount, probability]);

  return (
    <>
      <HeaderWithLeftNav
        value="leaderboard"
        options={[
          { value: "store", label: "달토끼 상점", to: "/event/2024fall-store" },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2024fall-history",
          },
          {
            value: "leaderboard",
            label: "리더보드",
            to: "/event/2024fall-leaderboard",
          },
        ]}
      />
      <AdaptiveDiv type="center">
        <Title icon="notice" isHeader>
          안내
        </Title>
        <WhiteContainer>
          <div
            css={{
              ...theme.font14,
              color: theme.black,
              margin: "0 4px",
            }}
          >
            <div
              css={{
                ...theme.font14,
                marginBottom: "5px",
              }}
            >
              <b>🌟 참여 방법</b>
            </div>
            <div
              css={{
                ...theme.font14,
                marginBottom: "15px",
              }}
            >
              퀘스트 달성, 달토끼 상점을 통해 응모권을 얻을 수 있습니다.
              <br />
              고급응모권은 일반응모권 당첨 확률의 5배입니다.
              <br />
              여러 개의 응모권으로 중복 참여가 가능합니다.
            </div>
            <div
              css={{
                ...theme.font14,
                marginBottom: "5px",
              }}
            >
              <b>📌 경품 추첨 결과 발표일 : </b>10월 13일(금)
            </div>
            <div
              css={{
                ...theme.font14,
                marginBottom: "15px",
              }}
            >
              추첨 결과는 인스타그램, Ara, Taxi 홈페이지를 통해 발표됩니다.
            </div>
            <div css={{ ...theme.font14, marginBottom: "15px" }}>
              <b>🎁 경품 :</b> 에어팟 3세대 (1명), 택시비 카카오페이 상품권
              5000원 (14명)
            </div>
            <div css={{ textAlign: "center", position: "relative" }}>
              <LeaderBoardItems css={{ width: "235px", maxWidth: "100%" }} />
            </div>
            <div css={{ ...theme.font14, margin: "12px 0 5px" }}>
              <b>🏆 리더보드 :</b> 이벤트 기간 중, 실시간으로 변동되는 내 자신과
              상위 참여자들의 추첨 확률이 공개됩니다.
            </div>
          </div>
        </WhiteContainer>
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
            <div
              css={{
                margin: "12px 12px 0",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <div css={{ color: theme.purple_disabled, ...theme.font12 }}>
                • 리더보드의 추첨 확률은 정확한 확률이 아닌 내부 모델을 사용하여
                계산한 근삿값입니다.
              </div>
              <div css={{ color: theme.purple_disabled, ...theme.font12 }}>
                • 경품 추첨 전체 참여자 수 : {totalUserAmount || 0}명
              </div>
              <div css={{ color: theme.purple_disabled, ...theme.font12 }}>
                • 발급된 전체 일반 응모권 개수 : {totalTicket1Amount || 0}개
              </div>
              <div css={{ color: theme.purple_disabled, ...theme.font12 }}>
                • 발급된 전체 고급 응모권 개수 : {totalTicket2Amount || 0}개
              </div>
            </div>
          </>
        ) : (
          <Empty type="mobile">리더보드가 비어있습니다.</Empty>
        )}
      </AdaptiveDiv>
      <Footer type="event-2023fall" />
    </>
  );
}; // ToDo : 2023fall 문구 및 footer

export default Event2024FallLeaderboard;
