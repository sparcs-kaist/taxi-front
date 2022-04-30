import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import RLayout from "../ReactiveLayout/RLayout";

const Button = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    paddingTop: "14px",
    paddingBottom: "13px",
    lineHeight: "19px",
    textAlign: "center",
    fontSize: "16px",
    color: props.fontColor,
    fontWeight: "bold",
    borderRadius: "12px",
    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
  };
  const background = useSpring({
    background: isHover ? props.backgroundHover : props.background,
    config: { duration: 100 },
  });

  const button = (
    <animated.div
      className="BTNC"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
      style={{ ...style, ...background }}
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
  fontColor: PropTypes.any,
  backgroundHover: PropTypes.any,
  background: PropTypes.any,
  onClick: PropTypes.func,
  children: PropTypes.any,
  marginAuto: PropTypes.any,
};

Button.defaultProps = {
  background: "#6E3678",
  backgroundHover: "#4E1658",
  fontColor: "white",
  marginAuto: true,
  onClick: () => {},
};
export default Button;
