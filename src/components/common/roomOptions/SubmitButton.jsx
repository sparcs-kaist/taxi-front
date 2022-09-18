import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import RLayout from "components/common/RLayout";
import { theme } from "styles/theme";

const Button = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    paddingTop: "14px",
    paddingBottom: "13px",
    lineHeight: "19px",
    textAlign: "center",
    fontSize: "16px",
    color: props.disabled ? theme.gray_text : props.textColor,
    fontWeight: "bold",
    borderRadius: "12px",
    boxShadow: theme.shadow,
  };
  const background = useSpring({
    background: props.disabled
      ? theme.gray_text
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
