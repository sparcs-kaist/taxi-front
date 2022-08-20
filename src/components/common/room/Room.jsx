import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import { date2str } from "tools/trans";
import "./RoomElement.css";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

const Room = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    position: "relative",
    background: props.theme === "purple" ? "#FAF8FB" : "white",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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

  const tagStyle = {
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
    borderRadius: "4px",
    background: props.theme == "purple" ? "#FFFFFF" : "#FAF8FB",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: "3.5px 5px 2.5px",
    gap: "3px",
    height: "18px",
    lineHeight: "18px",
    fontSize: "10px",
    margin: "3px",
  };

  const numLeftTag = (
    <div style={tagStyle}>
      <div>남은 인원: </div>
      <div style={{ color: "#6E3678", fontWeight: "400" }}>
        {props.data.maxPartLength - props.data.part?.length} 명
      </div>
    </div>
  );

  const isDoneTag = (
    <div style={tagStyle}>
      {props.data?.isOver ? (
        <div style={{ color: "#6E3678", fontWeight: "400" }}>정산 미완료</div>
      ) : (
        <div>정산완료</div>
      )}
    </div>
  );

  // TODO: 언어 선택에 따라 enName 반환
  const getLocationName = (location) => location?.koName;

  return (
    <div
      style={style}
      className="BTNC container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
    >
      <div style={styleName}>
        <div style={{ marginRight: "auto" }}>{props.data?.name}</div>
        {props.data.isDeparted ? isDoneTag : numLeftTag}
      </div>
      <div style={styleLine} />
      <div style={styleLay1}>
        <div style={styleLay1Place}>{getLocationName(props.data?.from)}</div>
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <div style={styleLay1Place}>{getLocationName(props.data?.to)}</div>
      </div>
      <div style={styleDate}>{date2str(props.data?.time)}</div>
      <animated.div style={styleSelected} />
    </div>
  );
};

Room.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  theme: PropTypes.string,
};

Room.defaultProps = {
  seleted: false,
  onClick: () => {},
  marginTop: "0px",
  marginBottom: "0px",
};

export default Room;
