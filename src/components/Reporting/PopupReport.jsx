import React from "react";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";
import RLayout from "components/common/RLayout";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ProfileImg from "components/Mypage/ProfileImg";

const PopupReport = (props) => {
  const styleBgd = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: 50,
    background: `rgba(0,0,0,0.6)`,
    opacity: props.isOpen ? 1 : 0,
    pointerEvents: props.isOpen ? "auto" : "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const style = {
    height: "100%",
    overflow: "hidden",
    background: "white",
    borderRadius: "15px",
  };

  const styleClose = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "24px",
    height: "24px",
  };

  const styleProfImg = {
    position: "absolute",
    width: "50px",
    height: "50px",
    top: "16px",
    left: "24px",
  };

  const styleTitle = {
    position: "absolute",
    height: "20px",
    left: "26.46%",
    right: "63.08%",
    top: "32px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "17px",
    lineHeight: "20px",
    letterSpacing: "0.1em",
    color: "#323232",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "200px",
  };

  return (
    <animated.div style={styleBgd}>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
        }}
        onClick={props.onClose}
      />
      <div
        style={{
          position: "absolute",
          width: "325px",
          height: "174px",
        }}
      >
        <div style={style}>
          <CloseRoundedIcon style={styleClose} onClick={props.onClose} />
          <div style={styleTitle}>{props.name}</div>
          <div style={styleProfImg}>
            <ProfileImg path={props.path} />
          </div>
        </div>
      </div>
    </animated.div>
  );
};

PopupReport.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  path: PropTypes.string,
  name: PropTypes.string,
};

export default PopupReport;
