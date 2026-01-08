import { useCallback, useEffect, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import LinkLogin from "@/components/Link/LinkLogin";
import {
  BusyTimeGraph,
  DynamicStatTile,
  GraphStatTile,
  GraphTileData,
  TileVariant,
  TimeSlotData,
} from "@/components/Statistics";
import Title from "@/components/Title";

import theme from "@/tools/theme";

const fadeInUpKeyframes = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

type Period = "7d" | "30d" | "1y" | "total";
type TabType = "all" | "personal" | "place";

const Statistics = () => {
  const axios = useAxios();
  const loginInfo = useValueRecoilState("loginInfo");
  const taxiLocations = useValueRecoilState("taxiLocations");

  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [period, setPeriod] = useState<Period>("30d");

  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [mySavings, setMySavings] = useState<number>(0);
  const [periodSavings, setPeriodSavings] = useState<number>(0);

  const [accumulatedRides, setAccumulatedRides] = useState<GraphTileData[]>([]);
  const [accumulatedUsers, setAccumulatedUsers] = useState<GraphTileData[]>([]);
  const [myDoneRoomCount, setMyDoneRoomCount] = useState<number>(0);

  const [graphPlace, setGraphPlace] = useState("카이스트 본원");
  const [graphDay, setGraphDay] = useState(() => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kstGap = 9 * 60 * 60 * 1000;
    const today = new Date(utc + kstGap);
    return DAYS[today.getDay()];
  });
  const [graphData, setGraphData] = useState<TimeSlotData[]>([]);

  const getDifference = (data: GraphTileData[]) => {
    if (data.length < 2) return 0;
    return data[data.length - 1].value - data[data.length - 2].value;
  };
  const ridesDiff = getDifference(accumulatedRides);
  const usersDiff = getDifference(accumulatedUsers);

  const shouldAnimate = !(activeTab === "personal" && !loginInfo?.oid);

  useEffect(() => {
    axios({
      url: "/statistics/savings/total",
      method: "get",
      skipAuthRedirect: true,
      onSuccess: (data) => setTotalSavings(data.totalSavings),
      onError: () => console.error("Total savings load failed"),
    });

    axios({
      url: "/statistics/room-creation/monthly",
      method: "get",
      skipAuthRedirect: true,
      onSuccess: (data) => {
        const formattedData = data.months.map((item: any) => ({
          label: new Date(item.month).getMonth() + 1 + "월",
          value: item.cumulativeRooms,
        }));
        setAccumulatedRides(formattedData);
      },
      onError: () => console.error("Room creation stats load failed"),
    });

    axios({
      url: "/statistics/users/monthly",
      method: "get",
      skipAuthRedirect: true,
      onSuccess: (data) => {
        const formattedData = data.months.map((item: any) => ({
          label: new Date(item.month).getMonth() + 1 + "월",
          value: item.cumulativeUsers,
        }));
        setAccumulatedUsers(formattedData);
      },
      onError: () => console.error("User stats load failed"),
    });

    if (loginInfo?.oid) {
      axios({
        url: "/statistics/users/savings",
        method: "get",
        params: { userId: loginInfo.oid },
        onSuccess: (data) => setMySavings(data.totalSavings),
        onError: () => console.error("My savings load failed"),
      });

      axios({
        url: "/statistics/users/done-room-count",
        method: "get",
        params: { userId: loginInfo.oid },
        onSuccess: (data) => setMyDoneRoomCount(data.doneRoomCount),
        onError: () => console.error("My room count load failed"),
      });
    }
  }, [axios, loginInfo?.oid]);

  const fetchPeriodSavings = useCallback(async () => {
    if (period === "total") {
      setPeriodSavings(totalSavings);
      return;
    }

    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1);
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date(endDate);

    if (period === "7d") startDate.setDate(endDate.getDate() - 7);
    if (period === "30d") startDate.setDate(endDate.getDate() - 30);
    if (period === "1y") startDate.setFullYear(endDate.getFullYear() - 1);

    startDate.setHours(0, 0, 0, 0);

    await axios({
      url: "/statistics/savings/period",
      method: "get",
      skipAuthRedirect: true,
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
      onSuccess: (data) => setPeriodSavings(data.totalSavings),
      onError: () => console.error("Period stats load failed"),
    });
  }, [axios, period, totalSavings]);

  useEffect(() => {
    fetchPeriodSavings();
  }, [fetchPeriodSavings]);

  const fetchGraphData = useCallback(async () => {
    if (!taxiLocations || taxiLocations.length === 0) return;

    const location = taxiLocations.find((loc) => loc.koName === graphPlace);
    if (!location) return;

    const dayIndex = DAYS.indexOf(graphDay);
    if (dayIndex === -1) return;

    await axios({
      url: "/statistics/room-creation/hourly",
      method: "get",
      skipAuthRedirect: true,
      params: {
        locationId: location._id,
        dayOfWeek: dayIndex,
      },
      onSuccess: (data) => {
        const formattedData = data.intervals.map((interval: any) => ({
          time: `${interval.hour}시`,
          value: interval.totalRooms,
        }));
        setGraphData(formattedData);
      },
      onError: () => {
        setGraphData([]);
      },
    });
  }, [axios, taxiLocations, graphPlace, graphDay]);

  useEffect(() => {
    if (activeTab === "place") {
      fetchGraphData();
    }
  }, [activeTab, fetchGraphData]);

  const filteredGraphData = () => {
    return graphData.filter((item) => {
      const hour = parseInt(item.time.replace("시", ""), 10);
      return hour >= 0 && hour <= 23;
    });
  };

  const getPeriodLabelPrefix = (p: Period) => {
    switch (p) {
      case "7d":
        return "지난 7일간\n";
      case "30d":
        return "지난 30일간\n";
      case "1y":
        return "지난 1년간\n";
      default:
        return "Taxi와 함께하며\n";
    }
  };

  const getDynamicContents = (
    amount: number,
    userPrefix: string
  ): Array<{
    label: string;
    value: number;
    prefix?: string;
    unit?: string;
    variant: TileVariant;
  }> => {
    const timeLabel =
      activeTab === "all" ? getPeriodLabelPrefix(period) : "Taxi와 함께하며\n";
    return [
      {
        label: `${timeLabel}${userPrefix} 아낀 금액 💸`,
        value: parseFloat(amount.toFixed(1)),
        prefix: "₩",
        variant: "purple",
      },
      {
        label: `${timeLabel}${userPrefix} 아낀 치킨 🍗`,
        value: parseFloat((amount / 20000).toFixed(1)),
        unit: "마리",
        variant: "orange",
      },
      {
        label: `${timeLabel}${userPrefix} 아낀 튀소 🍪`,
        value: parseFloat((amount / 3500).toFixed(1)),
        unit: "개",
        variant: "yellow",
      },
    ];
  };

  const getMyTotalContents = (
    amount: number
  ): Array<{
    label: string;
    value: number;
    prefix?: string;
    unit?: string;
    variant: TileVariant;
  }> => {
    const timeLabel = "Taxi와 함께하며\n";
    return [
      {
        label: `${timeLabel}내가 아낀 금액 💸`,
        value: parseFloat(amount.toFixed(1)),
        prefix: "₩",
        variant: "purple",
      },
      {
        label: `${timeLabel}내가 아낀 치킨 🍗`,
        value: parseFloat((amount / 20000).toFixed(1)),
        unit: "마리",
        variant: "orange",
      },
      {
        label: `${timeLabel}내가 아낀 튀소 🍪`,
        value: parseFloat((amount / 3500).toFixed(1)),
        unit: "개",
        variant: "yellow",
      },
    ];
  };

  const periodButtonStyle = (p: Period) => ({
    flex: 1,
    padding: "8px 0",
    borderRadius: "8px",
    border: "none",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: period === p ? theme.purple : "transparent",
    color: period === p ? theme.white : theme.gray_text,
    boxShadow: period === p ? "0 2px 4px rgba(107, 70, 193, 0.3)" : "none",
  });

  const tabButtonStyle = (tab: TabType) => ({
    flex: 1,
    padding: "12px 0",
    borderRadius: "14px",
    border: "none",
    fontSize: "14px",
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: activeTab === tab ? theme.white : "transparent",
    color: activeTab === tab ? theme.purple : theme.gray_text,
    boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
  });

  const handleGraphFilterChange = (place: string, day: string) => {
    setGraphPlace(place);
    setGraphDay(day);
  };

  const PeriodSelector = () => (
    <div
      css={{
        display: "flex",
        background: theme.gray_background,
        padding: "4px",
        borderRadius: "10px",
        marginBottom: "16px",
        gap: "4px",
      }}
    >
      <button onClick={() => setPeriod("7d")} css={periodButtonStyle("7d")}>
        7일
      </button>
      <button onClick={() => setPeriod("30d")} css={periodButtonStyle("30d")}>
        30일
      </button>
      <button onClick={() => setPeriod("1y")} css={periodButtonStyle("1y")}>
        1년
      </button>
      <button
        onClick={() => setPeriod("total")}
        css={periodButtonStyle("total")}
      >
        전체
      </button>
    </div>
  );

  return (
    <AdaptiveDiv type="center">
      <style>{fadeInUpKeyframes}</style>

      <Title icon="stats" isHeader>
        Taxi Statistics
      </Title>

      <div css={{ padding: "0 20px 80px" }}>
        <div
          css={{
            display: "flex",
            background: "#F0F0F0",
            padding: "4px",
            borderRadius: "16px",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => setActiveTab("all")}
            css={tabButtonStyle("all")}
          >
            전체 통계
          </button>
          <button
            onClick={() => setActiveTab("personal")}
            css={tabButtonStyle("personal")}
          >
            내 통계
          </button>
          <button
            onClick={() => setActiveTab("place")}
            css={tabButtonStyle("place")}
          >
            장소별 통계
          </button>
        </div>

        <div
          key={activeTab}
          css={{
            animation: shouldAnimate
              ? "fadeInUp 0.5s ease-out forwards"
              : "none",
          }}
        >
          {activeTab === "place" && (
            <div
              css={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div css={{ textAlign: "left", marginLeft: "4px" }}>
                <div
                  css={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: theme.black,
                    marginBottom: "4px",
                  }}
                >
                  📍 택시팟 언제 만들지?
                </div>
                <div css={{ fontSize: "14px", color: theme.gray_text }}>
                  원하는 장소와 요일을 선택해보세요.
                </div>
              </div>
              <BusyTimeGraph
                data={filteredGraphData()}
                places={taxiLocations?.map((loc) => loc.koName) || []}
                days={DAYS}
                selectedPlace={graphPlace}
                selectedDay={graphDay}
                onFilterChange={handleGraphFilterChange}
              />
            </div>
          )}

          {activeTab === "all" && (
            <div
              css={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              <div>
                <div
                  css={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                    marginLeft: "4px",
                  }}
                >
                  <div css={{ fontSize: "18px", fontWeight: 800 }}>
                    📅 기간별 분석
                  </div>
                </div>
                <PeriodSelector />
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <DynamicStatTile
                    data={getDynamicContents(periodSavings, "모두가")}
                  />
                </div>
              </div>
              <div
                css={{
                  height: "1px",
                  background: theme.gray_line,
                  margin: "0 4px",
                }}
              />
              <div>
                <div
                  css={{
                    fontSize: "18px",
                    fontWeight: 800,
                    marginBottom: "16px",
                    marginLeft: "4px",
                  }}
                >
                  🚀 Taxi는 지금까지
                </div>
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <GraphStatTile
                    title="누적 택시 동승 수"
                    value={
                      accumulatedRides.length > 0
                        ? accumulatedRides[accumulatedRides.length - 1].value
                        : 0
                    }
                    unit="번"
                    data={accumulatedRides}
                    difference={ridesDiff}
                    lineColor="#6B46C1"
                  />
                  <GraphStatTile
                    title="누적 사용자 수"
                    value={
                      accumulatedUsers.length > 0
                        ? accumulatedUsers[accumulatedUsers.length - 1].value
                        : 0
                    }
                    unit="명"
                    data={accumulatedUsers}
                    difference={usersDiff}
                    lineColor="#DD6B20"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "personal" && (
            <div
              css={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {loginInfo?.oid ? (
                <>
                  <div>
                    <div
                      css={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <DynamicStatTile data={getMyTotalContents(mySavings)} />
                      <DynamicStatTile
                        data={[
                          {
                            label: `지금까지 참여한\n택시 동승 팟 수`,
                            value: myDoneRoomCount,
                            unit: "번",
                            variant: "white",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <div
                    css={{
                      padding: "20px",
                      textAlign: "center",
                      color: theme.gray_text,
                      fontSize: "13px",
                      background: "#F9F9F9",
                      borderRadius: "12px",
                    }}
                  >
                    내 통계는 전체 기간만을 제공하고 있습니다.
                  </div>
                </>
              ) : (
                <div
                  css={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    css={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.85) 100%)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.05)",
                      borderRadius: "16px",
                    }}
                  >
                    <div
                      css={{
                        marginBottom: "16px",
                        ...theme.font14_bold,
                        color: theme.black,
                        textAlign: "center",
                        lineHeight: "1.5",
                      }}
                    >
                      로그인하고
                      <br />내 통계를 확인해보세요!
                    </div>
                    <LinkLogin redirect="/statistics">
                      <Button
                        type="purple"
                        css={{
                          padding: "10px 24px",
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          boxShadow: "0 4px 12px rgba(107, 70, 193, 0.3)",
                        }}
                      >
                        로그인 하러가기
                      </Button>
                    </LinkLogin>
                  </div>

                  <div
                    css={{
                      pointerEvents: "none",
                      opacity: 0.3,
                      filter: "grayscale(0.5)",
                      transform: "scale(0.98)",
                    }}
                  >
                    <div
                      css={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <DynamicStatTile data={getMyTotalContents(0)} />
                      <DynamicStatTile
                        data={[
                          {
                            label: `지금까지 참여한\n택시 동승 팟 수`,
                            value: 0,
                            unit: "번",
                            variant: "white",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer type="only-logo" />
    </AdaptiveDiv>
  );
};

export default Statistics;
