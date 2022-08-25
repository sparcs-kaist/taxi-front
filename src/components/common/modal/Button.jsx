import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <div
      style={{
        width: props.width,
        borderRadius: "12px",
        boxShadow: props.boxShadow,
        color: props.color,
        background: props.background,
        paddingTop: "10px",
        paddingBottom: "8px",
        lineHeight: "18px",
        textAlign: "center",
        fontSize: "15px",
        cursor: "pointer",
      }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string,
  boxShadow: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
};
Button.defaultProps = {
  onClick: () => {},
};

export default Button;
