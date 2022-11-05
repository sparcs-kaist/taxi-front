import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import RLayout from "components/common/RLayout";
import { theme } from "styles/theme";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

type PageType = "search" | "addroom" | "myroom" | "mypage";
type NavigationMenuProps = {
  text: string;
  page: PageType;
  path: string;
};

const NavigationMenu = (props: NavigationMenuProps) => {
  const [isHover, setHover] = useState(false);
  const selected = props.path.startsWith("/" + props.page);

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
    fontSize: "20px",
    marginTop: "10px",
    transition: `fill ${theme.duration}`,
    fill: styleColor,
  };
  const styleText = {
    marginTop: "4px",
    width: "fit-content",
    ...theme.font10_bold,
    transitionDuration: theme.duration,
    color: styleColor,
  };

  const getIcon = (type: PageType) => {
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
      to={props.page}
      style={styleBox}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {getIcon(props.page)}
      <div style={styleText}>{props.text}</div>
    </Link>
  );
};

const Navigation = () => {
  const path = useLocation().pathname;
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
        <div style={{ display: "flex", height: "56px" }}>
          <NavigationMenu text="검색" page="search" path={path} />
          <NavigationMenu text="방 개설" page="addroom" path={path} />
          <NavigationMenu text="내 방 목록" page="myroom" path={path} />
          <NavigationMenu text="마이 페이지" page="mypage" path={path} />
        </div>
      </RLayout.R1>
    </div>
  );
};

export default Navigation;
