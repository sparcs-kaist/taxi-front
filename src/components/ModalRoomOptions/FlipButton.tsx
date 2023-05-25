import { useState } from "react";

import hoverEventSet from "tools/hoverEventSet";
import theme from "tools/theme";

import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";

type FlipButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const FlipButton = (props: FlipButtonProps) => {
  const [isHover, setHover] = useState(false);
  const [isClicked, setClicked] = useState(false);

  return (
    <div
      css={{
        position: "absolute",
        width: "30px",
        height: "30px",
        top: "calc(50% - 15px)",
        right: "calc(50% - 15px)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: props.disabled
          ? theme.purple_disabled
          : isHover
          ? theme.purple_dark
          : theme.purple,
        color: theme.white,
        boxShadow:
          isClicked && !props.disabled ? theme.shadow_clicked : theme.shadow,
      }}
      onClick={props.onClick}
      {...hoverEventSet(setHover, setClicked)}
    >
      <SyncAltRoundedIcon
        style={{
          color: theme.white,
          fontSize: "20px",
        }}
      />
    </div>
  );
};

export default FlipButton;
