import type { CSSProperties } from "react";

import theme from "@/tools/theme";

import Tooltip from "@mui/material/Tooltip";

type ToolTipProps = {
  text: string;
  /** 트리거(물음표 원)에 적용. 기본 스타일 위에 병합됩니다. */
  style?: CSSProperties;
};

const defaultTriggerStyle: CSSProperties = {
  ...theme.font16_bold,
  lineHeight: "21px",
  fontWeight: 700,
  color: theme.purple,
  backgroundColor: theme.white,
  boxShadow: theme.shadow,
  textAlign: "center",
  width: "24px",
  height: "24px",
  margin: "8px auto",
  borderRadius: "50%",
  boxSizing: "border-box",
  border: `2px solid ${theme.purple}`,
};

const ToolTip = (props: ToolTipProps) => {
  return (
    <Tooltip
      title={props.text}
      componentsProps={{
        tooltip: {
          sx: {
            ...theme.font12,
            color: theme.black,
            padding: "8px 10px 7px",
            marginTop: "8px !important",
            maxWidth: "280px",
            width: "calc(100vw - 40px)",
            boxShadow: theme.shadow,
            backgroundColor: theme.white,
            textAlign: "center",
            whiteSpace: "normal",
            borderRadius: "12px",
            cursor: "default",
          },
        },
      }}
      enterTouchDelay={0}
      leaveTouchDelay={2000}
    >
      <div style={{ ...defaultTriggerStyle, ...props.style }}>?</div>
    </Tooltip>
  );
};

export default ToolTip;
