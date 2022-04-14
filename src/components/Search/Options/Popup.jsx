import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import PropTypes from "prop-types";

const Popup = (props) => {
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
  });
  const style = {
    overflow: "hidden",
    position: "relative",
    height: "100%",
    background: "white",
    borderRadius: "15px",
  };
  const styleBtnCancle = {
    height: "36px",
    lineHeight: "36px",
    width: "calc(30% - 10px)",
    background: "#EEEEEE",
    boxShadow: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075)",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "15px",
    color: "#888888",
  };
  const styleBtnSelect = {
    height: "36px",
    lineHeight: "36px",
    width: "70%",
    background: "#6E3678",
    boxShadow: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.25)",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "bold",
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
          position: "absolute",
          top: "120px",
          height: "262px",
          left: "0px",
          right: "0px",
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
        <RLayout.R1 height="100%" position="static">
          <div style={style} className="ND">
            <div style={{ height: "calc(100% - 46px)" }}>{props.children}</div>
            <div
              style={{
                height: "36px",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <div
                style={styleBtnCancle}
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
                선택 하기
              </div>
            </div>
          </div>
        </RLayout.R1>
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
