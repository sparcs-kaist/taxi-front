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
  selectedPlace: string;
  selectedDay: string;
  onFilterChange: (place: string, day: string) => void;
  className?: string;
  css?: any;
}

const BusyTimeGraph = ({
  data,
  places,
  days,
  selectedPlace,
  selectedDay,
  onFilterChange,
  className,
  css,
}: BusyTimeGraphProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredPlaces = places.filter((p) => p !== "전체");
  const filteredDays = days.filter((d) => d !== "전체");

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const handlePlaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value, selectedDay);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(selectedPlace, e.target.value);
  };

  const getTooltipStyle = (index: number, total: number) => {
    if (index < 2) {
      return {
        left: "0",
        transform:
          hoveredIndex === index ? "translateY(0)" : "translateY(10px)",
        "&::after": {
          left: "20%",
        },
      };
    }
    if (index >= total - 2) {
      return {
        right: "0",
        left: "auto",
        transform:
          hoveredIndex === index ? "translateY(0)" : "translateY(10px)",
        "&::after": {
          left: "auto",
          right: "20%",
        },
      };
    }
    return {
      left: "50%",
      transform:
        hoveredIndex === index
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(10px)",
    };
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
      <div
        css={{
          display: "flex",
          alignItems: "stretch",
          height: "140px",
          gap: "4px",
          width: "100%",
          marginBottom: "28px",
        }}
      >
        {data.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          const isHighlight = item.value === maxValue && item.value > 0;
          const isHovered = hoveredIndex === index;
          const tooltipStyle = getTooltipStyle(index, data.length);

          const hour = parseInt(item.time.replace("시", ""), 10);
          const shouldShowLabel = hour % 3 === 0;

          const displayValue = Math.round(item.value);

          return (
            <div
              key={index}
              css={{
                flex: 1,
                width: 0,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                position: "relative",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
            >
              <div
                css={{
                  position: "absolute",
                  bottom: `calc(${heightPercentage}% + 24px)`,
                  marginBottom: "8px",
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
                  ...tooltipStyle,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-4px",
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: `4px solid ${theme.purple}`,
                    left: "50%",
                    marginLeft: "-4px",
                    ...((tooltipStyle as any)["&::after"] || {}),
                  },
                }}
              >
                {displayValue}개
              </div>

              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  css={{
                    width: "100%",
                    height: `${Math.max(heightPercentage, 0)}%`,
                    backgroundColor: isHighlight ? "#7B2C83" : "#A9A0B6",
                    borderRadius: "4px",
                    transition:
                      "height 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s",
                    minHeight: "4px",
                    marginBottom: "6px",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                />

                <div
                  css={{
                    fontSize: "10px",
                    color: theme.gray_text,
                    fontWeight: 400,
                    height: "12px",
                    lineHeight: "12px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    opacity: shouldShowLabel ? 0.8 : 0,
                  }}
                >
                  {shouldShowLabel ? item.time.replace("시", "") : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div css={{ textAlign: "center", marginBottom: "32px", width: "100%" }}>
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
          {selectedDay}요일, {selectedPlace}의
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
          학기 / 계절에 따른 동향을 반영하고자
          <br />
          과거 30일을 기반으로 조회합니다.
        </div>
      </div>

      <div css={{ display: "flex", width: "100%", gap: "12px" }}>
        <div css={selectContainerStyle}>
          <div css={selectLabelStyle}>장소</div>
          <select
            value={selectedPlace}
            onChange={handlePlaceChange}
            css={selectStyle}
          >
            {filteredPlaces.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
        </div>
        <div css={selectContainerStyle}>
          <div css={selectLabelStyle}>요일</div>
          <select
            value={selectedDay}
            onChange={handleDayChange}
            css={selectStyle}
          >
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
