import { useEffect, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Modal from "@/components/Modal";
import ProfileImage from "@/components/User/ProfileImage";

import theme from "@/tools/theme";

import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

type LeaderboardElem = {
  userId: string;
  nickname: string;
  profileImageUrl?: string;
  dodgeScore: number;
  rank?: number;
};

type LeaderboardResponse = {
  leaderboard: LeaderboardElem[];
  userIncludedInTop5?: boolean;
  userIncludedInTop20?: boolean;
  myRank?: number;
  myDodgeScore?: number;
};

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
  nickname,
  profileImageUrl,
}: {
  value: LeaderboardElem;
  rank: number;
  isMe?: boolean;
  nickname?: string;
  profileImageUrl?: string;
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
        <ProfileImage url={profileImageUrl || value.profileImageUrl || ""} />
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
        {nickname || value.nickname || "User"}
      </div>
      <div
        css={{
          ...theme.font16_bold,
          width: "80px",
          textAlign: "right",
          color: isMe ? theme.white : theme.purple,
        }}
      >
        {value.dodgeScore.toLocaleString()}
      </div>
    </div>
  );
};

type ModalDodgeLeaderboardProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalDodgeLeaderboard = ({
  isOpen,
  onChangeIsOpen,
}: ModalDodgeLeaderboardProps) => {
  const axios = useAxios();
  const loginInfo = useValueRecoilState("loginInfo");
  const [leaderboard, setLeaderboard] = useState<LeaderboardElem[]>([]);
  const [myRank, setMyRank] = useState<number | undefined>(undefined);
  const [myDodgeScore, setMyDodgeScore] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (isOpen) {
      axios({
        url: "/miniGame/miniGames/dodgeLeaderboard",
        method: "get",
        onSuccess: (data: LeaderboardResponse) => {
          setLeaderboard(data.leaderboard);
          setMyRank(data.myRank);
          setMyDodgeScore(data.myDodgeScore);
        },
      });
    }
  }, [isOpen, axios]);

  const isMeInLeaderboard = leaderboard.some(
    (elem) => elem.userId === loginInfo?.oid
  );

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
        {leaderboard.map((elem, index) => {
          const isMe = elem.userId === loginInfo?.oid;
          return (
            <LeaderboardItem
              key={index}
              rank={index + 1}
              value={elem}
              isMe={isMe}
              nickname={isMe ? loginInfo?.nickname : elem.nickname}
              profileImageUrl={isMe ? loginInfo?.profileImgUrl : undefined}
            />
          );
        })}
        {!isMeInLeaderboard && myRank && myDodgeScore !== undefined && (
          <div css={{ marginTop: "20px" }}>
            <LeaderboardItem
              rank={myRank}
              value={{
                userId: loginInfo?.oid || "",
                dodgeScore: myDodgeScore,
                nickname: loginInfo?.nickname || "",
              }}
              isMe={true}
              nickname={loginInfo?.nickname}
              profileImageUrl={loginInfo?.profileImgUrl}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalDodgeLeaderboard;
