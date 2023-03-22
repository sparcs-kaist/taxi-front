import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import hoverEventSet from "tools/hoverEventSet";
import theme from "tools/theme";

import { useRecoilValue } from "recoil";
import isVirtualKeyboardDetectedAtom from "atoms/isVirtualKeyboardDetected";

import RoofingRoundedIcon from "@mui/icons-material/RoofingRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

type PageType = "home" | "search" | "addroom" | "myroom" | "mypage";
type NavigationMenuProps = {
  text: string;
  page: PageType;
  path: string;
};

const NavigationMenu = (props: NavigationMenuProps) => {
  const [isHover, setHover] = useState(false);
  const selected =
    props.path.startsWith("/" + props.page) ||
    (props.page.startsWith("home") && props.path === "/");

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
      case "home":
        return <RoofingRoundedIcon style={styleIcon} />;
      case "search":
        return <SearchRoundedIcon style={styleIcon} />;
      case "addroom":
        return <AddRoundedIcon style={styleIcon} />;
      case "myroom":
        return <SubjectRoundedIcon style={styleIcon} />;
      case "mypage":
        return <PersonOutlineRoundedIcon style={styleIcon} />;
    }
  };

  return (
    <Link to={"/" + props.page} style={styleBox} {...hoverEventSet(setHover)}>
      {getIcon(props.page)}
      <div style={styleText}>{props.text}</div>
    </Link>
  );
};

const Navigation = () => {
  const location = useLocation();
  const isVKDetected = useRecoilValue(isVirtualKeyboardDetectedAtom);
  const { pathname } = location;

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
        display: isVKDetected ? "none" : "block",
      }}
    >
      <div
        style={{
          width: "min(430px, 100%)",
          margin: "auto",
          display: "flex",
          height: "56px",
        }}
      >
        <NavigationMenu text="홈" page="home" path={pathname} />
        <NavigationMenu text="검색" page="search" path={pathname} />
        <NavigationMenu text="개설" page="addroom" path={pathname} />
        <NavigationMenu text="내 방" page="myroom" path={pathname} />
        <NavigationMenu text="마이" page="mypage" path={pathname} />
      </div>
    </div>
  );
};

export default Navigation;
