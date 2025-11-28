import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
// ✨ API 및 상태 관리 훅 임포트
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

// ✨ 로그인 제안 컴포넌트 추가
import theme from "@/tools/theme";

const fadeInUpKeyframes = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// --- Mock Data (아직 API 없는 부분) ---
const MOCK_PLACES = ["전체", "본원 정문", "본원 후문", "문지캠", "화암캠"];
const MOCK_DAYS = ["전체", "월", "화", "수", "목", "금", "토", "일"];

const MOCK_GRAPH_DATA_ALL: TimeSlotData[] = [
  { time: "18시", value: 30 },
  { time: "19시", value: 55 },
  { time: "20시", value: 70 },
  { time: "21시", value: 90 },
  { time: "22시", value: 120 },
  { time: "23시", value: 85 },
  { time: "00시", value: 40 },
  { time: "01시", value: 25 },
];

const MOCK_ACCUMULATED_RIDES: GraphTileData[] = [
  { label: "1월", value: 1200 },
  { label: "2월", value: 2100 },
  { label: "3월", value: 3500 },
  { label: "4월", value: 4800 },
  { label: "5월", value: 6200 },
  { label: "6월", value: 8500 },
  { label: "7월", value: 9800 },
  { label: "8월", value: 12400 },
  { label: "9월", value: 15430 },
];
const MOCK_ACCUMULATED_USERS: GraphTileData[] = [
  { label: "1월", value: 500 },
  { label: "2월", value: 800 },
  { label: "3월", value: 1200 },
  { label: "4월", value: 1500 },
  { label: "5월", value: 1900 },
  { label: "6월", value: 2400 },
  { label: "7월", value: 2800 },
  { label: "8월", value: 3200 },
  { label: "9월", value: 3850 },
];

type Period = "7d" | "30d" | "1y" | "total";
type TabType = "all" | "personal" | "place";

const Statistics = () => {
  const { t } = useTranslation("mypage");
  const axios = useAxios();
  const loginInfo = useValueRecoilState("loginInfo");

  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [period, setPeriod] = useState<Period>("30d");
  const [graphData, setGraphData] =
    useState<TimeSlotData[]>(MOCK_GRAPH_DATA_ALL);

  // ✨ 실제 데이터 상태
  const [totalSavings, setTotalSavings] = useState<number>(0); // 전체 누적
  const [mySavings, setMySavings] = useState<number>(0); // 내 누적
  const [periodSavings, setPeriodSavings] = useState<number>(0); // 기간별 전체

  // 1️⃣ 초기 로딩: 전체 누적 & 내 누적 가져오기
  useEffect(() => {
    // 전체 누적
    axios({
      url: "/statistics/savings/total",
      method: "get",
      onSuccess: (data) => setTotalSavings(data.totalSavings),
      onError: () => console.error("전체 누적 금액 로딩 실패"),
    });

    // 내 누적 (로그인 된 경우만)
    if (loginInfo?.oid) {
      axios({
        url: "/statistics/users/savings",
        method: "get",
        params: { userId: loginInfo.oid },
        onSuccess: (data) => setMySavings(data.totalSavings),
        onError: () => console.error("내 누적 금액 로딩 실패"),
      });
    }
  }, [axios, loginInfo?.oid]);

  // 2️⃣ 기간 변경 시: 기간별 데이터 가져오기
  const fetchPeriodSavings = useCallback(async () => {
    if (period === "total") {
      // '전체' 기간이면 API 호출 없이 totalSavings 사용
      setPeriodSavings(totalSavings);
      return;
    }

    const endDate = new Date();
    const startDate = new Date();

    if (period === "7d") startDate.setDate(endDate.getDate() - 7);
    if (period === "30d") startDate.setDate(endDate.getDate() - 30);
    if (period === "1y") startDate.setFullYear(endDate.getFullYear() - 1);

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
    // period가 바뀌거나, 초기 로딩으로 totalSavings가 세팅되면 실행
    fetchPeriodSavings();
  }, [fetchPeriodSavings]);

  const getPeriodLabelPrefix = (p: Period) => {
    switch (p) {
      case "7d":
        return "지난 7일간\n";
      case "30d":
        return "지난 30일간\n";
      case "1y":
        return "지난 1년간\n";
      default:
        return "지금까지\n";
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
      activeTab === "all"
        ? getPeriodLabelPrefix(period)
        : "Taxi와 함께한 시간 동안\n";
    return [
      {
        label: `${timeLabel}${userPrefix} 아낀 금액`,
        value: parseFloat(amount.toFixed(1)),
        prefix: "₩",
        variant: "purple",
      },
      {
        label: `${timeLabel}${userPrefix} 아낀 치킨`,
        value: parseFloat((amount / 20000).toFixed(1)),
        unit: "마리",
        variant: "orange",
      },
      {
        label: `${timeLabel}${userPrefix} 아낀 튀소`,
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
    // TODO: 나중에 API 연동
    if (place !== "전체") {
      setGraphData(
        MOCK_GRAPH_DATA_ALL.map((d) => ({
          ...d,
          value: Math.floor(d.value * Math.random()),
        }))
      );
    } else {
      setGraphData(MOCK_GRAPH_DATA_ALL);
    }
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
        {/* 상단 탭 */}
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

        {/* 컨텐츠 영역 */}
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
                  📍 어디가 가장 핫할까요?
                </div>
                <div css={{ fontSize: "14px", color: theme.gray_text }}>
                  원하는 장소와 요일을 선택해보세요.
                </div>
              </div>

              <BusyTimeGraph
                data={graphData}
                places={MOCK_PLACES}
                days={MOCK_DAYS}
                onFilterChange={handleGraphFilterChange}
              />
            </div>
          )}

          {/* === B. 전체 통계 === */}
          {activeTab === "all" && (
            <div
              css={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {/* 1. 기간별 분석 (API 연동됨) */}
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
                  {/* 동승 팟 수는 아직 API가 없어서 임시 계산 유지 */}
                  <DynamicStatTile
                    data={[
                      {
                        label: `${getPeriodLabelPrefix(
                          period
                        )}생성된\n택시 동승 팟 수`,
                        value: Math.floor(periodSavings / 4500),
                        unit: "개",
                        variant: "white",
                      },
                    ]}
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

              {/* 2. Taxi는 지금까지 (누적 그래프 - API 아직 없음) */}
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
                    value={15430}
                    unit="번"
                    data={MOCK_ACCUMULATED_RIDES}
                    lineColor="#6B46C1"
                  />
                  <GraphStatTile
                    title="누적 사용자 수"
                    value={3850}
                    unit="명"
                    data={MOCK_ACCUMULATED_USERS}
                    lineColor="#DD6B20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* === C. 내 통계 (API 연동됨) === */}
          {activeTab === "personal" && (
            <div
              css={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* ✨ 로그인 여부 확인 */}
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
                      {/* ✨ 내 누적 데이터 사용 */}
                      <DynamicStatTile
                        data={getDynamicContents(mySavings, "내가")}
                      />
                      {/* 동승 팟 수는 아직 API가 없어서 임시 계산 유지 */}
                      <DynamicStatTile
                        data={[
                          {
                            label: `지금까지 참여한\n택시 동승 팟 수`,
                            value: Math.floor(mySavings / 4500),
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
                    내 통계는 개인정보 보호를 위해
                    <br />
                    상세 내역을 저장하지 않고 있습니다.
                  </div>
                </>
              ) : (
                // ✨ 로그인이 안 되어 있다면 로그인 제안 컴포넌트 표시
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
