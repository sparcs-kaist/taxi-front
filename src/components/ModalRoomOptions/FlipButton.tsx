import useHoverProps from "hooks/theme/useHoverProps";

import theme from "tools/theme";

import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";

type FlipButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const FlipButton = (props: FlipButtonProps) => {
  const [hoverProps, isHover, isClicked] = useHoverProps();

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
        ...theme.cursor(props.disabled),
        backgroundColor: props.disabled
          ? theme.purple_disabled
          : isHover
          ? theme.purple_dark
          : theme.purple,
        color: theme.white,
        boxShadow:
          isClicked && !props.disabled ? theme.shadow_clicked : theme.shadow,
      }}
      onClick={props.disabled ? undefined : props.onClick}
      {...hoverProps}
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
