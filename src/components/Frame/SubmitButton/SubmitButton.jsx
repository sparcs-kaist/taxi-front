import { useState } from "react";
import { useSpring, animated } from "react-spring";

const Button = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    minHeight: "50px",
    lineHeight: "50px",
    textAlign: "center",
    fontSize: "16px",
    color: props.fontColor,
    fontWeight: 300,
    borderRadius: "15px",
  };
  const background = useSpring({
    background: isHover ? props.backgroundHover : props.background,
    config: { duration: 100 },
  });

  return (
    <div className="lay_auto ND">
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

Button.defaultProps = {
  background: "#6E3678",
  backgroundHover: "white",
  fontColor: "white",
  onClick: () => {},
};
export default Button;
