import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import RLayout from "components/common/RLayout";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import PropTypes from "prop-types";

const NavigationBtn = (props) => {
  const [isHover, setHover] = useState(false);
  const layStyle = {
    width: "25%",
    height: "100%",
    textDecoration: "unset",
  };
  const iconStyle = {
    height: 19,
    color: "currentColor",
  };
  const text = {
    fontSize: 8,
    lineHeight: "9px",
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    color: "#9B9B9B",
  };
  const hover = useSpring({
    color: isHover || props.selected ? "#6E3678" : "#888888",
    config: { duration: 150 },
    textAlign: "center",
  });
  const getIcon = (icon) => {
    switch (icon) {
      case "search":
        return <SearchRoundedIcon style={iconStyle} alt="search" />;
      case "add":
        return <LibraryAddRoundedIcon style={iconStyle} alt="search" />;
      case "myroom":
        return <LibraryBooksRoundedIcon style={iconStyle} alt="search" />;
      case "mypage":
        return <AccountCircleRoundedIcon style={iconStyle} alt="search" />;
      default:
        return <></>;
    }
  };

  return (
    <Link to={props.to} style={{ ...layStyle }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <animated.div style={{ ...iconStyle, ...hover, marginTop: 8 }}>
          {getIcon(props.icon)}
        </animated.div>
        <animated.div style={{ ...text, ...hover }}>{props.name}</animated.div>
      </div>
    </Link>
  );
};
NavigationBtn.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.any,
  selected: PropTypes.bool,
};

const Navigation = (props) => {
  return (
    <div
      id="navigation-body"
      className="ND"
      style={{
        position: "fixed",
        left: "0px",
        bottom: "0px",
        width: "100%",
        height: "50px",
        paddingBottom: "calc(env(safe-area-inset-bottom))",
        boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        zIndex: "30",
      }}
    >
      <RLayout.R1 height="100%">
        <div style={{ display: "flex" }}>
          <NavigationBtn
            to="/search"
            name="검색"
            icon="search"
            selected={props.path.startsWith("/search")}
          />
          <NavigationBtn
            to="/addroom"
            name="방 개설"
            icon="add"
            selected={props.path.startsWith("/addroom")}
          />
          <NavigationBtn
            to="/myroom"
            name="내 방"
            icon="myroom"
            selected={props.path.startsWith("/myroom")}
          />
          <NavigationBtn
            to="/mypage"
            name="마이 페이지"
            icon="mypage"
            selected={props.path.startsWith("/mypage")}
          />
        </div>
      </RLayout.R1>
    </div>
  );
};

Navigation.propTypes = {
  path: PropTypes.string,
};

export default Navigation;
