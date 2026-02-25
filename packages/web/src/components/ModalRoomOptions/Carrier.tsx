import { memo } from "react";

import Button from "@/components/Button";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import LuggageIcon from "@mui/icons-material/Luggage";

/**
 * CarrierToggle 컴포넌트의 Props
 */
type CarrierToggleProps = {
  /** 현재 캐리어 소지 여부 (true: ON, false: OFF) */
  value: boolean;
  /** 값이 변경될 때 호출되는 함수 */
  handler: (newValue: boolean) => void;
};

/**
 * 캐리어 소지 여부를 선택하는 토글 컴포넌트
 */
const CarrierToggle = (props: CarrierToggleProps) => {
  const { value, handler } = props;

  const onClickToggle = () => {
    handler(!value);
  };

  return (
    <WhiteContainer css={{ padding: "9px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "36px",
        }}
      >
        {/* 아이콘과 텍스트 라벨 그룹 */}
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "13px" }}
        >
          <LuggageIcon style={{ fontSize: "18px", marginRight: "5px" }} />
          <div
            style={{
              ...theme.font14,
              marginRight: "8px",
              whiteSpace: "nowrap",
            }}
          >
            캐리어 소지 여부
          </div>
        </div>

        {/* 토글 ON/OFF 버튼 */}
        <Button
          type={value ? "purple" : "gray"}
          css={{
            width: "80px", // 기존과 동일한 너비
            padding: "8px 0 7px", // OptionMaxPeople의 Counter 버튼 높이와 비슷하게 조정
            borderRadius: "8px",
            ...theme.font14_bold, // 기존과 동일한 폰트 스타일
          }}
          onClick={onClickToggle}
        >
          {value ? "있음" : "없음"}
        </Button>
      </div>
    </WhiteContainer>
  );
};

export default memo(CarrierToggle);
