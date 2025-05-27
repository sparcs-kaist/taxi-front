import theme from "@/tools/theme";

import Tooltip from "@mui/material/Tooltip";

type ToolTipProps = {
  text: string;
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
      <div
        style={{
          ...theme.font12_bold,
          lineHeight: "13px",
          fontWeight: 1000,
          color: theme.purple,
          backgroundColor: theme.white,
          boxShadow: theme.shadow,
          textAlign: "center",
          width: "16px",
          height: "16px",
          margin: "8px auto",
          borderRadius: "50%",
          boxSizing: "border-box",
          border: `2px solid ${theme.purple}`,
        }}
      >
        ?
      </div>
    </Tooltip>
  );
};

export default ToolTip;
