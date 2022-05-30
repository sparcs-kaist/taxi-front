import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import { date2str } from "../../Tool/trans";
import "./RoomElement.css";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

const Room = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    position: "relative",
    background: props.mobile ? "white" : "#FAF8FB",
    overflow: "hidden",
    borderRadius: "12px",
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    boxShadow:
      isHover || props.selected
        ? "0px 2px 4px rgba(110, 54, 120, 0.2), 0px 1px 18px rgba(110, 54, 120, 0.12), 0px 6px 10px rgba(110, 54, 120, 0.14)"
        : "",
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
      className="BTNC container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
    >
      <div style={styleName}>{props.name}</div>
      <div style={styleLine} />
      <div style={styleLay1}>
        <div style={styleLay1Place}>{props.origin}</div>
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <div style={styleLay1Place}>{props.destination}</div>
      </div>
      <div style={styleDate}>{date2str(props.date)}</div>
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
  date: PropTypes.any,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  mobile: PropTypes.bool,
};
Room.defaultProps = {
  seleted: false,
  onClick: () => {},
  marginTop: "0px",
  marginBottom: "0px",
  mobile: false,
};

export default Room;
