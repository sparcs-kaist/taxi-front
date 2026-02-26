import { useEffect, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

// [추가]
// AdaptiveDiv 제거 (GameMain에서 이미 사용 중이므로 중복 제거)
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

// [수정] API 응답 데이터 구조에 맞춘 인터페이스 정의
interface Ranker {
  _id: string;
  userId: string;
  bestRecord: number;
  nickname: string;
}

interface LeaderboardResponse {
  leaderboard: Ranker[];
  userIncludedInTop20: boolean;
}

const Ranking = ({ refreshTrigger }: { refreshTrigger?: number }) => {
  const axios = useAxios();
  const loginInfo = useValueRecoilState("loginInfo"); // [추가] 로그인 정보 가져오기
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
  }, [refreshTrigger]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}위`;
  };

  // [수정] 본인 여부에 따른 스타일 반환
  const getRankStyle = (rank: number, isMe: boolean) => {
    if (isMe) return { fontWeight: "bold", color: "white" }; // 본인은 흰색 텍스트
    if (rank <= 3) return { fontWeight: "bold", color: theme.purple };
    return { color: theme.gray_text };
  };

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #ddd;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #ccc;
          }
        `}
      </style>
      <WhiteContainer
        css={{
          padding: "24px 0",
          width: "90%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginBottom: "14px",
            gap: "8px",
          }}
        >
          <div
            style={{
              ...theme.font16_bold,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 24px",
              justifyContent: "center",
            }}
          >
            🏆 명예의 전당
          </div>
          <div
            style={{
              ...theme.font12,
              color: theme.gray_text,
              textAlign: "center",
            }}
          >
            최고 강화 수치를 기준으로 순위가 매겨집니다.
          </div>
        </div>

        <div
          className="custom-scrollbar"
          style={{
            overflowY: "auto",
            width: "100%",
            height: "400px",
          }}
        >
          {isLoading ? (
            <div
              style={{
                padding: "20px",
                color: theme.gray_text,
                textAlign: "center",
              }}
            >
              랭킹 불러오는 중...
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "0 24px",
                boxSizing: "border-box",
              }}
            >
              {rankings.length === 0 ? (
                <div style={{ textAlign: "center", color: theme.gray_text }}>
                  아직 랭킹 정보가 없습니다.
                </div>
              ) : (
                rankings.map((user, index) => {
                  const rank = index + 1;
                  // [추가] 로그인한 사용자의 ID와 랭커의 ID 비교
                  const isMe = loginInfo?.oid === user.userId;

                  return (
                    <div
                      key={user._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        // [수정] 본인이면 보라색 배경, 아니면 순위에 따른 배경색
                        backgroundColor: isMe
                          ? theme.purple
                          : rank <= 3
                            ? "#F3E5F5"
                            : "#fff",
                        borderRadius: "8px",
                        border: isMe
                          ? "none"
                          : `1px solid ${theme.gray_line || "#eee"}`,
                        width: "100%",
                        boxSizing: "border-box",
                        color: isMe ? "white" : "inherit", // 본인은 텍스트 흰색
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          overflow: "hidden",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: "30px",
                            textAlign: "center",
                            fontSize: rank <= 3 ? "20px" : "14px",
                            fontWeight: "bold",
                            flexShrink: 0,
                            color: isMe ? "white" : "inherit",
                          }}
                        >
                          {getRankBadge(rank)}
                        </div>
                        <div
                          style={{
                            ...theme.font14,
                            ...getRankStyle(rank, isMe),
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                          }}
                        >
                          {user.nickname} {isMe && "(나)"}
                        </div>
                      </div>
                      <div
                        style={{
                          ...theme.font14_bold,
                          color: isMe ? "white" : theme.black,
                          flexShrink: 0,
                          marginLeft: "8px",
                        }}
                      >
                        +{user.bestRecord}강
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </WhiteContainer>
    </>
  );
};

export default Ranking;
