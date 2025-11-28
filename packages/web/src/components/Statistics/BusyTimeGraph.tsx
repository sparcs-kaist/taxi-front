import { useState } from "react";

import theme from "@/tools/theme";

export interface TimeSlotData {
  time: string;
  value: number;
}

interface BusyTimeGraphProps {
  data: TimeSlotData[];
  places: string[];
  days: string[];
  onFilterChange: (place: string, day: string) => void;
  className?: string;
  css?: any;
}

const BusyTimeGraph = ({
  data,
  places,
  days,
  onFilterChange,
  className,
  css,
}: BusyTimeGraphProps) => {
  const getTodayLabel = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kstGap = 9 * 60 * 60 * 1000;
    const today = new Date(utc + kstGap);
    const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];
    return dayLabels[today.getDay()];
  };

  // ✨ 기본값 설정: 장소는 "택시승강장", 요일은 "오늘"
  const [selectedPlace, setSelectedPlace] = useState("택시승강장");
  const [selectedDay, setSelectedDay] = useState(getTodayLabel());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ✨ "전체" 옵션 제거 필터링
  const filteredPlaces = places.filter((p) => p !== "전체");
  const filteredDays = days.filter((d) => d !== "전체");

  // 최대값 계산
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const handlePlaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPlace = e.target.value;
    setSelectedPlace(newPlace);
    onFilterChange(newPlace, selectedDay);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value;
    setSelectedDay(newDay);
    onFilterChange(selectedPlace, newDay);
  };

  const selectContainerStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  };

  const selectLabelStyle = {
    fontSize: "15px",
    fontWeight: 700,
    color: theme.purple,
    textAlign: "center" as const,
    marginBottom: "4px",
  };

  const selectStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: `1px solid ${theme.purple_light}`,
    backgroundColor: theme.white,
    fontSize: "14px",
    fontWeight: 600,
    color: theme.black,
    cursor: "pointer",
    outline: "none",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B46C1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    textAlign: "center" as const,
    textAlignLast: "center" as const,
    transition: "box-shadow 0.2s",
    "&:focus": {
      boxShadow: "0 0 0 2px rgba(107, 70, 193, 0.2)",
    },
  };

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
      {/* 1. 그래프 영역 */}
      <div
        css={{
          display: "flex",
          alignItems: "stretch",
          height: "140px",
          gap: "6px",
          width: "100%",
          marginBottom: "28px",
        }}
      >
        {data.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          const isHighlight = item.value === maxValue && item.value > 0;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              css={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end", // 막대는 아래 정렬
                position: "relative",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
            >
              {/* 툴팁 */}
              <div
                css={{
                  position: "absolute",
                  bottom: `calc(${heightPercentage}% + 24px)`, // 라벨 높이 고려해서 툴팁 위치 조정
                  marginBottom: "8px",
                  left: "50%",
                  transform: isHovered
                    ? "translateX(-50%) scale(1)"
                    : "translateX(-50%) scale(0.8)",
                  backgroundColor: theme.purple,
                  color: theme.white,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  opacity: isHovered ? 1 : 0,
                  transition:
                    "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  zIndex: 10,
                  pointerEvents: "none",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-4px",
                    left: "50%",
                    marginLeft: "-4px",
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: `4px solid ${theme.purple}`,
                  },
                }}
              >
                {item.value}명
              </div>

              {/* 막대 Wrapper (막대 + 라벨을 감쌈) */}
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%", // 전체 높이 사용
                  justifyContent: "flex-end", // 아래 정렬
                }}
              >
                {/* 실제 막대 */}
                <div
                  css={{
                    width: "100%",
                    height: `${Math.max(heightPercentage, 0)}%`,
                    backgroundColor: isHighlight ? "#7B2C83" : "#A9A0B6",
                    borderRadius: "4px", // 둥근 모서리 살짝 줄임 (좁은 공간 고려)
                    transition:
                      "height 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s",
                    minHeight: "4px",
                    marginBottom: "6px", // 막대와 라벨 사이 간격
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                />

                {/* ✨ 시간 인덱스 (라벨) 추가 */}
                <div
                  css={{
                    fontSize: "10px", // 아주 작게
                    color: theme.gray_text, // 엷은 회색
                    fontWeight: 400,
                    height: "12px", // 고정 높이
                    lineHeight: "12px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    opacity: 0.8, // 살짝 투명하게
                  }}
                >
                  {/* 공간이 좁을 수 있으니 숫자만 표시하거나 간략하게 (예: 18시 -> 18) */}
                  {item.time.replace("시", "")}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. 제목 & 설명 */}
      <div css={{ textAlign: "center", marginBottom: "32px", width: "100%" }}>
        {/* ✨ 제목 색상 theme.purple로 고정 */}
        <div
          css={{
            fontSize: "18px",
            fontWeight: 800,
            color: theme.purple,
            marginBottom: "8px",
            wordBreak: "keep-all",
            lineHeight: "1.3",
          }}
        >
          {selectedDay}요일, [{selectedPlace}]의
          <br />
          시간대별 택시 동승
        </div>
        <div
          css={{
            fontSize: "12px",
            color: theme.gray_text,
            fontWeight: 500,
            wordBreak: "keep-all",
            lineHeight: "1.4",
          }}
        >
          학기나 계절 등의 최신 동향을 반영하고자 <br /> 과거 30일을 기반으로
          조회합니다.
        </div>
      </div>

      {/* 3. 선택기 */}
      <div css={{ display: "flex", width: "100%", gap: "12px" }}>
        <div css={selectContainerStyle}>
          <div css={selectLabelStyle}>장소 선택기</div>
          <select
            value={selectedPlace}
            onChange={handlePlaceChange}
            css={selectStyle}
          >
            {/* ✨ "전체" 제외한 목록 표시 */}
            {filteredPlaces.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
        </div>
        <div css={selectContainerStyle}>
          <div css={selectLabelStyle}>요일 선택기</div>
          <select
            value={selectedDay}
            onChange={handleDayChange}
            css={selectStyle}
          >
            {/* ✨ "전체" 제외한 목록 표시 */}
            {filteredDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BusyTimeGraph;
