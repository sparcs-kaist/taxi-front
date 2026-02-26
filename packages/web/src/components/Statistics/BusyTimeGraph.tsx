import { SetStateAction, memo, useState } from "react";

// 피커 컴포넌트 경로 확인 필요
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Picker from "@/components/ModalRoomOptions/Picker";

import theme from "@/tools/theme";

const FilterElement = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: () => void;
}) => {
  return (
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
};

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
              ...theme.font14, // 취소 버튼은 일반 폰트
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
              ...theme.font14_bold, // 선택하기 버튼은 볼드 폰트
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

// --- 메인 BusyTimeGraph 컴포넌트 ---
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
      {/* 그래프 영역 (기존 로직 동일) */}
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
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              css={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
                cursor: "pointer",
              }}
            >
              {/* 툴팁 및 바 그래프 */}
              <div
                css={{
                  position: "absolute",
                  bottom: `calc(${heightPercentage}% + 30px)`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: theme.purple,
                  color: theme.white,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "all 0.2s",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                {Math.round(item.value)}개
              </div>
              <div
                css={{
                  width: "100%",
                  height: `${Math.max(heightPercentage, 0)}%`,
                  backgroundColor: isHighlight ? "#7B2C83" : "#A9A0B6",
                  borderRadius: "4px",
                }}
              />
              <div
                css={{
                  fontSize: "10px",
                  color: theme.gray_text,
                  textAlign: "center",
                  marginTop: "6px",
                }}
              >
                {parseInt(item.time) % 3 === 0
                  ? item.time.replace("시", "")
                  : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* 텍스트 안내 영역 */}
      <div css={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          css={{
            fontSize: "18px",
            fontWeight: 800,
            color: theme.purple,
            marginBottom: "8px",
          }}
        >
          {selectedDay}요일, {selectedPlace}의<br />
          시간대별 택시 동승
        </div>
        <div css={{ fontSize: "12px", color: theme.gray_text }}>
          과거 30일을 기반으로 조회합니다.
        </div>
      </div>

      {/* ✨ 교체된 커스텀 필터 선택 영역 */}
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

      {/* 모달 피커들 */}
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
