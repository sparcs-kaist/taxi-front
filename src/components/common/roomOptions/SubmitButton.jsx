import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import RLayout from "components/common/RLayout";

const Button = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    paddingTop: "14px",
    paddingBottom: "13px",
    lineHeight: "19px",
    textAlign: "center",
    fontSize: "16px",
    color: props.disabled ? "#888888" : props.textColor,
    fontWeight: "bold",
    borderRadius: "12px",
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
  };
  const background = useSpring({
    background: props.disabled
      ? "#EEEEEE"
      : isHover
      ? props.backgroundHover
      : props.background,
    config: { duration: 150 },
  });

  const button = (
    <animated.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.disabled ? null : props.onClick}
      style={{
        ...style,
        ...background,
        cursor: props.disabled ? "not-allowed" : "pointer",
      }}
    >
      {props.children}
    </animated.div>
  );
  if (props.marginAuto) {
    return <RLayout.R1>{button}</RLayout.R1>;
  }
  return button;
};

Button.propTypes = {
  // FIXME specify type
  backgroundHover: PropTypes.any,
  background: PropTypes.any,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  marginAuto: PropTypes.any,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  background: "#6E3678",
  backgroundHover: "#572A5E",
  marginAuto: true,
  textColor: "white",
  onClick: () => {},
  disabled: true,
};
export default Button;
