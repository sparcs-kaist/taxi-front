import { useState } from "react";

import hoverEventSet from "tools/hoverEventSet";
import theme from "tools/theme";

import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";

type FlipButtonProps = {
  onClick: () => void;
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
        boxShadow: isClicked ? theme.shadow_clicked : theme.shadow,
        backgroundColor: isHover ? theme.purple_dark : theme.purple,
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
