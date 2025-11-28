import { useState } from "react";
import { useTranslation } from "react-i18next";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import {
  BusyTimeGraph,
  DynamicStatTile,
  TileVariant,
} from "@/components/Statistics";
import Title from "@/components/Title";

import theme from "@/tools/theme";

// ✨ 페이지 진입 애니메이션
const fadeInUpKeyframes = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// 더미 데이터 (그래프)
const MOCK_GRAPH_DATA = [
  { label: "18시", value: 30 },
  { label: "19시", value: 50 },
  { label: "20시", value: 60 },
  { label: "21시", value: 80 },
  { label: "22시", value: 100, isHighlight: true },
  { label: "23시", value: 90 },
  { label: "00시", value: 40 },
  { label: "01시", value: 30 },
  { label: "02시", value: 20 },
  { label: "03시", value: 10 },
];

// ✨ 기간 타입 정의
type Period = "7d" | "30d" | "1y" | "total";

const Statistics = () => {
  const { t } = useTranslation("mypage");
  const [activeTab, setActiveTab] = useState<"all" | "personal">("all");
  const [period, setPeriod] = useState<Period>("30d"); // 기본값: 30일

  // 전체 누적 데이터 (고정값)
  const totalAccumulated = 34134631;
  const myAccumulated = 125000;

  // ✨ 기간별 데이터 계산 (시뮬레이션)
  // [수정] 모든 계산 결과는 소수점 1자리까지만 유지합니다.
  const getPeriodValue = (baseAmount: number, p: Period) => {
    let value = baseAmount;
    switch (p) {
      case "7d":
        value = baseAmount * 0.02;
        break; // 전체의 2%
      case "30d":
        value = baseAmount * 0.08;
        break; // 전체의 8%
      case "1y":
        value = baseAmount * 0.85;
        break; // 전체의 85%
      default:
        value = baseAmount;
        break; // total일 땐 원본 그대로
    }
    return parseFloat(value.toFixed(1));
  };

  // ✨ 기간별 라벨 생성기
  const getPeriodLabelPrefix = (p: Period) => {
    switch (p) {
      case "7d":
        return "지난 7일간\n";
      case "30d":
        return "지난 30일간\n";
      case "1y":
        return "지난 1년간\n";
      default:
        return "Taxi 서비스에서\n";
    }
  };

  // 현재 선택된 기간의 데이터
  const currentTotal = getPeriodValue(totalAccumulated, period);
  const currentMy = getPeriodValue(myAccumulated, period);

  // 🍗 환산 데이터 생성기
  // [수정] 치킨, 튀소 등 환산 값도 소수점 1자리로 고정
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
    const timeLabel = getPeriodLabelPrefix(period);
    return [
      {
        label: `${timeLabel}${userPrefix} 절약한 교통비`,
        value: parseFloat(amount.toFixed(1)), // 금액도 1자리 유지
        prefix: "₩",
        variant: "purple",
      },
      {
        label: `${timeLabel}${userPrefix} 아낀 치킨`,
        value: parseFloat((amount / 20000).toFixed(1)), // 치킨 1자리 유지
        unit: "마리",
        variant: "orange",
      },
      {
        label: `${timeLabel}${userPrefix} 아낀 튀소`,
        value: parseFloat((amount / 3500).toFixed(1)), // 튀소 1자리 유지
        unit: "개",
        variant: "yellow",
      },
    ];
  };

  // ✨ 기간 선택 버튼 스타일
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

  return (
    <AdaptiveDiv type="center">
      <style>{fadeInUpKeyframes}</style>

      <Title icon="stats" isHeader>
        {t("statistics")}
      </Title>

      <div css={{ padding: "0 20px 80px" }}>
        {/* === 1. 상단 탭 (전체 / 내 통계) === */}
        <div
          css={{
            display: "flex",
            background: "#F0F0F0",
            padding: "4px",
            borderRadius: "16px",
            marginBottom: "24px",
          }}
        >
          {/* ... (기존 탭 버튼들 동일) ... */}
          <button
            onClick={() => setActiveTab("all")}
            css={{
              flex: 1,
              padding: "12px 0",
              borderRadius: "14px",
              border: "none",
              fontSize: "15px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: activeTab === "all" ? theme.white : "transparent",
              color: activeTab === "all" ? theme.purple : theme.gray_text,
              boxShadow:
                activeTab === "all" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
            }}
          >
            전체 통계
          </button>
          <button
            onClick={() => setActiveTab("personal")}
            css={{
              flex: 1,
              padding: "12px 0",
              borderRadius: "14px",
              border: "none",
              fontSize: "15px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s ease",
              background:
                activeTab === "personal" ? theme.white : "transparent",
              color: activeTab === "personal" ? theme.purple : theme.gray_text,
              boxShadow:
                activeTab === "personal" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
            }}
          >
            내 통계
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div
          key={activeTab}
          css={{ animation: "fadeInUp 0.5s ease-out forwards" }}
        >
          <div css={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* "명예의 전당" 섹션 삭제됨 */}

            {/* === 기간별 통계 섹션 (이제 메인입니다!) === */}
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

              {/* 기간 선택 UI */}
              <div
                css={{
                  display: "flex",
                  background: theme.gray_background, // 연한 회색 배경
                  padding: "4px",
                  borderRadius: "10px",
                  marginBottom: "16px",
                  gap: "4px",
                }}
              >
                <button
                  onClick={() => setPeriod("7d")}
                  css={periodButtonStyle("7d")}
                >
                  7일
                </button>
                <button
                  onClick={() => setPeriod("30d")}
                  css={periodButtonStyle("30d")}
                >
                  30일
                </button>
                <button
                  onClick={() => setPeriod("1y")}
                  css={periodButtonStyle("1y")}
                >
                  1년
                </button>
                <button
                  onClick={() => setPeriod("total")}
                  css={periodButtonStyle("total")}
                >
                  전체
                </button>
              </div>

              {/* 기간별 동적 타일 */}
              <div
                css={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                <DynamicStatTile
                  data={getDynamicContents(
                    activeTab === "all" ? currentTotal : currentMy,
                    activeTab === "all" ? "모두가" : "내가"
                  )}
                />

                {/* 추가 통계 (예: 횟수) */}
                <DynamicStatTile
                  data={[
                    {
                      label: `${getPeriodLabelPrefix(period)}${
                        activeTab === "all" ? "생성된" : "참여한"
                      } 택시 동승 수`,
                      value: Math.floor(
                        (activeTab === "all" ? currentTotal : currentMy) / 4500
                      ), // 횟수는 정수로 유지
                      unit: "개",
                      variant: "white",
                    },
                  ]}
                />

                {/* 그래프: '전체 통계' 탭이면서 기간이 '전체'일 때만 표시 */}
                {activeTab === "all" && period === "total" && (
                  <BusyTimeGraph
                    data={MOCK_GRAPH_DATA}
                    title="택시 승강장이 평소보다 붐비는 시간"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer type="only-logo" />
    </AdaptiveDiv>
  );
};

export default Statistics;
