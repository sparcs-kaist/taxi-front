import { ReactNode, useMemo } from "react";

import useHoverProps from "@/hooks/theme/useHoverProps";

import theme from "@/tools/theme";

import AlarmOffRoundedIcon from "@mui/icons-material/AlarmOffRounded";
import AlarmOnRoundedIcon from "@mui/icons-material/AlarmOnRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type MenuProps = {
  icon: string;
  onClick?: () => void;
  children: ReactNode;
};

const getIcon = (icon: string) => {
  const styleIcon = useMemo(
    () => ({
      fontSize: "16px",
      marginRight: "8px",
    }),
    []
  );
  switch (icon) {
    case "lang":
      return <LanguageRoundedIcon style={styleIcon} />;
    case "report":
      return <ErrorOutlineRoundedIcon style={styleIcon} />;
    case "ask":
      return <HelpOutlineRoundedIcon style={styleIcon} />;
    case "policy":
      return <AssignmentOutlinedIcon style={styleIcon} />;
    case "credit":
      return <PortraitRoundedIcon style={styleIcon} />;
    case "notification-on":
      return <AlarmOnRoundedIcon style={styleIcon} />;
    case "notification-off":
      return <AlarmOffRoundedIcon style={styleIcon} />;
    case "logout":
      return <ExitToAppRoundedIcon style={styleIcon} />;
    case "withdraw_account":
      return <DirectionsRunIcon style={styleIcon} />;
    case "beta":
      return <StarRoundedIcon style={styleIcon} />;
    case "notice":
      return <NotificationsOutlinedIcon style={styleIcon} />;
  }
};

const Menu = ({ icon, onClick, children }: MenuProps) => {
  const [hoverProps, isHover] = useHoverProps();

  const style = {
    display: "flex",
    alignItems: "flex-start",
    width: "fit-content",
    color: isHover ? theme.purple : undefined,
    ...theme.cursor(),
  };
  const styleText = {
    ...theme.font14,
    color: "inherit",
  };
  const styleIcon = useMemo(
    () => ({
      fontSize: "16px",
    }),
    []
  );

  return (
    <div css={style} onClick={onClick} {...hoverProps}>
      {getIcon(icon)}
      <div css={styleText}>{children}</div>
      {isHover && <KeyboardArrowLeftRoundedIcon style={styleIcon} />}
    </div>
  );
};

export default Menu;
