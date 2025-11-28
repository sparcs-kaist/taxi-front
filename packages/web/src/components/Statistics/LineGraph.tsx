import { useMemo, useState } from "react";

import theme from "@/tools/theme";

export interface LineGraphData {
  label: string; // X축 라벨 (날짜 등)
  value: number; // Y축 값
}

interface LineGraphProps {
  data: LineGraphData[];
  title?: string;
  className?: string;
  css?: any;
  color?: string;
}

const LineGraph = ({
  data,
  title = "누적 통계 그래프",
  className,
  css,
  color = theme.purple,
}: LineGraphProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG 크기 설정
  const width = 1000; // 내부 좌표계 너비
  const height = 300; // 내부 좌표계 높이
  const paddingX = 50;
  const paddingY = 50;

  // 데이터 계산
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1; // 0으로 나누기 방지

  // 좌표 계산 함수
  const getCoordinates = (index: number, value: number) => {
    // 데이터가 1개일 때 0으로 나누는 것 방지
    const denominator = data.length > 1 ? data.length - 1 : 1;
    const x = paddingX + (index / denominator) * (width - paddingX * 2);
    // Y축은 위가 0이므로 뒤집어야 함
    const y =
      height -
      paddingY -
      ((value - minValue) / range) * (height - paddingY * 2);
    return { x, y };
  };

  // 선 그리기 (Path)
  const points = useMemo(() => {
    return data
      .map((d, i) => {
        const { x, y } = getCoordinates(i, d.value);
        return `${x},${y}`;
      })
      .join(" ");
  }, [data, maxValue, minValue]);

  // 그라데이션 영역 (선 아래 채우기)
  const fillPath = useMemo(() => {
    if (data.length === 0) return "";
    const first = getCoordinates(0, data[0].value);
    const last = getCoordinates(data.length - 1, data[data.length - 1].value);
    return `M ${first.x},${height} L ${points} L ${last.x},${height} Z`;
  }, [points, data]);

  return (
    <div
      className={className}
      css={{
        ...css,
        backgroundColor: theme.white,
        borderRadius: "24px",
        padding: "32px 24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 제목 */}
      {title && (
        <div
          css={{
            fontSize: "18px",
            fontWeight: 800,
            color: color,
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          {title}
        </div>
      )}

      {/* 그래프 영역 */}
      <div css={{ width: "100%", position: "relative" }}>
        {/* SVG 그래프 */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 배경 채우기 */}
          <path d={fillPath} fill="url(#lineGradient)" stroke="none" />

          {/* 꺾은선 */}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 데이터 포인트 (점) & 인터랙션 영역 */}
          {data.map((d, i) => {
            const { x, y } = getCoordinates(i, d.value);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i}>
                {/* 툴팁 연결선 (호버 시 표시) */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={y}
                    x2={x}
                    y2={height}
                    stroke={theme.gray_line}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                )}

                {/* 실제 점 */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 8 : 4}
                  fill={theme.white}
                  stroke={color}
                  strokeWidth="3"
                  style={{ transition: "all 0.2s ease" }}
                />

                {/* 투명한 터치 영역 (더 넓게 잡아서 터치 쉽게) */}
                <rect
                  x={x - width / data.length / 2}
                  y={0}
                  width={width / data.length}
                  height={height}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTouchStart={() => setHoveredIndex(i)}
                  style={{ cursor: "pointer" }}
                />
              </g>
            );
          })}
        </svg>

        {/* HTML 툴팁 (SVG 위에 띄움) */}
        {hoveredIndex !== null && (
          <div
            css={{
              position: "absolute",
              top: `${
                getCoordinates(hoveredIndex, data[hoveredIndex].value).y /
                (height / 100)
              }%`,
              left: `${
                getCoordinates(hoveredIndex, data[hoveredIndex].value).x /
                (width / 100)
              }%`,
              transform: "translate(-50%, -120%)", // 점 위로 올리기
              backgroundColor: theme.black,
              color: theme.white,
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 10,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-4px",
                left: "50%",
                marginLeft: "-4px",
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: `4px solid ${theme.black}`,
              },
            }}
          >
            <div css={{ fontSize: "10px", opacity: 0.8, marginBottom: "2px" }}>
              {data[hoveredIndex].label}
            </div>
            {data[hoveredIndex].value.toLocaleString()}
          </div>
        )}
      </div>

      {/* X축 라벨 (좌표 기반 배치) */}
      <div
        css={{
          position: "relative",
          width: "100%",
          height: "20px",
          marginTop: "12px",
        }}
      >
        {data.map((d, i) => {
          // 처음, 중간, 끝만 표시하여 겹침 방지
          const isFirst = i === 0;
          const isLast = i === data.length - 1;
          const isMiddle = i === Math.floor(data.length / 2);

          if (!isFirst && !isLast && !isMiddle) return null;

          const { x } = getCoordinates(i, d.value);

          return (
            <span
              key={i}
              css={{
                position: "absolute",
                left: `${(x / width) * 100}%`, // 점의 x좌표와 정확히 일치
                transform: "translateX(-50%)", // 텍스트 중앙 정렬
                fontSize: "11px",
                color: theme.gray_text,
                whiteSpace: "nowrap",
              }}
            >
              {d.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default LineGraph;
