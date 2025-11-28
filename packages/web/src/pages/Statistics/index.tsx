import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAxios } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

interface CarrierStatistics {
  totalRooms: number;
  roomsWithCarrier: number;
  participationWithCarrier: number;
  totalParticipation: number;
}

const StatisticsContents = () => {
  const axios = useAxios();
  const { t } = useTranslation("statistics"); 
  const [stats, setStats] = useState<CarrierStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    await axios({
      url: "/statistics/carrier",
      method: "get",
      onSuccess: (data: CarrierStatistics) => {
        setStats(data);
        setLoading(false);
      },
      onError: (e) => {
        console.error("통계 데이터 로딩 실패:", e);
        setLoading(false);
      },
    });
  }, [axios]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  if (loading) {
    return (
      <p css={{ textAlign: "center", ...theme.font14, color: theme.gray_text }}>
        {t("loading_stats")}
      </p>
    );
  }

  if (!stats) {
    return (
      <p css={{ textAlign: "center", ...theme.font14, color: theme.red_text }}>
        {t("failed_to_load")}
      </p>
    );
  }


  const carrierRoomRatio =
    stats.totalRooms > 0
      ? (stats.roomsWithCarrier / stats.totalRooms) * 100
      : 0;
  const carrierParticipationRatio =
    stats.totalParticipation > 0
      ? (stats.participationWithCarrier / stats.totalParticipation) * 100
      : 0;

  const styleItem = {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: `1px solid ${theme.gray_background}`,
  };

  const styleLabel = {
    ...theme.font14,
    color: theme.black,
  };

  const styleValue = {
    ...theme.font14_bold,
    color: theme.purple,
  };

  return (
    <div css={{ display: "grid", rowGap: "12px", padding: "16px 24px" }}>
      <p css={{ ...theme.font16_bold, marginBottom: "8px" }}>
        📦 캐리어 동승 통계
      </p>

      {/* 1. 전체 방 대비 캐리어 방 비율 */}
      <div css={styleItem}>
        <span css={styleLabel}>캐리어 포함 방 비율</span>
        <span css={styleValue}>{carrierRoomRatio.toFixed(1)}%</span>
      </div>

      {/* 2. 전체 참여 인원 대비 캐리어 소지 참여 비율 */}
      <div css={styleItem}>
        <span css={styleLabel}>캐리어 소지 참여 비율</span>
        <span css={styleValue}>{carrierParticipationRatio.toFixed(1)}%</span>
      </div>

      {/* 3. 상세 수치 */}
      <div css={{ marginTop: "16px", ...theme.font12, color: theme.gray_text }}>
        <p>• 총 개설 방: {stats.totalRooms}개</p>
        <p>• 캐리어 포함 방: {stats.roomsWithCarrier}개</p>
        <p>• 총 참여 횟수: {stats.totalParticipation}회</p>
        <p>• 캐리어 소지 참여 횟수: {stats.participationWithCarrier}회</p>
      </div>
    </div>
  );
};

const Statistics = () => {
  const { t } = useTranslation("mypage"); // 마이페이지 t 함수를 재사용 (아니면 새 파일에 정의)

  return (
    <AdaptiveDiv type="center">
      <Title icon="stats" isHeader>
        {t("statistics")}
      </Title>

      <WhiteContainer>
        <StatisticsContents />
      </WhiteContainer>

      <Footer type="only-logo" />
    </AdaptiveDiv>
  );
};

export default Statistics;
