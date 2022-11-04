import React from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import { theme } from "styles/theme";

import { IoArrowDown } from "react-icons/io5";

const NewMessage = (props) => {
  const style = useSpring({
    position: "absolute",
    top: props.show ? "0px" : "50px",
    left: "calc(50% - 55px)",
    width: "110px",
    height: "24px",
    borderRadius: "13px",
    background: "#FFFFFF",
    border: "0.5px solid #6E3678",
    boxShadow:
      "0px 2px 4px rgba(110, 54, 120, 0.2), 0px 1px 18px rgba(110, 54, 120, 0.12), 0px 6px 10px rgba(110, 54, 120, 0.14)",
    fontSize: "12px",
    lineHeight: "24px",
    color: "#6E3678",
    textAlign: "center",
    config: { duration: 200 },
    ...theme.cursor(),
  });
  return (
    <animated.div style={style} onClick={props.onClick}>
      <IoArrowDown style={{ verticalAlign: "middle", marginTop: "-1px" }} />
      &nbsp;새로운 메시지&nbsp;
    </animated.div>
  );
};

NewMessage.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
};
export default NewMessage;
