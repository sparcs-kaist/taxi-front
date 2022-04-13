import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

import svgArrow from "./svg_arrow.svg";

const Room = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    position: "relative",
    background: "#FAF8FB",
    overflow: "hidden",
    borderRadius: "12px",
    boxShadow:
      isHover || props.selected
        ? "0px 2px 4px rgba(110, 54, 120, 0.2), 0px 1px 18px rgba(110, 54, 120, 0.12), 0px 6px 10px rgba(110, 54, 120, 0.14)"
        : "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
  };
  const styleName = {
    height: "39px",
    lineHeight: "39px",
    fontSize: "12px",
    paddingLeft: "18px",
    paddingRight: "18px",
  };
  const styleLine = {
    height: "1px",
    marginLeft: "12px",
    marginRight: "12px",
    backgroundImage:
      "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "15px 1px",
    backgroundRpeat: "repeat-x",
  };
  const styleLay1 = {
    height: "16px",
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  };
  const styleLay1Place = {
    height: "16px",
    lineHeight: "16px",
    width: "calc(50% - 13px)",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
  };
  const styleArrow = {
    height: "15px",
    width: "16px",
  };
  const styleDate = {
    marginTop: "13px",
    marginBottom: "13px",
    height: "14px",
    lineHeight: "14px",
    textAlign: "center",
    fontSize: "12px",
    color: "#6E3678",
  };
  const styleSelected = useSpring({
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "8px",
    height: "100%",
    background: "#6E3678",
    opacity: props.selected ? 1 : 0,
    config: { duration: 100 },
  });

  return (
    <div
      style={style}
      className="BTNC"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
    >
      <div style={styleName}>{props.name}</div>
      <div style={styleLine} />
      <div style={styleLay1}>
        <div style={styleLay1Place}>{props.origin}</div>
        <img src={svgArrow} style={styleArrow} alt="->" />
        <div style={styleLay1Place}>{props.destination}</div>
      </div>
      <div style={styleDate}>2021년 7월 20일 오전 9시 00분</div>
      <animated.div style={styleSelected} />
    </div>
  );
};
Room.propTypes = {
  name: PropTypes.string,
  left: PropTypes.number,
  creator: PropTypes.string,
  origin: PropTypes.string,
  destination: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
Room.defaultProps = {
  seleted: false,
  onClick: () => {},
};

export default Room;
