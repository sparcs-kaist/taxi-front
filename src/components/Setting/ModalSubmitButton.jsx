import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

const baseStyle = {
  minHeight: "50px",
  lineHeight: "50px",
  textAlign: "center",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "15px",
  letterSpacing: "0.05em",
  fontColor: "white",
  backgroundColor: "#6E3678",
};

const ModalSubmitButton = ({ backgroundHover, style, onClick, children }) => {
  const [isHover, setHover] = useState(false);

  const integratedStyle = {
    ...baseStyle,
    ...style,
  };

  const backgroundAnimated = useSpring({
    background: isHover ? backgroundHover : integratedStyle.backgroundColor,
    config: { duration: 100 },
  });

  return (
    <animated.div
      className="BTNC"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ ...integratedStyle, ...backgroundAnimated }}
    >
      {children}
    </animated.div>
  );
};

ModalSubmitButton.propTypes = {
  // FIXME specify type
  backgroundHover: PropTypes.any,
  onClick: PropTypes.any,
  children: PropTypes.any,
  style: PropTypes.any,
};

ModalSubmitButton.defaultProps = {
  backgroundHover: "white",
};

export default ModalSubmitButton;
