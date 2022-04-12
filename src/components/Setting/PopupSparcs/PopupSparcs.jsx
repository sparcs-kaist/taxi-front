import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import PropTypes from "prop-types";

import svgSparcs from "./svg_sparcs1.svg";
import svgClose from "./svg_close.svg";

const Member = (props) => {
  const style = {
    height: "68px",
    width: "145px",
    background: "#FAF8FB",
    position: "relative",
    borderRadius: "10px",
    border: "1px solid rgba(110, 54, 120, 0.05)",
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
  };
  const styleName = {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "14px",
    letterSpacing: "2px",
    color: "black",
    fontWeight: "bold",
  };

  return (
    <div style={style}>
      <div style={styleName}>{props.name}</div>
    </div>
  );
};
Member.propTypes = {
  name: PropTypes.string,
};

const PopupSparcs = (props) => {
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
    height: "100%",
    overflow: "hidden",
    background: "white",
    borderRadius: "15px",
  };
  const styleSparcs = {
    position: "absolute",
    top: "15px",
    left: "15px",
    width: "25px",
    height: "25px",
  };
  const styleTitle = {
    fontSize: "18px",
    fontWeight: "bold",
    paddingLeft: "44px",
    height: "25px",
    lineHeight: "25px",
  };
  const styleLine = {
    height: "1px",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "10px",
    backgroundImage:
      "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "15px 1px",
    backgroundRpeat: "repeat-x",
  };
  const styleClose = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "24px",
    height: "24px",
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
          bottom: "40px",
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
        <RLayout.R1 height="100%">
          <div style={style}>
            <img src={svgSparcs} alt="" style={styleSparcs} />
            <div style={{ height: "15px" }} />
            <div style={styleTitle}>만든 사람들</div>
            <img
              src={svgClose}
              alt="close"
              style={styleClose}
              className="BTNC"
              onClick={props.onClose}
            />
            <div style={styleLine} />
            <div
              style={{
                margin: "15px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <Member name="이채영" />
              <Member name="최준영" />
              <Member name="최지헌" />
            </div>
          </div>
        </RLayout.R1>
      </div>
    </animated.div>
  );
};
PopupSparcs.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PopupSparcs;
