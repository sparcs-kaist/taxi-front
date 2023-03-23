import { ReactElement, useState } from "react";

import hoverEventSet from "tools/hoverEventSet";
import theme from "tools/theme";

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import PortraitRoundedIcon from "@material-ui/icons/PortraitRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type MenuProps = {
  icon: string;
  onClick: () => void;
  children: ReactElement;
};

const getIcon = (icon: string) => {
  const styleIcon = {
    fontSize: "16px",
    marginRight: "8px",
  };
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
    case "logout":
      return <ExitToAppRoundedIcon style={styleIcon} />;
    case "beta":
      return <StarRoundedIcon style={styleIcon} />;
  }
};

const Menu = (props: MenuProps) => {
  const [isHover, setHover] = useState(false);
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
  return (
    <div
      style={style}
      onClick={() => props.onClick()}
      {...hoverEventSet(setHover)}
    >
      {getIcon(props.icon)}
      <div style={styleText}>{props.children}</div>
      {isHover && <KeyboardArrowLeftRoundedIcon style={{ fontSize: "16px" }} />}
    </div>
  );
};

export default Menu;
