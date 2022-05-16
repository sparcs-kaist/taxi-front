import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import PropTypes from "prop-types";

import SparcsLogoBlack from "../../../asset/SparcsLogoBlack.svg";
import SparcsLogoYellow from "../../../asset/SparcsLogoYellow.svg";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Member = (props) => {
  const style = {
    height: "68px",
    width: "145px",
    background: "#FAF8FB",
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
  };
  const styleLay1 = {
    position: "absolute",
    top: "16px",
    left: "14px",
    height: "16px",
  };
  const styleName = {
    display: "inline-block",
    height: "16px",
    lineHeight: "16px",
    fontSize: "14px",
    letterSpacing: "2px",
    color: "#323232",
    fontWeight: "bold",
  };
  const styleSparcs = {
    height: "17px",
    paddingLeft: "8px",
    paddingRight: "4px",
  };
  const styleId = {
    display: "inline-block",
    height: "16px",
    lineHeight: "16px",
    fontSize: "12px",
    color: "#F2A024",
    fontWeight: "bold",
  };
  const styleDes = {
    position: "absolute",
    bottom: "14px",
    left: "14px",
    color: "#888888",
    fontSize: "10px",
  };

  return (
    <div style={style}>
      <div style={styleLay1}>
        <span style={styleName}>{props.name}</span>
        <img style={styleSparcs} src={SparcsLogoYellow} alt="sparcs" />
        <span style={styleId}>{props.id}</span>
      </div>
      <div style={styleDes}>{props.des}</div>
    </div>
  );
};
Member.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  des: PropTypes.string,
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
  const styleRole = {
    fontSize: "14px",
    fontWeight: "bold",
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "15px",
    paddingBottom: "10px",
  };
  const styleMemberContainer = {
    paddingLeft: "15px",
    paddingRight: "15px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
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
            <img src={SparcsLogoBlack} alt="" style={styleSparcs} />
            <div style={{ height: "15px" }} />
            <div style={styleTitle}>만든 사람들</div>
            <CloseRoundedIcon style={styleClose} onClick={props.onClose} />
            <div style={styleLine} />
            <div style={{ overflow: "auto", height: "calc(100% - 51px)" }}>
              <div style={styleRole}>Project Manager</div>
              <div style={styleMemberContainer}>
                <Member name="김건" id="suwon" des="2022" />
                <Member name="이채영" id="stitch" des="2021" />
              </div>

              <div style={styleRole}>Designer</div>
              <div style={styleMemberContainer}>
                <Member name="최지헌" id="agent" des="2021 - 2022" />
                <Member name="이혜원" id="chillo" des="2021" />
              </div>

              <div style={styleRole}>Developer</div>
              <div style={styleMemberContainer}>
                <Member name="정상" id="macintosh" des="2021 - 2022" />
                <Member name="김태우" id="toby" des="2021 - 2022" />
                <Member name="최준영" id="dogma" des="2021" />
                <Member name="최지헌" id="agent" des="2022" />
                <Member name="이서완" id="swany" des="2022" />
                <Member name="박진호" id="bread" des="2021" />
                <Member name="송인화" id="ina" des="2021" />
                <Member name="김건" id="suwon" des="2021 - 2022" />
                <Member name="이채영" id="stitch" des="2021" />
                <Member name="예상우" id="andy" des="2022" />
                <Member name="신태현" id="kiko" des="2022" />
              </div>
              <div style={{ height: "40px" }} />
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
