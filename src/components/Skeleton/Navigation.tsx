import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import RLayout from "components/common/RLayout";
import { theme } from "styles/theme";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

type MenuType = "search" | "addroom" | "myroom" | "mypage";
type NavigationMenuProps = {
  text: string;
  icon: MenuType;
};

const NavigationMenu = (props: NavigationMenuProps) => {
  const [isHover, setHover] = useState(false);
  const selected = useLocation().pathname.startsWith("/" + props.icon);

  const styleBox: CSS = {
    width: "25%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textDecoration: "unset",
  };
  const styleColor = isHover
    ? theme.purple_dark
    : selected
    ? theme.purple
    : theme.gray_text;
  const styleIcon = {
    width: 20,
    height: 20,
    marginTop: 9.5,
    transition: `fill ${theme.duration}`,
    fill: styleColor,
  };
  const styleText = {
    marginTop: 4,
    width: "fit-content",
    ...theme.font10_bold,
    transitionDuration: theme.duration,
    color: styleColor,
  };

  const getIcon = (type: MenuType) => {
    switch (type) {
      case "search":
        return <SearchRoundedIcon style={styleIcon} />;
      case "addroom":
        return <LibraryAddRoundedIcon style={styleIcon} />;
      case "myroom":
        return <LibraryBooksRoundedIcon style={styleIcon} />;
      case "mypage":
        return <AccountCircleRoundedIcon style={styleIcon} />;
    }
  };

  return (
    <Link
      to={"/" + props.icon}
      style={styleBox}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {getIcon(props.icon)}
      <div style={styleText}>{props.text}</div>
    </Link>
  );
};

const Navigation = () => {
  return (
    <div
      id="navigation-body"
      style={{
        position: "fixed",
        left: "0px",
        bottom: "0px",
        width: "100%",
        height: "calc(56px + env(safe-area-inset-bottom))",
        boxShadow: theme.shadow_clicked,
        backgroundColor: theme.white,
        zIndex: theme.zIndex_nav,
      }}
    >
      <RLayout.R1 height="100%">
        <div style={{ display: "flex", height: "100%" }}>
          <NavigationMenu text="검색" icon="search" />
          <NavigationMenu text="방 개설" icon="addroom" />
          <NavigationMenu text="내 방 목록" icon="myroom" />
          <NavigationMenu text="마이 페이지" icon="mypage" />
        </div>
      </RLayout.R1>
    </div>
  );
};

export default Navigation;
