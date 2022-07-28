import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router";
import "../Style/SideChatHeader.css";
import PropTypes from "prop-types";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const SideChatHeader = (props) => {
  return (
    <div className="SideChatHeaderContainer">
      <Link className="SideChatBackBtnContainer" to="/myroom">
        <IoMdArrowBack fontSize={16} color={"#ffffff"} />
      </Link>
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
