import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

const Button = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    minHeight: "50px",
    lineHeight: "50px",
    textAlign: "center",
    fontSize: "16px",
    color: props.fontColor,
    fontWeight: "bold",
    borderRadius: "15px",
    letterSpacing: "0.05em",
  };
  const background = useSpring({
    background: isHover ? props.backgroundHover : props.background,
    config: { duration: 100 },
  });

  return (
    <div className={props.className}>
      <animated.div
        className="BTNC"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={props.onClick}
        style={{ ...style, ...background }}
      >
        {props.children}
      </animated.div>
    </div>
  );
};

Button.propTypes = {
  // FIXME specify type
  fontColor: PropTypes.any,
  backgroundHover: PropTypes.any,
  background: PropTypes.any,
  onClick: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.any,
};

Button.defaultProps = {
  background: "#6E3678",
  backgroundHover: "white",
  fontColor: "white",
  onClick: () => {},
};
export default Button;
