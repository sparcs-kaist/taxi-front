import useHoverProps from "hooks/theme/useHoverProps";

import theme from "tools/theme";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";

type ToolButtonProps = {
  type: "image" | "settlement" | "payment";
  isVaild?: boolean;
  onClick?: () => void;
};

const ToolButton = ({ type, isVaild = true, onClick }: ToolButtonProps) => {
  const [hoverProps, isHover, isClicked] = useHoverProps();

  const style = { width: "72px" };
  const styleButton = {
    /* @fixme: button과 css 중복됨 */
    width: "48px",
    height: "48px",
    margin: "auto",
    borderRadius: "12px",
    background: isVaild
      ? isHover
        ? theme.purple_dark
        : theme.purple
      : theme.purple_disabled,
    transitionDuration: theme.duration,
    boxShadow: isClicked && isVaild ? theme.shadow_clicked : theme.shadow,
    ...theme.cursor(),
  };
  const styleIcon = {
    width: "32px",
    height: "32px",
    fill: "white",
    margin: "calc(50% - 16px)",
  };
  const styleText = {
    paddingTop: "8px",
    ...theme.font14,
    textAlign: "center" as any,
    color: theme.black,
    ...theme.cursor(),
  };
  const { icon, text } = {
    image: { icon: <ImageRoundedIcon style={styleIcon} />, text: "사진" },
    settlement: {
      icon: <AccountBalanceWalletRoundedIcon style={styleIcon} />,
      text: "정산하기",
    },
    payment: {
      icon: <LocalAtmRoundedIcon style={styleIcon} />,
      text: "송금하기",
    },
  }[type];
  return (
    <div css={style}>
      <div css={styleButton} {...hoverProps} onClick={onClick}>
        {icon}
      </div>
      <div css={styleText} onClick={onClick}>
        {text}
      </div>
    </div>
  );
};

export default ToolButton;
