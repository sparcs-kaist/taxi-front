import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";
import ProfileImage from "components/User/ProfileImage";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

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
        justifyContent: "space-between",
        padding: "12px 16px",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          css={{
            width: "30px",
            height: "30px",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: theme.shadow,
          }}
        >
          <ProfileImage url={profileImageUrl} />
        </div>
        {name}
      </div>

      <div>hello</div>
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
    name: "토끼달무희",
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
  const leaderboard = testLeaderboard;

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
      <Title icon="notice" isHeader>
        리더보드
      </Title>
      <AdaptiveDiv type="center">
        {leaderboard?.map((item, index) => (
          <LeaderboardItem key={index} index={index} {...item} />
        ))}
      </AdaptiveDiv>
    </AdaptiveDiv>
  );
};

export default Event2023FallLeaderboard;
