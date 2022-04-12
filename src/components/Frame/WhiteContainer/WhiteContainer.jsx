import React, { Component } from "react";
import RLayout from "../ReactiveLayout/RLayout";
import PropTypes from "prop-types";

const WhiteContainer = (props) => {
  const box = (
    <div
      style={{
        marginBottom: props.marginBottom,
        boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: props.padding,
          background: "white",
        }}
      >
        {props.children}
      </div>
    </div>
  );

  if (props.marginAuto) {
    return <RLayout.R1>{box}</RLayout.R1>;
  }
  return box;
};

WhiteContainer.propTypes = {
  // FIXME specify type
  children: PropTypes.any,
  padding: PropTypes.any,
  marginAuto: PropTypes.bool,
  marginBottom: PropTypes.any,
};
WhiteContainer.defaultProps = {
  padding: "24px",
  marginBottom: "15px",
  marginAuto: true,
};

export default WhiteContainer;
