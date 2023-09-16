import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";
import ProfileImage from "components/User/ProfileImage";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import { ReactComponent as TicketIcon } from "static/events/2023fallTicketIcon.svg";

// const RankIcon = ({}) => {};

type ticketAmountProps = {
  amount: number;
  fill: string;
  marginLeft?: string;
};

const TicketAmount = ({ amount, fill, marginLeft }: ticketAmountProps) => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginLeft: marginLeft,
        ...theme.font16_bold,
      }}
    >
      <TicketIcon fill={fill} />
      {amount}
    </div>
  );
};

const LeaderboardItem = ({
  index,
  name,
  profileImageUrl,
  ticket1Amount,
  ticket2Amount,
}: Leader & { index: number }) => {
  return (
    <WhiteContainer
      css={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
      }}
    >
      <div
        css={{
          width: "30px",
          height: "30px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: theme.shadow,
          flexShrink: 0,
        }}
      >
        <ProfileImage url={profileImageUrl} />
      </div>
      <div
        css={{
          margin: "0 8px",
          ...theme.ellipsis,
        }}
      >
        {name}
      </div>
      <TicketAmount marginLeft="auto" amount={ticket1Amount} fill="#FAC85A" />
      <TicketAmount marginLeft="24px" amount={ticket2Amount} fill="#B2B2B2" />
    </WhiteContainer>
  );
};

type Leader = {
  name: string;
  profileImageUrl: string;
  ticket1Amount: number;
  ticket2Amount: number;
};

const testLeaderboard: Leader[] = [
  // 닉네임이 다 좀 이상한데 제가 만든건 아니고 챗지피티가... ㅎㅎ 백 연결되면 뺄 예정이니 남겨주세요 :)
  {
    name: "바람의노래",
    ticket1Amount: 99,
    ticket2Amount: 98,
    profileImageUrl: "https://via.placeholder.com/150?text=WindSong",
  },
  {
    name: "빛나는별빛여행자",
    ticket1Amount: 97,
    ticket2Amount: 96,
    profileImageUrl: "https://via.placeholder.com/150?text=ShiningStar",
  },
  {
    name: "정말_정말_저어엉말_아름다운_선형대수학개론",
    ticket1Amount: 95,
    ticket2Amount: 94,
    profileImageUrl: "https://via.placeholder.com/150?text=RabbitMoon",
  },
  {
    name: "불꽃춤추는자",
    ticket1Amount: 93,
    ticket2Amount: 92,
    profileImageUrl: "https://via.placeholder.com/150?text=FireDancer",
  },
  {
    name: "천사의미소",
    ticket1Amount: 91,
    ticket2Amount: 90,
    profileImageUrl: "https://via.placeholder.com/150?text=AngelSmile",
  },
  {
    name: "물결타는서퍼",
    ticket1Amount: 89,
    ticket2Amount: 88,
    profileImageUrl: "https://via.placeholder.com/150?text=Wavesurfer",
  },
  {
    name: "구름을걷는자",
    ticket1Amount: 87,
    ticket2Amount: 86,
    profileImageUrl: "https://via.placeholder.com/150?text=Cloudwalker",
  },
  {
    name: "사과나무아래서",
    ticket1Amount: 85,
    ticket2Amount: 84,
    profileImageUrl: "https://via.placeholder.com/150?text=UnderAppleTree",
  },
  {
    name: "섬의왕자",
    ticket1Amount: 83,
    ticket2Amount: 82,
    profileImageUrl: "https://via.placeholder.com/150?text=IslandPrince",
  },
  {
    name: "파도소리",
    ticket1Amount: 81,
    ticket2Amount: 80,
    profileImageUrl: "https://via.placeholder.com/150?text=WaveSound",
  },
];

const Event2023FallLeaderboard = () => {
  // 백 연결을 기다리는 중...
  // const [, leaderboard] = useQuery.get<Leader[]>(
  //   "/events/2023fall/public-notice/leaderboard"
  // );
  const leaderboard = testLeaderboard; // 백 연결을 기다리는 중...

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
      {leaderboard?.map((item, index) => (
        <LeaderboardItem key={index} index={index} {...item} />
      ))}
    </AdaptiveDiv>
  );
};

export default Event2023FallLeaderboard;
