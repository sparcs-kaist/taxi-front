import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import RLayout from "./ReactiveLayout/RLayout";
import "./Navigation.css";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import svgSearch from "./NavigationIcon/search.svg";
import svgAddroom from "./NavigationIcon/add.svg";
import svgMyroom from "./NavigationIcon/chat.svg";
import svgSetting from "./NavigationIcon/setting.svg";
import svgSearchSelected from "./NavigationIcon/search_selected.svg";
import svgAddroomSelected from "./NavigationIcon/add_selected.svg";
import svgMyroomSelected from "./NavigationIcon/chat_selected.svg";
import svgSettingSelected from "./NavigationIcon/setting_selected.svg";
import PropTypes from "prop-types";

const NavigationBtn = (props) => {
  const [isHover, setHover] = useState(false);
  const layStyle = {
    float: "left",
    position: "relative",
    width: "25%",
    height: "100%",
  };
  const imgStyle = {
    position: "absolute",
    top: "9px",
    left: "calc(50% - 11px)",
    width: "19px",
    height: "19px",
  };
  const txtStyle = {
    position: "absolute",
    top: "36px",
    left: "0px",
    width: "100%",
    linHeight: "20px",
    textAlign: "center",
    fontSize: "8px",
    color: "#9B9B9B",
  };
  const config = { duration: 150 };
  const springIcon1 = useSpring({
    opacity: props.selected || isHover ? 0 : 1,
    config: config,
  });
  const springIcon2 = useSpring({
    opacity: props.selected || isHover ? 1 : 0,
    config: config,
  });
  const springTxt = useSpring({
    color: props.selected || isHover ? "#663D71" : "#9B9B9B",
  });
  return (
    <Link to={props.to}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={layStyle}
      >
        <animated.div style={{ ...imgStyle, ...springIcon1 }}>
          {props.icon}
        </animated.div>
        <animated.div style={{ ...imgStyle, ...springIcon2 }}>
          {props.icon2}
        </animated.div>
        <animated.div style={{ ...txtStyle, ...springTxt }}>
          {props.name}
        </animated.div>
      </div>
    </Link>
  );
};
NavigationBtn.propTypes = {
  selected: PropTypes.bool,
  to: PropTypes.string,
  icon: PropTypes.any,
  icon2: PropTypes.any,
  name: PropTypes.string,
};

const Navigation = (props) => {
  return (
    <div id="navigation" className="ND">
      <RLayout.R1 height="100%">
        <NavigationBtn
          to="/search"
          name="검색"
          icon={<img src={svgSearch} alt="search" />}
          icon2={<img src={svgSearchSelected} alt="search" />}
          selected={props.selected === "search"}
        />
        <NavigationBtn
          to="/addroom"
          name="방 개설"
          icon={<img src={svgAddroom} alt="addroom" />}
          icon2={<img src={svgAddroomSelected} alt="addroom" />}
          selected={props.selected === "addroom"}
        />
        <NavigationBtn
          to="/myroom"
          name="내 방"
          icon={<img src={svgMyroom} alt="myroom" />}
          icon2={<img src={svgMyroomSelected} alt="myroom" />}
          selected={props.selected === "myroom"}
        />
        <NavigationBtn
          to="/setting"
          name="설정"
          icon={<img src={svgSetting} alt="setting" />}
          icon2={<img src={svgSettingSelected} alt="setting" />}
          selected={props.selected === "setting"}
        />
      </RLayout.R1>
    </div>
  );
};

Navigation.propTypes = {
  selected: PropTypes.string,
};

export default Navigation;
