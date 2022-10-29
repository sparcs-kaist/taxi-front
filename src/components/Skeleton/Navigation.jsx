import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import RLayout from "components/common/RLayout";
import { theme } from "styles/theme";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import PropTypes from "prop-types";

const NavigationBtn = (props) => {
  const [isHover, setHover] = useState(false);
  const selected = useLocation().pathname.startsWith("/" + props.icon);

  const styleBox = {
    width: "25%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textDecoration: "unset",
  };
  const styleIcon = {
    width: 20,
    height: 20,
    marginTop: 10,
    transitionDuration: theme.duration,
    fill: isHover || selected ? theme.purple : theme.gray_text,
  };
  const styleText = {
    marginTop: 4,
    width: "fit-content",
    ...theme.font10_bold,
    transitionDuration: theme.duration,
    color: isHover || selected ? theme.purple : theme.gray_text,
  };

  const getIcon = (type) => {
    switch (type) {
      case "search":
        return <SearchRoundedIcon style={styleIcon} alt="search" />;
      case "addroom":
        return <LibraryAddRoundedIcon style={styleIcon} alt="addroom" />;
      case "myroom":
        return <LibraryBooksRoundedIcon style={styleIcon} alt="myroom" />;
      case "mypage":
        return <AccountCircleRoundedIcon style={styleIcon} alt="mypage" />;
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
      <div style={styleText}>{props.name}</div>
    </Link>
  );
};
NavigationBtn.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.any,
  selected: PropTypes.bool,
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
          <NavigationBtn name="검색" icon="search" />
          <NavigationBtn name="방 개설" icon="addroom" />
          <NavigationBtn name="내 방" icon="myroom" />
          <NavigationBtn name="마이 페이지" icon="mypage" />
        </div>
      </RLayout.R1>
    </div>
  );
};

export default Navigation;
