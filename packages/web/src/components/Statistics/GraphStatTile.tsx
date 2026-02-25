import { useEffect, useMemo, useRef, useState } from "react";

import theme from "@/tools/theme";

// ✨ 데이터 타입
export interface GraphTileData {
  label: string;
  value: number;
}

interface GraphStatTileProps {
  title: string;
  value: number; // 최종 숫자
  unit: string;
  data: GraphTileData[]; // 그래프용 데이터
  difference?: number; // ✨ [추가] 지난달 대비 증가량
  lineColor?: string; // 그래프 색상
  className?: string;
  css?: any;
}

// ⚡️ 숫자 카운트 업 훅 (재사용)
const useCountUp = (end: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 5); // easeOutQuint
      setCount(Math.floor(ease * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return count;
};

const GraphStatTile = ({
  title,
  value,
  unit,
  data,
  difference, // ✨ prop 받기
  lineColor = theme.purple,
  className,
  css,
}: GraphStatTileProps) => {
  const animatedValue = useCountUp(value, 1500);
  // ✨ 그라데이션 ID 충돌 방지를 위한 유니크 ID 생성
  const gradientId = useRef(
    `grad-${Math.random().toString(36).substr(2, 9)}`
  ).current;

  // SVG 설정
  const width = 200;
  const height = 60; // 그래프 높이 설정
  const paddingX = 5;
  const paddingY = 5;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  // 좌표 계산
  const coordinates = useMemo(() => {
    return data.map((d, i) => {
      const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
      const y =
        height -
        paddingY -
        ((d.value - minValue) / range) * (height - paddingY * 2);
      return { x, y };
    });
  }, [data, maxValue, minValue]);

  // 꺾은선 (Polyline) 포인트 문자열
  const pointsStr = useMemo(() => {
    return coordinates.map((c) => `${c.x},${c.y}`).join(" ");
  }, [coordinates]);

  // ✨ 채우기 영역 (Path) 경로 계산
  const fillPath = useMemo(() => {
    if (coordinates.length === 0) return "";
    const first = coordinates[0];
    const last = coordinates[coordinates.length - 1];

    // M(시작점) -> L(모든 점들) -> L(우하단) -> L(좌하단) -> Z(닫기)
    return (
      `M ${first.x},${first.y} ` +
      coordinates.map((c) => `L ${c.x},${c.y}`).join(" ") +
      ` L ${last.x},${height} L ${first.x},${height} Z`
    );
  }, [coordinates, height]);

  return (
    <div
      className={className}
      css={{
        ...css,
        backgroundColor: theme.white,
        borderRadius: "24px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "160px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. 타이틀 */}
      <div
        css={{
          fontSize: "16px",
          fontWeight: 700,
          color: theme.gray_text,
          marginBottom: "12px",
          zIndex: 2,
        }}
      >
        {title}
      </div>

      {/* 2. 중간 꺾은선 그래프 */}
      <div
        css={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: "12px",
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* ✨ 그라데이션 정의 */}
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ✨ 그라데이션 채우기 */}
          <path d={fillPath} fill={`url(#${gradientId})`} />

          {/* 꺾은선 */}
          <polyline
            points={pointsStr}
            fill="none"
            stroke={lineColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" }}
          />
          {/* 마지막 점 강조 */}
          {coordinates.length > 0 && (
            <circle
              cx={coordinates[coordinates.length - 1].x}
              cy={coordinates[coordinates.length - 1].y}
              r="4"
              fill={theme.white}
              stroke={lineColor}
              strokeWidth="3"
            />
          )}
        </svg>
      </div>

      {/* 3. 하단 숫자 및 증가량 표시 */}
      <div css={{ textAlign: "right", zIndex: 2 }}>
        <div
          css={{
            fontSize: "28px",
            fontWeight: 800,
            color: theme.black,
            fontFamily: "SUIT, sans-serif",
            lineHeight: "1",
          }}
        >
          {animatedValue.toLocaleString()}
          <span
            css={{
              fontSize: "18px",
              marginLeft: "4px",
              fontWeight: 700,
              color: theme.gray_text,
            }}
          >
            {unit}
          </span>
        </div>

        {/* ✨ [추가] 지난달 대비 증가량 표시 */}
        {difference !== undefined && (
          <div
            css={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#38A169", // 싱그러운 초록색!
              marginTop: "6px",
            }}
          >
            지난 달보다 +{difference.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphStatTile;
