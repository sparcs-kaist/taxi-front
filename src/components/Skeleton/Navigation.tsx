import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import isVirtualKeyboardDetectedAtom from "atoms/isVirtualKeyboardDetected";
import { useRecoilValue } from "recoil";

import hoverEventSet from "tools/hoverEventSet";
import theme from "tools/theme";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import RoofingRoundedIcon from "@mui/icons-material/RoofingRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";

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

  const styleBox = {
    width: "25%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column" as any,
    textDecoration: "unset",
  };
  const styleColor = isHover
    ? theme.purple_dark
    : selected
    ? theme.purple
    : theme.gray_text;
  const styleText = {
    marginTop: "4px",
    width: "fit-content",
    ...theme.font10_bold,
    transitionDuration: theme.duration,
    color: styleColor,
  };
  const styleIcon = useMemo(
    () => ({
      fontSize: "20px",
      marginTop: "10px",
      transition: `fill ${theme.duration}`,
      fill: styleColor,
    }),
    [isHover, selected]
  );

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
    <Link to={"/" + props.page} css={styleBox} {...hoverEventSet(setHover)}>
      {getIcon(props.page)}
      <div css={styleText}>{props.text}</div>
    </Link>
  );
};

const Navigation = () => {
  const { t } = useTranslation([
    "home",
    "search",
    "addroom",
    "myroom",
    "mypage",
  ]);
  const location = useLocation();
  const isVKDetected = useRecoilValue(isVirtualKeyboardDetectedAtom);
  const { pathname } = location;

  return (
    <div
      id="navigation-body"
      css={{
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
        css={{
          width: "min(430px, 100%)",
          margin: "auto",
          display: "flex",
          height: "56px",
        }}
      >
        <NavigationMenu
          text={t("home_for_nav", { ns: "home" })}
          page="home"
          path={pathname}
        />
        <NavigationMenu
          text={t("search_room_for_nav", { ns: "search" })}
          page="search"
          path={pathname}
        />
        <NavigationMenu
          text={t("add_room_for_nav", { ns: "addroom" })}
          page="addroom"
          path={pathname}
        />
        <NavigationMenu
          text={t("my_room_for_nav", { ns: "myroom" })}
          page="myroom"
          path={pathname}
        />
        <NavigationMenu
          text={t("my_page_for_nav", { ns: "mypage" })}
          page="mypage"
          path={pathname}
        />
      </div>
    </div>
  );
};

export default Navigation;
