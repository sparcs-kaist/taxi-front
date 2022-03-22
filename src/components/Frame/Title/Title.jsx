import React from "react";
import PropTypes from "prop-types";

const Title = (props) => {
  return (
    <div
      className={props.unmargin ? "ND" : "lay_auto ND"}
      style={{
        position: "relative",
        paddingTop: "10px",
        paddingBottom: "10px",
        // maxWidth: "378px",
      }}
    >
      <img
        src={props.img}
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          width: "20px",
          height: "20px",
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
  );
};

Title.propTypes = {
  // FIXME specify type
  img: PropTypes.any,
  children: PropTypes.any,
  unmargin: PropTypes.any,
};

export default Title;
