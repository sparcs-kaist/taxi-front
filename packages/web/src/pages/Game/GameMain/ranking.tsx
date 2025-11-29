import { useEffect, useState } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";

// AdaptiveDiv 제거 (GameMain에서 이미 사용 중이므로 중복 제거)
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

// [수정] API 응답 데이터 구조에 맞춘 인터페이스 정의
interface Ranker {
  _id: string;
  userId: string;
  level: number;
  nickname: string;
}

interface LeaderboardResponse {
  leaderboard: Ranker[];
  userIncludedInTop20: boolean;
}

const Ranking = () => {
  const axios = useAxios();
  const [rankings, setRankings] = useState<Ranker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRankings = () => {
    setIsLoading(true);
    axios({
      url: "/miniGame/miniGames/leaderboard",
      method: "get",
      onSuccess: (data: LeaderboardResponse) => {
        setRankings(data.leaderboard);
        setIsLoading(false);
      },
      onError: () => setIsLoading(false),
    });
  };

  useEffect(() => {
    fetchRankings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}위`;
  };

  const getRankStyle = (rank: number) => {
    if (rank <= 3) return { fontWeight: "bold", color: theme.purple };
    return { color: theme.gray_text };
  };

  return (
    <WhiteContainer
      css={{
        padding: "24px",
        width: "90%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // 상하 여백을 주면서 좌우는 auto로 설정하여 중앙 정렬 보장
        marginTop: "16px",
        marginBottom: "50px",
      }}
    >
      <div
        style={{
          ...theme.font16_bold,
          marginBottom: "20px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        🏆 명예의 전당
      </div>
      {isLoading ? (
        <div style={{ padding: "20px", color: theme.gray_text }}>
          랭킹 불러오는 중...
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {rankings.length === 0 ? (
            <div style={{ textAlign: "center", color: theme.gray_text }}>
              아직 랭킹 정보가 없습니다.
            </div>
          ) : (
            rankings.map((user, index) => {
              const rank = index + 1; // [수정] 인덱스로 순위 계산
              return (
                <div
                  key={user._id} // [수정] 고유값인 _id 사용
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    // [수정] 상위 3등 강조 배경색
                    backgroundColor: rank <= 3 ? "#F3E5F5" : "#fff",
                    borderRadius: "8px",
                    border: `1px solid ${theme.gray_line || "#eee"}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      overflow: "hidden", // 닉네임 길 경우 처리
                    }}
                  >
                    <div
                      style={{
                        width: "30px",
                        textAlign: "center",
                        fontSize: rank <= 3 ? "20px" : "14px",
                        fontWeight: "bold",
                        flexShrink: 0,
                      }}
                    >
                      {getRankBadge(rank)}
                    </div>
                    <div
                      style={{
                        ...theme.font14,
                        ...getRankStyle(rank),
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "120px", // 닉네임 최대 길이 제한
                      }}
                    >
                      {user.nickname}
                    </div>
                  </div>
                  <div
                    style={{
                      ...theme.font14_bold,
                      color: theme.black,
                      flexShrink: 0,
                    }}
                  >
                    +{user.level}강
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </WhiteContainer>
  );
};

export default Ranking;
