import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSpring, animated } from "react-spring";
import RLayout from "./ReactiveLayout/RLayout";
import "./Navigation.css";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import PropTypes from "prop-types";

const NavigationBtn = (props) => {
  const [isHover, setHover] = useState(false);
  const history = useHistory();
  const layStyle = {
    width: "25%",
    height: "100%",
  };
  const icon = {
    width: "19px",
    height: "19px",
    color: "currentColor",
  };
  const text = {
    lineHeight: "20px",
    textAlign: "center",
    fontSize: "8px",
    color: "#9B9B9B",
  };
  const textHover = useSpring({
    color: isHover || props.selected ? "#6E3678" : "#888888",
    config: { duration: 150 },
  });
  const iconHover = useSpring({
    color: isHover || props.selected ? "#6E3678" : "#888888",
    config: { duration: 150 },
  });
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={layStyle}
      onClick={() => history.push(props.to)}
    >
      <animated.div style={{ ...iconHover }}>{props.icon(icon)}</animated.div>
      <animated.div style={{ ...text, ...textHover }}>
        {props.name}
      </animated.div>
    </div>
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
            to="/setting"
            name="설정"
            icon={(style) => (
              <AccountCircleRoundedIcon style={style} alt="setting" />
            )}
            selected={props.selected === "setting"}
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
