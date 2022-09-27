import React from "react";
import { animated, useSpring } from "react-spring";
import RLayout from "components/common/RLayout";
import PropTypes from "prop-types";
import { theme } from "styles/theme";

import "./Popup.css";

const Popup = (props) => {
  const styleBgd = useSpring({
    position: "fixed",
    display: "flex",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: 50,
    background: theme.black_60,
    opacity: props.isOpen ? 1 : 0,
    pointerEvents: props.isOpen ? "auto" : "none",
  });
  const style = {
    overflow: "hidden",
    position: "relative",
    height: "100%",
    background: "white",
    borderRadius: "15px",
  };
  const styleBtnCancel = {
    height: "35px",
    lineHeight: "35px",
    width: "calc(35% - 10px)",
    background: "#EEEEEE",
    boxShadow: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075)",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "15px",
    color: "#888888",
  };
  const styleBtnSelect = {
    height: "35px",
    lineHeight: "35px",
    width: "65%",
    background: "#6E3678",
    boxShadow: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.25)",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: 500,
    color: "white",
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
          position: "relative",
          height: "266px",
          width: "100%",
          margin: "auto",
        }}
      >
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
        <RLayout.Popup>
          <div style={style} className="ND">
            <div style={{ height: "calc(100% - 45px)" }}>{props.children}</div>
            <div
              style={{
                height: "35px",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <div
                style={styleBtnCancel}
                className="BTNC"
                onClick={props.onClose}
              >
                취소
              </div>
              <div
                style={styleBtnSelect}
                className="BTNC"
                onClick={props.onClick}
              >
                선택하기
              </div>
            </div>
          </div>
        </RLayout.Popup>
      </div>
    </animated.div>
  );
};
Popup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

export default Popup;
