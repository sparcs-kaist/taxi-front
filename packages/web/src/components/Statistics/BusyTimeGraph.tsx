import { SetStateAction, memo, useState } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Picker from "@/components/ModalRoomOptions/Picker";

import theme from "@/tools/theme";


// ───── FilterElement ─────
const FilterElement = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    css={{
      flex: 1,
      padding: "12px",
      borderRadius: "12px",
      border: `1px solid ${theme.purple_light}`,
      backgroundColor: theme.white,
      cursor: "pointer",
      textAlign: "center",
      transition: "all 0.2s",
      "&:hover": { backgroundColor: "#F9F7FF" },
    }}
  >
    <div
      css={{
        fontSize: "12px",
        color: theme.purple,
        fontWeight: 700,
        marginBottom: "4px",
      }}
    >
      {label}
    </div>
    <div css={{ fontSize: "16px", fontWeight: 800, color: theme.black }}>
      {value}
    </div>
  </div>
);

// ───── CustomPickerModal ─────
const CustomPickerModal = ({
  isOpen,
  onClose,
  value,
  options,
  onSelect,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  options: string[];
  onSelect: (val: string) => void;
  title: string;
}) => {
  const [tempValue, setTempValue] = useState(value);
  const handleConfirm = () => {
    onSelect(tempValue);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onChangeIsOpen={onClose} displayCloseBtn={false}>
      <div css={{ padding: "10px", textAlign: "center" }}>
        <div
          css={{
            fontSize: "18px",
            fontWeight: 800,
            color: theme.purple,
            marginBottom: "20px",
          }}
        >
          {title} 선택
        </div>
        <div css={{ height: "200px", marginBottom: "20px" }}>
          <Picker
            optionGroups={{ [title]: options }}
            valueGroups={{ [title]: tempValue }}
            onChange={(_: any, val: SetStateAction<string>) =>
              setTempValue(val)
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0px 10px",
          }}
        >
          <Button
            type="gray"
            css={{
              width: "calc(40% - 10px)",
              padding: "10px 0 9px",
              borderRadius: "8px",
              ...theme.font14,
            }}
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            type="purple"
            css={{
              width: "60%",
              padding: "10px 0 9px",
              borderRadius: "8px",
              ...theme.font14_bold,
            }}
            onClick={handleConfirm}
          >
            선택하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// ───── 메인 BusyTimeGraph 컴포넌트 ─────
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
  const [isPlaceOpen, setIsPlaceOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);

  const filteredPlaces = places.filter((p) => p !== "전체");
  const filteredDays = days.filter((d) => d !== "전체");
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  // 3시간 간격 라벨 표시 여부 (0, 3, 6, 9, 12, 15, 18, 21)
  const showLabel = (timeStr: string) => {
    const hour = parseInt(timeStr);
    return !isNaN(hour) && hour % 3 === 0;
  };

  return (
    <div
      className={className}
      css={{
        ...css,
        backgroundColor: theme.white,
        borderRadius: "24px",
        padding: "24px 20px 20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* 제목 */}
      <div css={{ textAlign: "center" }}>
        <div
          css={{
            fontSize: "16px",
            fontWeight: 800,
            color: theme.purple,
            marginBottom: "4px",
          }}
        >
          {selectedDay}요일, {selectedPlace}
          <br />
          시간대별 택시 동승
        </div>
        <div css={{ fontSize: "12px", color: theme.gray_text }}>
          과거 30일을 기반으로 조회합니다.
        </div>
      </div>

      {/* 막대 그래프 or 빈 상태 */}
      {data.length === 0 ? (
        <div
          css={{
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.gray_text,
            fontSize: "13px",
          }}
        >
          데이터를 불러오는 중...
        </div>
      ) : (
      <div
        css={{
          display: "grid",
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          alignItems: "end",
          height: "120px",
          gap: "2px",
          width: "100%",
        }}
      >
        {data.map((item, index) => {
          const heightPct = (item.value / maxValue) * 100;
          const isHighlight = item.value === maxValue && item.value > 0;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "100%",
                position: "relative",
                cursor: "pointer",
              }}
            >
              {/* 호버 툴팁 */}
              {isHovered && (
                <div
                  css={{
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: theme.purple,
                    color: theme.white,
                    padding: "3px 6px",
                    borderRadius: "5px",
                    fontSize: "10px", 
                    whiteSpace: "nowrap",
                    zIndex: 10,
                    pointerEvents: "none",
                    marginBottom: "4px",
                  }}
                >
                  {item.time} {Math.round(item.value)}개
                </div>
              )}
              {/* 막대 */}
              <div
                css={{
                  width: "100%",
                  height: `${Math.max(heightPct, 2)}%`,
                  backgroundColor: isHighlight
                    ? theme.purple
                    : isHovered
                    ? "#C4B3DF"
                    : "#DDD6F0",
                  borderRadius: "3px 3px 0 0",
                  transition: "background-color 0.15s, height 0.3s ease",
                }}
              />
            </div>
          );
        })}
      </div>
      )}

      {/* X축 라벨 (3시간 간격) */}
      <div
        css={{
          display: "grid",
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          width: "100%",
          marginTop: "-12px",
          gap: "2px",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            css={{
              fontSize: "9px",
              color: theme.gray_text,
              textAlign: "center",
              overflow: "hidden",
              lineHeight: 1,
            }}
          >
            {showLabel(item.time) ? item.time.replace("시", "") : ""}
          </div>
        ))}
      </div>

      {/* 장소/요일 필터 */}
      <div css={{ display: "flex", width: "100%", gap: "12px" }}>
        <FilterElement
          label="장소"
          value={selectedPlace}
          onClick={() => setIsPlaceOpen(true)}
        />
        <FilterElement
          label="요일"
          value={selectedDay}
          onClick={() => setIsDayOpen(true)}
        />
      </div>

      {/* 피커 모달 */}
      <CustomPickerModal
        isOpen={isPlaceOpen}
        onClose={() => setIsPlaceOpen(false)}
        title="장소"
        options={filteredPlaces}
        value={selectedPlace}
        onSelect={(val) => onFilterChange(val, selectedDay)}
      />
      <CustomPickerModal
        isOpen={isDayOpen}
        onClose={() => setIsDayOpen(false)}
        title="요일"
        options={filteredDays}
        value={selectedDay}
        onSelect={(val) => onFilterChange(selectedPlace, val)}
      />
    </div>
  );
};

export default memo(BusyTimeGraph);
