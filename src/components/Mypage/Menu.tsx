import React, { useState } from "react";

import theme from "styles/theme";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import PortraitRoundedIcon from "@material-ui/icons/PortraitRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";

type MenuProps = {
  icon: string;
  onClick: () => void;
  children: React.ReactElement;
};

const getIcon = (icon: string) => {
  const styleIcon = {
    fontSize: "15px",
    marginRight: "8px",
  };
  switch (icon) {
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
  }
};

const Menu = (props: MenuProps) => {
  const [isHover, setHover] = useState(false);
  const style = {
    display: "flex",
    alignItems: "center",
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
      onClick={() => props.onClick()}
    >
      {getIcon(props.icon)}
      <div style={styleText}>{props.children}</div>
      {isHover && <KeyboardArrowLeftRoundedIcon style={{ fontSize: "15px" }} />}
    </div>
  );
};

export default Menu;
