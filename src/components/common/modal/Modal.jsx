import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import RLayout from "components/common/RLayout";
import PropTypes from "prop-types";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ModalBackground = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
      }}
      onClick={props.onClick}
    />
  );
};
ModalBackground.propTypes = {
  onClick: PropTypes.func,
};

const BtnClose = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "24px",
        height: "24px",
      }}
      className="BTNC"
      onClick={props.onClick}
    >
      <CloseRoundedIcon style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
BtnClose.propTypes = {
  onClick: PropTypes.func,
};

const Modal = (props) => {
  const styleCont = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: 150,
    background: `rgba(0,0,0,0.6)`,
    opacity: props.display ? 1 : 0,
    pointerEvents: props.display ? "auto" : "none",
  });
  return (
    <animated.div style={styleCont}>
      <ModalBackground onClick={props.onClickClose} />
      <div
        style={{
          position: "absolute",
          top: props.top,
          bottom: props.bottom,
          left: "0px",
          right: "0px",
        }}
      >
        <ModalBackground onClick={props.onClickClose} />
        <RLayout.R1 height="100%">
          <ModalBackground onClick={props.onClickClose} />
          <div
            style={{
              position: "relative",
              maxWidth: props.maxWidth,
              margin: "auto",
              maxHeight: "100%",
              overflow: "hidden",
              background: "#FFFFFF",
              boxShadow: "0px 1px 7.5px 2px rgba(0, 0, 0, 0.05)",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                position: "relative",
                padding: props.padding,
              }}
            >
              {props.children}
            </div>
            {props.btnCloseDisplay ? (
              <BtnClose onClick={props.onClickClose} />
            ) : null}
          </div>
        </RLayout.R1>
      </div>
    </animated.div>
  );
};

Modal.propTypes = {
  display: PropTypes.bool,
  onClickClose: PropTypes.func,
  top: PropTypes.string,
  bottom: PropTypes.string,
  maxWidth: PropTypes.string,
  padding: PropTypes.padding,
  children: PropTypes.any,
  btnCloseDisplay: PropTypes.bool,
};
Modal.defaultProps = {
  onClickClose: () => {},
  top: "120px",
  bottom: "40px",
  maxWidth: "100%",
  padding: "0px",
  btnCloseDisplay: false,
};

export default Modal;
