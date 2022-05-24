import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import RLayout from "components/Frame/ReactiveLayout/RLayout";
import "./Navigation.css";

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
  const icon = {
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
  return (
    <Link to={props.to} style={{ ...layStyle }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <animated.div style={{ ...icon, ...hover, marginTop: 8 }}>
          {props.icon(icon)}
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
    <div id="navigation" className="ND">
      <RLayout.R1 height="100%">
        <div style={{ display: "flex" }}>
          <NavigationBtn
            to="/search"
            name="검색"
            icon={(style) => <SearchRoundedIcon style={style} alt="search" />}
            selected={props.selected === "search"}
          />
          <NavigationBtn
            to="/addroom"
            name="방 개설"
            icon={(style) => (
              <LibraryAddRoundedIcon style={style} alt="addroom" />
            )}
            selected={props.selected === "addroom"}
          />
          <NavigationBtn
            to="/myroom"
            name="내 방"
            icon={(style) => (
              <LibraryBooksRoundedIcon style={style} alt="myroom" />
            )}
            selected={props.selected === "myroom"}
          />
          <NavigationBtn
            to="/mypage"
            name="마이 페이지"
            icon={(style) => (
              <AccountCircleRoundedIcon style={style} alt="mypage" />
            )}
            selected={props.selected === "mypage"}
          />
        </div>
      </RLayout.R1>
    </div>
  );
};

Navigation.propTypes = {
  selected: PropTypes.string,
};

export default Navigation;
