import { keyframes } from "@emotion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

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
const FINISH_LINE = 1000;

const getRaceStateFromChats = (
  chats: any[],
  myNickname?: string,
  myOid?: string
) => {
  const racingChats = chats.filter(
    (c) => c.type === "racing" || c.type === "raceLog"
  );
  let state: "betting" | "racing" | "result" | "canceled" = "betting";
  let entries: Record<number, string> = {};
  let mySelection: number | null = null;
  let raceLogRaw: string | null = null;
  let resultLines: string[] = [];
  let hostName: string | null = null;

  for (const chat of racingChats) {
    if (chat.type === "raceLog") {
      raceLogRaw = chat.content;
    } else {
      const { content } = chat;
      if (
        content.includes("레이스 방을 만들었습니다.") ||
        content.includes("레이스 방에 참가했습니다.")
      ) {
        if (content.includes("레이스 방을 만들었습니다.")) {
          const createMatch = content.match(
            /^(.*?)님이 (?:경마|레이스) 방을 만들었습니다\./
          );
          if (createMatch) {
            hostName = createMatch[1];
          }
          // 방장이든 일반 참가자든 방 생성 시 기존 캐싱된 선택 및 참가자를 완전히 초기화
          entries = {};
          mySelection = null;
          raceLogRaw = null;
          resultLines = [];
        }
        state = "betting";

        // 포맷 2: "경마 방에 참가했습니다" 또는 "레이스 방에 참가했습니다"
        const joinMatch = content.match(
          /^(.*?)님이 (?:경마|레이스) 방에 참가했습니다\.\s*.*?\(차량:\s*(\d+),\s*배팅:/
        );
        if (joinMatch) {
          const nickname = joinMatch[1];
          const car = parseInt(joinMatch[2], 10);
          entries[car] = nickname;
          if (nickname === myNickname) {
            mySelection = car;
          }
        }
      } else if (
        content.includes("레이스를 시작합니다.") ||
        content.includes("참가자가 모여 레이스를 시작합니다.")
      ) {
        state = "racing";
      } else if (
        content.includes(
          "1분 동안 참가자가 더 오지 않아 레이스가 취소되었습니다."
        ) ||
        content.includes("레이스를 진행할 참가 정보가 없어 종료되었습니다.") ||
        content.includes("레이스 진행 중 오류가 발생했습니다.")
      ) {
        state = "canceled";
      } else if (content.includes("경주 결과")) {
        state = "result";
        resultLines = content.split("\n").slice(1);
      } else if (chat.type === "racing" && /^\d+:\s*\d+$/.test(content)) {
        // "차량:금액" 포맷의 원시 배팅 메시지 캡처를 위한 폴백
        const [carStr] = content.split(":");
        const car = parseInt(carStr, 10);

        let assumedAuthor =
          chat.authorName && chat.authorName !== "택시 봇"
            ? chat.authorName
            : null;

        // 원시 봇 메시지에 작성자가 누락된 경우, 방장의 최초 배팅이라고만 가정.
        // 만약 방장이 이미 택시를 배정받았다면 남의 배팅이므로 무시함! (남의 배팅은 "참가했습니다" 봇 메시지로 정상 처리됨)
        if (!assumedAuthor && hostName) {
          const hostAlreadyHasCar = Object.values(entries).includes(hostName);
          if (!hostAlreadyHasCar) {
            assumedAuthor = hostName;
          }
        }

        if (assumedAuthor) {
          // 이전에 다른 사람이 차지한 빈자리 등 덮어쓰기 방지
          entries[car] = assumedAuthor;
          if (assumedAuthor === myNickname) {
            mySelection = car;
          }
        } else if (chat.isMine) {
          // Optimistic UI로 들어온 내 배팅인 경우 (위 조건에 안 걸렸을 때만)
          const iAlreadyHaveCar = myNickname
            ? Object.values(entries).includes(myNickname)
            : false;
          if (!iAlreadyHaveCar && myNickname) {
            entries[car] = myNickname;
            mySelection = car;
          }
        }
      }
    }
  }

  return { state, entries, mySelection, raceLogRaw, resultLines, hostName };
};

const seenRaceAnimations = new Set<string>();

const RacingGame = ({
  roomId,
  chats,
  sendMessage,
  roomInfo,
}: RacingGameProps) => {
  const loginInfo = useValueRecoilState("loginInfo");
  const setAlert = useSetRecoilState(alertAtom);
  const myNickname = loginInfo?.nickname;
  const myOid = loginInfo?.oid;

  const [ignoreChatsBeforeIndex, setIgnoreChatsBeforeIndex] =
    useState<number>(0);

  const activeChats = useMemo(
    () => chats.slice(ignoreChatsBeforeIndex),
    [chats, ignoreChatsBeforeIndex]
  );

  const {
    state: backendState,
    entries,
    mySelection,
    raceLogRaw,
    resultLines,
    hostName,
  } = useMemo(
    () => getRaceStateFromChats(activeChats, myNickname, myOid),
    [activeChats, myNickname, myOid]
  );

  const raceLogData = useMemo((): Record<number, number[]> | null => {
    try {
      return raceLogRaw ? JSON.parse(raceLogRaw) : null;
    } catch {
      return null;
    }
  }, [raceLogRaw]);

  const [gameState, setGameState] = useState<
    "betting" | "racing" | "result" | "canceled"
  >(() => {
    if (
      backendState === "result" &&
      raceLogRaw &&
      !seenRaceAnimations.has(raceLogRaw)
    ) {
      return "racing";
    }
    return backendState;
  });

  const [selectedTaxiId, setSelectedTaxiId] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<string>("100");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [taxis, setTaxis] = useState<Taxi[]>(() =>
    Array.from(
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
    )
  );

  const [winnerId, setWinnerId] = useState<number | null>(null);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);

  const lastProcessedBackendState = useRef(backendState);

  useEffect(() => {
    if (backendState !== lastProcessedBackendState.current) {
      lastProcessedBackendState.current = backendState;
      if (backendState === "canceled") {
        setGameState("canceled");
      } else if (backendState === "result") {
        if (
          gameState === "betting" &&
          raceLogData &&
          raceLogRaw &&
          !seenRaceAnimations.has(raceLogRaw)
        ) {
          setGameState("racing");
          startTimeRef.current = null;
          setTaxis((prev) =>
            prev.map((taxi) => ({
              ...taxi,
              position: 0,
              rank: null,
              state: "running",
              stateDuration: 0,
            }))
          );
        } else if (gameState !== "racing" && gameState !== "result") {
          setGameState("result");
          if (raceLogRaw) seenRaceAnimations.add(raceLogRaw);
        }
      } else if (backendState === "racing" && gameState === "betting") {
        setGameState("racing");
        startTimeRef.current = null;
        setTaxis((prev) =>
          prev.map((taxi) => ({
            ...taxi,
            position: 0,
            rank: null,
            state: "running",
            stateDuration: 0,
          }))
        );
      } else if (backendState === "betting" && gameState !== "betting") {
        setGameState("betting");
      }
    }
  }, [backendState, gameState]);

  useEffect(() => {
    if (mySelection) {
      setSelectedTaxiId(mySelection);
    }
  }, [mySelection]);

  useEffect(() => {
    if (gameState === "result" && resultLines.length > 0) {
      const firstPlaceLine = resultLines.find((line) =>
        line.startsWith("1등:")
      );
      if (firstPlaceLine) {
        const match = firstPlaceLine.match(/(\d+)번차/);
        if (match) {
          setWinnerId(parseInt(match[1], 10));
        }
      }
    }
  }, [gameState, resultLines]);

  const placeBet = async () => {
    if (!selectedTaxiId) return;
    const amount = parseInt(betAmount, 10);
    if (isNaN(amount) || amount <= 0 || amount > 10000) {
      setAlert("배팅 금액은 1~10000 사이의 숫자여야 합니다.");
      return;
    }

    setIsSubmitting(true);
    await sendMessage("racing", {
      text: `${selectedTaxiId}:${amount}`,
    });

    setIsSubmitting(false);
  };

  const startGame = async () => {
    setIsSubmitting(true);
    await sendMessage("racingStart", { text: "start" });
    setIsSubmitting(false);
  };

  const updateRace = useCallback(
    (timestamp: number) => {
      if (!raceLogData) {
        if (gameState === "racing")
          setTimeout(() => setGameState("result"), 1000);
        return;
      }

      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsedMs = timestamp - startTimeRef.current;

      const TOTAL_DURATION_MS = 25000;

      const maxLogsLength = Math.max(
        ...Object.values(raceLogData).map((logs) => logs.length)
      );

      if (maxLogsLength === 0) {
        setGameState("result");
        return;
      }

      const floatTick = (elapsedMs / TOTAL_DURATION_MS) * maxLogsLength;

      setTaxis((prevTaxis) => {
        let allFinishedArray = true;

        const newTaxis = prevTaxis.map((taxi) => {
          const logs = raceLogData[taxi.id] || [];

          if (floatTick < logs.length) {
            allFinishedArray = false;
          }
          let currentPos = 0;
          let currentState: Taxi["state"] = "running";
          let lastSpeed = 0;

          const completeTicks = Math.min(Math.floor(floatTick), logs.length);
          const remainderTick = floatTick - completeTicks;

          for (let i = 0; i < completeTicks; i++) {
            const v = logs[i];
            if (v === -1) {
              currentState = "accident";
              lastSpeed = 0;
            } else if (currentState !== "accident") {
              const stepUnits = Math.round(v * 1000);
              currentPos += stepUnits;
              lastSpeed = v;
              if (stepUnits > 50) currentState = "boost";
              else currentState = "running";
            }
          }

          if (completeTicks < logs.length && currentState !== "accident") {
            const nextV = logs[completeTicks];
            if (nextV === -1) {
              currentState = "accident";
              lastSpeed = 0;
            } else {
              const stepUnits = Math.round(nextV * 1000);
              currentPos += stepUnits * remainderTick;
              lastSpeed = nextV;
              if (stepUnits > 50) currentState = "boost";
              else currentState = "running";
            }
          }

          currentPos = Math.min(FINISH_LINE, currentPos);

          if (floatTick >= logs.length) {
            if (logs.includes(-1)) currentState = "accident";
            else currentState = "running";
          }

          return {
            ...taxi,
            position: currentPos,
            speed: lastSpeed,
            state: currentState,
          };
        });

        if (!allFinishedArray) {
          requestRef.current = requestAnimationFrame(updateRace);
        } else {
          setTimeout(() => {
            setGameState("result");
            if (raceLogRaw) seenRaceAnimations.add(raceLogRaw);
          }, 1000);
        }
        return newTaxis;
      });
    },
    [gameState, raceLogData]
  );

  useEffect(() => {
    if (gameState === "racing" && raceLogData) {
      startTimeRef.current = null;
      requestRef.current = requestAnimationFrame(updateRace);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, raceLogData, updateRace]);

  const handleRestart = () => {
    setIgnoreChatsBeforeIndex(chats.length);
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
        {gameState === "canceled" && (
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "16px",
            }}
          >
            <div css={{ fontSize: "60px" }}>😿</div>
            <div
              css={{
                ...theme.font16_bold,
                color: theme.black,
                textAlign: "center",
              }}
            >
              참가자가 부족하여
              <br />
              레이스가 취소되었습니다.
            </div>
            <button
              onClick={handleRestart}
              css={{
                marginTop: "24px",
                padding: "12px 24px",
                borderRadius: "12px",
                background: theme.purple,
                color: theme.white,
                ...theme.font14_bold,
                border: "none",
                cursor: "pointer",
                boxShadow: theme.shadow,
                transition: "background 0.2s",
                "&:hover": { background: theme.purple_dark },
              }}
            >
              다시 시작하기
            </button>
          </div>
        )}

        {gameState === "betting" && (
          <div
            css={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div
              css={{
                ...theme.font16_bold,
                textAlign: "center",
                padding: "8px 0",
              }}
            >
              우승할 택시를 선택하세요!
              <div
                css={{
                  ...theme.font12,
                  color: theme.purple,
                  marginTop: "6px",
                  fontWeight: "normal",
                  background: theme.purple_light,
                  padding: "8px",
                  borderRadius: "8px",
                  boxShadow: theme.shadow,
                }}
              >
                참가자가 2명 이상 모이면 방장이 시작할 수 있습니다.
              </div>
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
                flex: 1,
                overflowY: "auto",
                paddingBottom: "320px",
              }}
            >
              {taxis.map((taxi) => {
                const isSelected = selectedTaxiId === taxi.id;
                const occupier = entries[taxi.id];
                const isOccupied = !!(occupier && occupier !== myNickname);
                const amIOccupier = occupier === myNickname;

                return (
                  <button
                    key={taxi.id}
                    onClick={() => {
                      if (!isOccupied && !mySelection)
                        setSelectedTaxiId(taxi.id);
                    }}
                    disabled={isOccupied || !!mySelection}
                    css={{
                      padding: "8px 12px 12px 12px",
                      border: isSelected ? `2px solid ${theme.purple}` : "none",
                      background: isOccupied
                        ? theme.gray_background
                        : theme.purple_light,
                      borderRadius: "12px",
                      cursor: isOccupied ? "not-allowed" : "pointer",
                      boxShadow: isSelected
                        ? theme.shadow_clicked
                        : theme.shadow,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      transition: "all 0.2s",
                      position: "relative",
                      opacity: isOccupied ? 0.6 : 1,
                      "&:hover": {
                        transform:
                          isOccupied || !!mySelection ? "none" : "scale(1.02)",
                        boxShadow:
                          isOccupied || !!mySelection
                            ? theme.shadow
                            : theme.shadow_clicked,
                      },
                    }}
                  >
                    {isOccupied && (
                      <div
                        css={{
                          position: "absolute",
                          top: "4px",
                          ...theme.font10,
                          color: theme.red_button,
                          fontWeight: "bold",
                        }}
                      >
                        {occupier} 선택됨
                      </div>
                    )}
                    {amIOccupier && (
                      <div
                        css={{
                          position: "absolute",
                          top: "4px",
                          ...theme.font10,
                          color: theme.purple,
                          fontWeight: "bold",
                        }}
                      >
                        내 선택
                      </div>
                    )}
                    <img
                      src={TAXI_IMAGES[taxi.id - 1]}
                      alt={`Taxi ${taxi.id}`}
                      css={{
                        width: "60px",
                        height: "auto",
                        margin: "12px 0 4px 0",
                      }}
                    />
                    <div
                      css={{
                        ...theme.font14_bold,
                        color: theme.black,
                        marginTop: "auto",
                      }}
                    >
                      {taxi.id}번
                    </div>
                  </button>
                );
              })}
            </div>

            {myNickname !== hostName ? (
              <div
                css={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: theme.white,
                  borderTop: `1px solid ${theme.gray_line}`,
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  boxShadow: "0 -4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  css={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <div css={{ ...theme.font14_bold, whiteSpace: "nowrap" }}>
                    배팅 금액
                  </div>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="100 ~ 10000"
                    min="1"
                    max="10000"
                    css={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: `1px solid ${theme.gray_line}`,
                      ...theme.font14,
                      outline: "none",
                      "&:focus": {
                        borderColor: theme.purple,
                      },
                    }}
                  />
                </div>
                <button
                  onClick={placeBet}
                  disabled={!selectedTaxiId || isSubmitting || !!mySelection}
                  css={{
                    padding: "14px 0",
                    width: "100%",
                    background:
                      !selectedTaxiId || !!mySelection
                        ? theme.gray_background
                        : theme.purple,
                    color:
                      !selectedTaxiId || !!mySelection
                        ? theme.gray_text
                        : theme.white,
                    border: "none",
                    borderRadius: "12px",
                    cursor:
                      !selectedTaxiId || !!mySelection
                        ? "not-allowed"
                        : "pointer",
                    ...theme.font16_bold,
                    boxShadow:
                      !selectedTaxiId || !!mySelection
                        ? "none"
                        : theme.shadow_purple_button_inset,
                  }}
                >
                  {mySelection
                    ? "방장의 시작 대기 중..."
                    : isSubmitting
                      ? "전송 중..."
                      : "결정"}
                </button>
              </div>
            ) : myNickname === hostName ? (
              <div
                css={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: theme.white,
                  borderTop: `1px solid ${theme.gray_line}`,
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 -4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <button
                  onClick={startGame}
                  disabled={Object.keys(entries).length < 2 || isSubmitting}
                  css={{
                    padding: "14px 0",
                    width: "100%",
                    background:
                      Object.keys(entries).length < 2
                        ? theme.gray_background
                        : theme.purple,
                    color:
                      Object.keys(entries).length < 2
                        ? theme.gray_text
                        : theme.white,
                    border: "none",
                    borderRadius: "12px",
                    cursor:
                      Object.keys(entries).length < 2
                        ? "not-allowed"
                        : "pointer",
                    ...theme.font16_bold,
                    boxShadow:
                      Object.keys(entries).length < 2
                        ? "none"
                        : theme.shadow_purple_button_inset,
                  }}
                >
                  {isSubmitting
                    ? "전송 중..."
                    : Object.keys(entries).length < 2
                      ? "참가자 대기 중..."
                      : "레이스 시작하기"}
                </button>
              </div>
            ) : null}
          </div>
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
                        left: `calc(2% + ${(taxi.position / FINISH_LINE) * 87}%)`,
                        transition: "none",
                      }}
                      css={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        ...(taxi.id === mySelection
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
                      {taxi.id === mySelection && taxi.state !== "accident" && (
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

                    const isMyTaxi = taxi.id === mySelection;

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

            <div
              css={{
                color: theme.gray_text,
                ...theme.font14,
                textAlign: "center",
              }}
            >
              정산 결과는 채팅방에서 확인하세요.
            </div>

            <button
              onClick={handleRestart}
              css={{
                marginTop: "16px",
                padding: "12px 24px",
                borderRadius: "12px",
                background: theme.purple,
                color: theme.white,
                ...theme.font14_bold,
                border: "none",
                cursor: "pointer",
                boxShadow: theme.shadow,
                transition: "background 0.2s",
                "&:hover": { background: theme.purple_dark },
              }}
            >
              다시 시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RacingGame;
