import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router";
import "../Style/SideChatHeader.css";
import PropTypes from "prop-types";
import svgBackWhite from "./svg_back_white.svg";

const BtnBack = (props) => {
  const history = useHistory();

  return (
    <div
      className="SideChatBackBtnContainer"
      onClick={() => history.goBack()}
    >
      <img src={svgBackWhite} alt="back" />
    </div>
  );
};

const SideChatHeader = (props) => {
  return (
    <div className="SideChatHeaderContainer">
      <BtnBack/>
      <div className="SideChatInfo">
        <div className="SideChatTitle">{props?.info?.name}</div>
        <div className="SideChatSubtitle">{`${props?.info?.from} → ${props?.info?.to}`}</div>
      </div>
    </div>
  );
};
SideChatHeader.propTypes = {
  info: PropTypes.any,
};

export default SideChatHeader;