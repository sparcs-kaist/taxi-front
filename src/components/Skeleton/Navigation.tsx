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
};

const NavigationMenu = ({ text, page }: NavigationMenuProps) => {
  const [isHover, setHover] = useState(false);
  const { pathname } = useLocation();
  const isSelected =
    pathname.startsWith("/" + page) ||
    (page.startsWith("home") && pathname === "/");

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
    : isSelected
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
    [isHover, isSelected]
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
    <Link to={"/" + page} css={styleBox} {...hoverEventSet(setHover)}>
      {getIcon(page)}
      <div css={styleText}>{text}</div>
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
  const isVKDetected = useRecoilValue(isVirtualKeyboardDetectedAtom);

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
        <NavigationMenu text={t("home_for_nav", { ns: "home" })} page="home" />
        <NavigationMenu
          text={t("search_room_for_nav", { ns: "search" })}
          page="search"
        />
        <NavigationMenu
          text={t("add_room_for_nav", { ns: "addroom" })}
          page="addroom"
        />
        <NavigationMenu
          text={t("my_room_for_nav", { ns: "myroom" })}
          page="myroom"
        />
        <NavigationMenu
          text={t("my_page_for_nav", { ns: "mypage" })}
          page="mypage"
        />
      </div>
    </div>
  );
};

export default Navigation;
