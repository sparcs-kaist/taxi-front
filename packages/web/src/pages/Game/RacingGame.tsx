import { keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

import theme from "@/tools/theme";

import boostEffect from "@/static/assets/games/racing_boost.png";
import trackBg from "@/static/assets/games/racing_track.png";
import taxi1 from "@/static/assets/games/taxi_racing1.png";
import taxi2 from "@/static/assets/games/taxi_racing2.png";
import taxi3 from "@/static/assets/games/taxi_racing3.png";
import taxi4 from "@/static/assets/games/taxi_racing4.png";
import taxi5 from "@/static/assets/games/taxi_racing5.png";
import taxi6 from "@/static/assets/games/taxi_racing6.png";
import taxi7 from "@/static/assets/games/taxi_racing7.png";
import taxi8 from "@/static/assets/games/taxi_racing8.png";

const flipAnimation = keyframes`
  0% { transform: translateY(-50%) rotate(0deg); }
  100% { transform: translateY(-50%) rotate(180deg); }
`;

const TAXI_IMAGES = [taxi1, taxi2, taxi3, taxi4, taxi5, taxi6, taxi7, taxi8];

type RacingGameProps = {
  roomId: string;
  chats: any[];
  sendMessage: (type: any, content: any) => Promise<boolean>;
  roomInfo: Room;
  readAtList: Date[];
};

type Taxi = {
  id: number;
  position: number;
  speed: number;
  rank: number | null;
  state: "running" | "boost" | "stunned" | "accident";
  stateDuration: number;
};

const RACING_TAXI_COUNT = 8;
const FINISH_LINE = 100;

const RacingGame = (_: RacingGameProps) => {
  const [gameState, setGameState] = useState<"betting" | "racing" | "result">(
    "betting"
  );
  const [selectedTaxiId, setSelectedTaxiId] = useState<number | null>(null);
  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [winnerId, setWinnerId] = useState<number | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const initialTaxis = Array.from(
      { length: RACING_TAXI_COUNT },
      (_, i) =>
        ({
          id: i + 1,
          position: 0,
          speed: 0,
          rank: null,
          state: "running",
          stateDuration: 0,
        }) as Taxi
    );
    setTaxis(initialTaxis);
  }, []);

  const startRace = (myTaxiId: number) => {
    setSelectedTaxiId(myTaxiId);
    setGameState("racing");
    setWinnerId(null);
    setTaxis((prev) =>
      prev.map((taxi) => ({
        ...taxi,
        position: 0,
        rank: null,
        state: "running",
        stateDuration: 0,
      }))
    );
  };

  const updateRace = () => {
    setTaxis((prevTaxis) => {
      let isRaceFinished = false;
      const sortedTaxis = [...prevTaxis].sort(
        (a, b) => b.position - a.position
      );

      const newTaxis = prevTaxis.map((taxi) => {
        if (taxi.rank !== null) return taxi;
        if (taxi.state === "accident") return taxi; // Crashed taxis don't move

        let newSpeed = Math.max(
          0.01,
          Math.min(0.08, (taxi.speed || 0.05) + (Math.random() - 0.5) * 0.01)
        );
        let newState: Taxi["state"] = taxi.state;
        let newStateDuration = taxi.stateDuration;

        const currentRank = sortedTaxis.findIndex((t) => t.id === taxi.id) + 1;

        if (newStateDuration > 0) {
          newStateDuration -= 1;
          if (newState === "boost") {
            if (currentRank <= 2) newSpeed = 0.2;
            else if (currentRank <= 4) newSpeed = 0.3;
            else if (currentRank <= 6) newSpeed = 0.35;
            else newSpeed = 0.4;
          } else if (newState === "stunned") {
            newSpeed = 0.02;
          }
        } else {
          newState = "running";
          const rand = Math.random();
          let boostChance = 0;
          if (currentRank <= 2) boostChance = 0.002;
          else if (currentRank <= 4) boostChance = 0.003;
          else if (currentRank <= 6) boostChance = 0.004;
          else boostChance = 0.005;

          let accidentChance = 0;
          if (currentRank <= 2) accidentChance = 0.0004;
          else if (currentRank <= 4) accidentChance = 0.0002;
          else if (currentRank <= 6) accidentChance = 0.0001;
          else accidentChance = 0;

          if (rand < accidentChance) {
            newState = "accident";
            newSpeed = 0;
            newStateDuration = 0;
          } else if (rand < accidentChance + boostChance) {
            newState = "boost";
            newStateDuration = 30 + Math.random() * 30;
          } else if (rand < accidentChance + boostChance + 0.008) {
            newState = "stunned";
            newStateDuration = 20 + Math.random() * 40;
          }
        }

        const newPosition = taxi.position + newSpeed;

        if (newPosition >= FINISH_LINE) {
          return {
            ...taxi,
            position: FINISH_LINE,
            speed: newSpeed,
            rank: 1,
            state: newState,
            stateDuration: newStateDuration,
          };
        }
        return {
          ...taxi,
          position: newPosition,
          speed: newSpeed,
          state: newState,
          stateDuration: newStateDuration,
        };
      });

      const winner = newTaxis.find((t) => t.position >= FINISH_LINE);
      if (winner && !winnerId) {
        setWinnerId(winner.id);
        isRaceFinished = true;
      }

      if (isRaceFinished) {
        setTimeout(() => setGameState("result"), 1000);
      } else {
        requestRef.current = requestAnimationFrame(updateRace);
      }
      return newTaxis;
    });
  };

  useEffect(() => {
    if (gameState === "racing") {
      requestRef.current = requestAnimationFrame(updateRace);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState]);

  const handleRestart = () => {
    setGameState("betting");
    setSelectedTaxiId(null);
    setWinnerId(null);
    setTaxis((prev) =>
      prev.map((taxi) => ({
        ...taxi,
        position: 0,
        speed: 0,
        rank: null,
        state: "running",
        stateDuration: 0,
      }))
    );
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "16px",
        overflow: "hidden",
      }}
    >
      <div
        css={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflowY: "auto",
        }}
      >
        {gameState === "betting" && (
          <>
            <div
              css={{
                ...theme.font16_bold,
                textAlign: "center",
                padding: "10px 0",
              }}
            >
              우승할 택시를 선택하세요!
            </div>
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
                padding: "16px",
                "@media (min-width: 460px)": {
                  gridTemplateColumns: "repeat(4, 1fr)",
                },
              }}
            >
              {taxis.map((taxi) => (
                <button
                  key={taxi.id}
                  onClick={() => startRace(taxi.id)}
                  css={{
                    padding: "16px",
                    border: "none",
                    background: theme.purple_light,
                    borderRadius: "12px",
                    cursor: "pointer",
                    boxShadow: theme.shadow,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: theme.shadow_clicked,
                    },
                  }}
                >
                  <img
                    src={TAXI_IMAGES[taxi.id - 1]}
                    alt={`Taxi ${taxi.id}`}
                    css={{ width: "60px", height: "auto" }}
                  />
                  <div css={{ ...theme.font14_bold, color: theme.black }}>
                    {taxi.id}번
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {gameState === "racing" && (
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* 트랙 */}
            <div
              css={{
                display: "flex",
                alignItems: "stretch",
                gap: "8px",
              }}
            >
              {/* 레인 번호 */}
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  width: "24px",
                  flexShrink: 0,
                }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    css={{
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ...theme.font16_bold,
                      color: theme.black,
                      textShadow: "2px 2px 0px #ddd",
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* 트랙 */}
              <div
                css={{
                  position: "relative",
                  flex: 1,
                  backgroundImage: `url(${trackBg})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  padding: "12px 0",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "360px",
                  boxShadow: theme.shadow,
                }}
              >
                {taxis.map((taxi, index) => (
                  <div
                    key={taxi.id}
                    css={{
                      position: "relative",
                      height: "40px",
                      marginBottom: index < RACING_TAXI_COUNT - 1 ? "4px" : "0",
                    }}
                  >
                    {/* 택시 */}
                    <div
                      style={{
                        left: `calc(2% + ${taxi.position * 0.87}%)`,
                        transition: "left 0.1s linear",
                      }}
                      css={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        ...(taxi.id === selectedTaxiId
                          ? {
                              filter: `drop-shadow(0 0 2px ${theme.white})`,
                              zIndex: 20,
                            }
                          : {}),
                        ...(taxi.state === "accident"
                          ? {
                              animation: `${flipAnimation} 0.5s forwards`,
                              filter: "grayscale(100%)",
                              zIndex: 5,
                            }
                          : {}),
                      }}
                    >
                      {/* 선택된 택시 표시 */}
                      {taxi.id === selectedTaxiId &&
                        taxi.state !== "accident" && (
                          <div
                            css={{
                              position: "absolute",
                              top: "-18px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: theme.purple,
                              textShadow: "0px 0px 2px #ffffff",
                              zIndex: 25,
                            }}
                          >
                            ▼
                          </div>
                        )}
                      {taxi.state === "accident" && (
                        <div
                          css={{
                            position: "absolute",
                            top: "-20px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "20px",
                            zIndex: 30,
                          }}
                        ></div>
                      )}

                      {/* 부스트 효과*/}
                      {taxi.state === "boost" && (
                        <div
                          css={{
                            position: "absolute",
                            left: "-48px",
                            top: "55%",
                            transform: "translateY(-50%)",
                            zIndex: -1,
                          }}
                        >
                          <img
                            src={boostEffect}
                            alt="boost"
                            css={{ width: "50px", height: "auto" }}
                          />
                        </div>
                      )}

                      <img
                        src={TAXI_IMAGES[taxi.id - 1]}
                        alt="taxi"
                        css={{
                          width: "50px",
                          height: "auto",
                          position: "relative",
                          zIndex: 2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 순위 */}
            <div
              css={{
                background: theme.purple_light,
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                boxShadow: theme.shadow_purple_input_inset,
                padding: "12px",
              }}
            >
              <div
                css={{
                  ...theme.font12_bold,
                  color: theme.purple,
                }}
              >
                실시간 순위
              </div>
              <div
                css={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  "@media (max-width: 400px)": {
                    gridTemplateColumns: "repeat(3, 1fr)",
                  },
                  gap: "8px",
                  padding: "4px",
                  width: "100%",
                }}
              >
                {[...taxis]
                  .sort((a, b) => b.position - a.position)
                  .map((taxi, index) => {
                    let rankColor = theme.gray_text;
                    let rankScale = 1;
                    if (index === 0) {
                      rankColor = "#FFD700"; // Gold
                      rankScale = 1.2;
                    } else if (index === 1) {
                      rankColor = "#C0C0C0"; // Silver
                      rankScale = 1.1;
                    } else if (index === 2) {
                      rankColor = "#CD7F32"; // Bronze
                      rankScale = 1.05;
                    }

                    const isMyTaxi = taxi.id === selectedTaxiId;

                    return (
                      <div
                        key={taxi.id}
                        css={{
                          background: theme.white,
                          borderRadius: "12px",
                          padding: "6px 8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          border: isMyTaxi
                            ? `2px solid ${theme.purple}`
                            : "1px solid #f0f0f0",
                          boxShadow: isMyTaxi
                            ? `0 2px 8px ${theme.purple_light}`
                            : "0 2px 4px rgba(0,0,0,0.05)",
                          minWidth: "60px",
                          transition: "all 0.2s",
                          transform: isMyTaxi ? "scale(1.05)" : "none",
                        }}
                      >
                        <div
                          css={{
                            ...theme.font14_bold,
                            color: rankColor,
                            width: "16px",
                            textAlign: "center",
                            transform: `scale(${rankScale})`,
                            textShadow:
                              index < 3
                                ? "1px 1px 0px rgba(0,0,0,0.2)"
                                : "none",
                          }}
                        >
                          {index + 1}
                        </div>
                        <img
                          src={TAXI_IMAGES[taxi.id - 1]}
                          alt="t"
                          css={{ width: "25px", height: "auto" }}
                        />
                        <div
                          css={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            lineHeight: 1.2,
                          }}
                        >
                          <div
                            css={{
                              ...theme.font12_bold,
                              color: isMyTaxi ? theme.purple : theme.black,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {taxi.id}번
                          </div>
                          {isMyTaxi && (
                            <div
                              css={{
                                fontSize: "8px",
                                color: theme.purple,
                                fontWeight: "bold",
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {gameState === "result" && (
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "20px",
            }}
          >
            <div css={{ fontSize: "60px" }}>
              {winnerId === selectedTaxiId ? "🎉" : "😭"}
            </div>
            <div css={{ ...theme.font16_bold, color: theme.black }}>
              {winnerId === selectedTaxiId ? "축하합니다!" : "아쉽네요..."}
            </div>
            <div
              css={{
                background: theme.white,
                padding: "20px",
                borderRadius: "16px",
                boxShadow: theme.shadow,
                textAlign: "center",
                width: "100%",
                maxWidth: "280px",
                border: `1px solid ${theme.gray_line}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div css={{ ...theme.font16, marginBottom: "8px" }}>1등 택시</div>
              {winnerId && (
                <img
                  src={TAXI_IMAGES[winnerId - 1]}
                  alt="winner"
                  css={{ width: "80px", margin: "12px 0" }}
                />
              )}
              <div
                css={{
                  ...theme.font12_bold,
                  color: theme.purple,
                  fontSize: "24px",
                }}
              >
                {winnerId}번
              </div>
            </div>

            <button
              onClick={handleRestart}
              css={{
                marginTop: "10px",
                padding: "14px 0",
                width: "100%",
                maxWidth: "280px",
                background: theme.purple,
                color: theme.white,
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                ...theme.font16_bold,
                boxShadow: theme.shadow_purple_button_inset,
              }}
            >
              다시 하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RacingGame;
