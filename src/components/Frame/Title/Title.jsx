import React from "react";
import PropTypes from "prop-types";
import RLayout from "../ReactiveLayout/RLayout";

const Title = (props) => {
  const title = (
    <>
      <div style={{ height: props.paddingTop }} />
      <div
        style={{
          position: "relative",
        }}
      >
        <img
          src={props.img}
          style={{
            position: "absolute",
            top: "1px",
            left: "0px",
            width: "24px",
            height: "24px",
          }}
        />
        <div
          style={{
            marginLeft: "30px",
            lineHeight: "23px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#6E3678",
          }}
        >
          {props.children}
        </div>
      </div>
      <div style={{ height: props.paddingBottom }} />
    </>
  );

  if (props.marginAuto) {
    return <RLayout.R1>{title}</RLayout.R1>;
  }
  return title;
};

Title.propTypes = {
  img: PropTypes.any,
  children: PropTypes.any,
  marginAuto: PropTypes.bool,
  paddingTop: PropTypes.string,
  paddingBottom: PropTypes.string,
};
Title.defaultProps = {
  marginAuto: true,
  paddingTop: "10px",
  paddingBottom: "10px",
};

export default Title;
