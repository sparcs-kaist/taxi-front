import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
// ✨ API 및 상태 관리 훅
import { useAxios } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import {
  BusyTimeGraph,
  DynamicStatTile,
  GraphStatTile,
  GraphTileData,
  TileVariant,
  TimeSlotData,
} from "@/components/Statistics";
import Title from "@/components/Title";
import WhiteContainerSuggestLogin from "@/components/WhiteContainer/WhiteContainerSuggestLogin";

import theme from "@/tools/theme";

const fadeInUpKeyframes = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// 요일 목록 상수
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

type Period = "7d" | "30d" | "1y" | "total";
type TabType = "all" | "personal" | "place";

const Statistics = () => {
  const { t } = useTranslation("mypage");
  const axios = useAxios();
  const loginInfo = useValueRecoilState("loginInfo");
  const taxiLocations = useValueRecoilState("taxiLocations");

  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [period, setPeriod] = useState<Period>("30d");

  // ✨ 실제 데이터 상태 (금액)
  const [totalSavings, setTotalSavings] = useState<number>(0); // 전체 누적
  const [mySavings, setMySavings] = useState<number>(0); // 내 누적
  const [periodSavings, setPeriodSavings] = useState<number>(0); // 기간별 전체

  // ✨ 실제 데이터 상태 (그래프용)
  const [accumulatedRides, setAccumulatedRides] = useState<GraphTileData[]>([]); // 누적 방 생성
  const [accumulatedUsers, setAccumulatedUsers] = useState<GraphTileData[]>([]); // 누적 사용자
  const [myDoneRoomCount, setMyDoneRoomCount] = useState<number>(0); // 내 참여 횟수

  // ✨ 그래프용 상태 (장소별)
  const [graphPlace, setGraphPlace] = useState("택시승강장");
  const [graphDay, setGraphDay] = useState(() => {
    // 오늘 요일 계산 (KST)
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kstGap = 9 * 60 * 60 * 1000;
    const today = new Date(utc + kstGap);
    return DAYS[today.getDay()];
  });
  const [graphData, setGraphData] = useState<TimeSlotData[]>([]);

  // ✨ 증가량 계산
  const getDifference = (data: GraphTileData[]) => {
    if (data.length < 2) return 0;
    return data[data.length - 1].value - data[data.length - 2].value;
  };
  const ridesDiff = getDifference(accumulatedRides);
  const usersDiff = getDifference(accumulatedUsers);

  // 1️⃣ 초기 로딩: 전체 데이터 가져오기 (누적 금액, 그래프 데이터, 내 참여 횟수)
  useEffect(() => {
    // API 1: 전체 누적 아낀 금액
    axios({
      url: "/statistics/savings/total",
      method: "get",
      onSuccess: (data) => setTotalSavings(data.totalSavings),
      onError: () => console.error("전체 누적 금액 로딩 실패"),
    });

    // API 2: 누적 방 생성 통계 (그래프)
    axios({
      url: "/statistics/room-creation/monthly",
      method: "get",
      onSuccess: (data) => {
        // 데이터 가공: { month: "YYYY-MM...", cumulativeRooms: 12 } -> GraphTileData
        const formattedData = data.months.map((item: any) => ({
          label: new Date(item.month).getMonth() + 1 + "월", // 월만 추출
          value: item.cumulativeRooms,
        }));
        setAccumulatedRides(formattedData);
      },
      onError: () => console.error("방 생성 통계 로딩 실패"),
    });

    // API 3: 누적 사용자 가입 통계 (그래프)
    axios({
      url: "/statistics/users/monthly",
      method: "get",
      onSuccess: (data) => {
        const formattedData = data.months.map((item: any) => ({
          label: new Date(item.month).getMonth() + 1 + "월",
          value: item.cumulativeUsers,
        }));
        setAccumulatedUsers(formattedData);
      },
      onError: () => console.error("사용자 통계 로딩 실패"),
    });

    // API 4 & 5: 내 데이터 (로그인 시)
    if (loginInfo?.oid) {
      // 내 누적 아낀 금액
      axios({
        url: "/statistics/users/savings",
        method: "get",
        params: { userId: loginInfo.oid },
        onSuccess: (data) => setMySavings(data.totalSavings),
        onError: () => console.error("내 누적 금액 로딩 실패"),
      });

      // 내 누적 참여 횟수
      axios({
        url: "/statistics/users/done-room-count",
        method: "get",
        params: { userId: loginInfo.oid },
        onSuccess: (data) => setMyDoneRoomCount(data.doneRoomCount),
        onError: () => console.error("내 참여 횟수 로딩 실패"),
      });
    }
  }, [axios, loginInfo?.oid]);

  // 2️⃣ 기간 변경 시: 기간별 데이터 가져오기 (DB 집계 기준 '어제'로 수정)
  const fetchPeriodSavings = useCallback(async () => {
    if (period === "total") {
      // '전체' 기간이면 이미 받아온 totalSavings 사용 (API 호출 절약)
      setPeriodSavings(totalSavings);
      return;
    }

    // ✨ 날짜 계산 (오늘 기준이 아니라 '어제' 기준)
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1); // 어제
    endDate.setHours(23, 59, 59, 999); // 어제의 끝

    const startDate = new Date(endDate); // 시작일 계산을 위한 기준점

    if (period === "7d") startDate.setDate(endDate.getDate() - 7);
    if (period === "30d") startDate.setDate(endDate.getDate() - 30);
    if (period === "1y") startDate.setFullYear(endDate.getFullYear() - 1);

    // 시작일의 00:00:00 설정
    startDate.setHours(0, 0, 0, 0);

    // API 0: 기간별 아낀 금액
    await axios({
      url: "/statistics/savings/period",
      method: "get",
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
      onSuccess: (data) => setPeriodSavings(data.totalSavings),
      onError: () => console.error("기간별 통계 로딩 실패"),
    });
  }, [axios, period, totalSavings]);

  useEffect(() => {
    fetchPeriodSavings();
  }, [fetchPeriodSavings]);

  // 3️⃣ 그래프 데이터 가져오기 (장소/요일 변경 시) - ✨ Mock 제거 및 실제 API 연결
  const fetchGraphData = useCallback(async () => {
    if (!taxiLocations || taxiLocations.length === 0) return;

    // 선택된 장소 이름으로 ID 찾기
    const location = taxiLocations.find((loc) => loc.koName === graphPlace);
    if (!location) return;

    // 요일 문자열 -> 숫자 변환 (일:0 ~ 토:6)
    const dayIndex = DAYS.indexOf(graphDay);
    if (dayIndex === -1) return;

    // 기간 설정 (과거 30일)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    await axios({
      url: "/statistics/room-creation/hourly-average",
      method: "get",
      params: {
        locationId: location._id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        dayOfWeek: dayIndex,
      },
      onSuccess: (data) => {
        // API 응답(intervals)을 그래프 데이터 형식(TimeSlotData)으로 변환
        const formattedData = data.intervals.map((interval: any) => ({
          time: `${interval.hour}시`,
          value: interval.averageRooms,
        }));
        setGraphData(formattedData);
      },
      onError: () => {
        console.error("그래프 데이터 로딩 실패");
        setGraphData([]); // 실패 시 빈 데이터
      },
    });
  }, [axios, taxiLocations, graphPlace, graphDay]);

  useEffect(() => {
    if (activeTab === "place") {
      fetchGraphData();
    }
  }, [activeTab, fetchGraphData]);

  // --- Helper Functions ---
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

  // 🍗 환산 데이터 생성기 (소수점 1자리)
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

  // 내 통계용 콘텐츠 (기간 상관없이 전체 누적)
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

  // ✨ 그래프 필터 변경 핸들러
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
        {t("statistics")}
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
          css={{ animation: "fadeInUp 0.5s ease-out forwards" }}
        >
          {/* === A. 장소별 통계 === */}
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
                data={graphData}
                places={taxiLocations?.map((loc) => loc.koName) || []} // ✨ 실제 장소 목록 사용
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

              {/* 구분선 */}
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
                <WhiteContainerSuggestLogin />
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
