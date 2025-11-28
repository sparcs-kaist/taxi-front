import Modal from "@/components/Modal";
import ProfileImage from "@/components/User/ProfileImage";

import theme from "@/tools/theme";

import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

type LeaderboardElem = {
  userId: string;
  nickname: string;
  profileImageUrl: string;
  score: number;
  rank: number;
};

const MOCK_LEADERBOARD: LeaderboardElem[] = [
  {
    userId: "1",
    nickname: "택시왕",
    profileImageUrl: "",
    score: 15000,
    rank: 1,
  },
  {
    userId: "2",
    nickname: "베스트드라이버",
    profileImageUrl: "",
    score: 12500,
    rank: 2,
  },
  {
    userId: "3",
    nickname: "안전운전",
    profileImageUrl: "",
    score: 10000,
    rank: 3,
  },
  {
    userId: "4",
    nickname: "초보운전",
    profileImageUrl: "",
    score: 8000,
    rank: 4,
  },
  {
    userId: "5",
    nickname: "스피드레이서",
    profileImageUrl: "",
    score: 5000,
    rank: 5,
  },
];

const LeaderboardTopBar = () => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      ...theme.font12,
      color: theme.purple_disabled,
      marginTop: "4px",
      borderBottom: `1px solid ${theme.gray_line}`,
    }}
  >
    <span css={{ width: "30px", textAlign: "center" }}>순위</span>
    <span css={{ marginLeft: "16px", flexGrow: 1 }}>닉네임</span>
    <span css={{ width: "80px", textAlign: "right" }}>점수</span>
  </div>
);

const LeaderboardItem = ({
  value,
  rank,
  isMe = false,
}: {
  value: LeaderboardElem;
  rank: number;
  isMe?: boolean;
}) => {
  const styleContainer = (index: number) => {
    switch (index) {
      case 1:
        return {
          color: "#C6B200",
          border: "0.5px solid #E4CD00",
          background: "#FFEE5A",
          boxShadow: "0px 1px 5px 0px #E4CD00",
        };
      case 2:
        return {
          color: "#96BCC6",
          border: "0.5px solid #BBD4DA",
          background: "#EEF6F8",
          boxShadow: "0px 1px 5px 0px #BBD4DA",
        };
      case 3:
        return {
          color: "#CD6830",
          border: "0.5px solid #DE8C5D",
          background: "#FFC5A4",
          boxShadow: "0px 1px 5px 0px #DE8C5D",
        };
      case -1:
        return {
          color: theme.purple_disabled,
          background: theme.purple,
          boxShadow: theme.shadow,
        };
      default:
        return {
          color: theme.purple_disabled,
          background: theme.white,
          boxShadow: theme.shadow,
        };
    }
  };

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        padding: "8px 15px",
        marginBottom: "8px",
        gap: "8px",
        borderRadius: "10px",
        ...styleContainer(isMe ? -1 : rank),
        ...(isMe ? { color: theme.white } : {}),
      }}
    >
      <span
        css={{
          width: "30px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {rank}
      </span>
      <div
        css={{
          width: "30px",
          height: "30px",
          borderRadius: "15px",
          overflow: "hidden",
          flexShrink: 0,
          marginLeft: "5px",
        }}
      >
        <ProfileImage url={value.profileImageUrl} />
      </div>
      <div
        css={{
          ...theme.font16_bold,
          ...theme.ellipsis,
          marginLeft: "8px",
          flexGrow: 1,
          color: isMe ? theme.white : theme.black,
        }}
      >
        {value.nickname}
      </div>
      <div
        css={{
          ...theme.font16_bold,
          width: "80px",
          textAlign: "right",
          color: isMe ? theme.white : theme.purple,
        }}
      >
        {value.score.toLocaleString()}
      </div>
    </div>
  );
};

type ModalLeaderboardProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalLeaderboard = ({
  isOpen,
  onChangeIsOpen,
}: ModalLeaderboardProps) => {
  return (
    <Modal isOpen={isOpen} onChangeIsOpen={onChangeIsOpen} padding="16px 12px">
      <div
        css={{
          ...theme.font18,
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <EmojiEventsRoundedIcon
          style={{ fontSize: "21px", margin: "0 4px 0 8px" }}
        />
        랭킹
      </div>
      <LeaderboardTopBar />
      <div css={{ maxHeight: "400px", overflowY: "auto", marginTop: "8px" }}>
        {MOCK_LEADERBOARD.map((elem) => (
          <LeaderboardItem key={elem.rank} rank={elem.rank} value={elem} />
        ))}
      </div>
    </Modal>
  );
};

export default ModalLeaderboard;
