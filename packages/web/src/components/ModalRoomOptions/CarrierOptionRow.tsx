import { memo } from "react";

import Button from "@/components/Button";

import theme from "@/tools/theme";

import LuggageIcon from "@mui/icons-material/Luggage";

type CarrierOptionRowProps = {
  value: boolean;
  handler: (newValue: boolean) => void;
};

const CarrierOptionRow = ({ value, handler }: CarrierOptionRowProps) => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 14px",
        backgroundColor: theme.gray_background,
        borderRadius: "12px",
        marginTop: "4px",
      }}
    >
      <div css={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <LuggageIcon css={{ fontSize: "20px", color: theme.gray_text }} />
        <div>
          <p css={{ ...theme.font14_bold, color: theme.black }}>캐리어 지참</p>
          <p css={{ ...theme.font12, color: theme.gray_text }}>
            큰 짐이 있으신가요?
          </p>
        </div>
      </div>

      <Button
        type={value ? "purple" : "gray"}
        css={{
          width: "72px",
          padding: "7px 0 6px",
          borderRadius: "8px",
          ...theme.font12_bold,
        }}
        onClick={() => handler(!value)}
      >
        {value ? "있음" : "없음"}
      </Button>
    </div>
  );
};

export default memo(CarrierOptionRow);
