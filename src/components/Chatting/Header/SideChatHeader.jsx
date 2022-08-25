import React from "react";
import PropTypes from "prop-types";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const SideChatHeader = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "64px",
        overflow: "hidden",
        background: "#6E3678",
        boxShadow:
          "0px 3px 4px -2px rgba(110, 54, 120, 0.04), 0px 3px 3px -2px rgba(110, 54, 120, 0.02), 0px 1px 8px -2px rgba(110, 54, 120, 0.1)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "56px",
          height: "100%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          width: "56px",
          height: "100%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "56px",
          right: "56px",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            paddingTop: "12px",
            color: "#FFFFFF",
            height: "21px",
            lineHeight: "21px",
            overflow: "hidden",
          }}
        >
          {props.info?.name}
        </div>
        <div
          style={{
            fontSize: "11px",
            paddingTop: "5px",
            color: "#FFFFFF",
            height: "14px",
            lineHeight: "14px",
            overflow: "hidden",
          }}
        >
          {props?.info?.from?.koName} → {props?.info?.to?.koName}
        </div>
      </div>
    </div>
  );
};

SideChatHeader.propTypes = {
  info: PropTypes.object,
};
SideChatHeader.defaultProps = {
  info: {},
};

export default SideChatHeader;
