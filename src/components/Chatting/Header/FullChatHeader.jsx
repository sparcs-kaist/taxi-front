import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router";
import HeaderBody from "./HeaderBody";
import PropTypes from "prop-types";
import { theme } from "styles/theme";
import DottedLine from "components/common/DottedLine";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const BtnBack = () => {
  const [isHover, setHover] = useState(false);
  const history = useHistory();
  const style = useSpring({
    position: "absolute",
    top: "17px",
    left: "10px",
    width: "40px",
    height: "40px",
    borderRadius: "20px",
    background: `rgba(0,0,0,${isHover ? 0.05 : 0})`,
    config: { duration: 100 },
    cursor: theme.cursor(),
  });
  const styleImg = {
    position: "absolute",
    top: "calc(50% - 12px)",
    left: "calc(50% - 12px)",
    width: "24px",
    height: "24px",
    fill: theme.purple,
  };

  return (
    <animated.div
      style={style}
      onClick={() => history.goBack()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ArrowBackRoundedIcon style={styleImg} />
    </animated.div>
  );
};

const BtnMenu = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    position: "absolute",
    top: "17px",
    right: "10px",
    width: "40px",
    height: "40px",
    borderRadius: "20px",
    background: `rgba(0,0,0,${isHover ? 0.05 : 0})`,
    config: { duration: 100 },
    cursor: theme.cursor(),
  });
  const styleImg = {
    position: "absolute",
    top: "calc(50% - 12px)",
    left: "calc(50% - 12px)",
    width: "24px",
    height: "24px",
    fill: theme.purple,
  };

  return (
    <animated.div
      style={style}
      onClick={props.onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.token ? (
        <CloseRoundedIcon style={styleImg} />
      ) : (
        <MenuRoundedIcon style={styleImg} />
      )}
    </animated.div>
  );
};
BtnMenu.propTypes = {
  onClick: PropTypes.func,
  token: PropTypes.bool,
};

const Header = (props) => {
  const bodyRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);

  const style = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: `${70 + (isOpen ? bodyHeight : 0)}px`,
    background: "white",
    overflow: "hidden",
    boxShadow: "0px 0px 12px rgba(0,0,0,0.1)",
    zIndex: theme.zIndex_header,
  });
  const styleLine = {
    width: "100%",
    height: "5px",
    background: "rgb(102,61,113)",
  };
  const styleBgd = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    background: `rgba(0,0,0,${isOpen ? 0.6 : 0})`,
    pointerEvents: isOpen ? "auto" : "none",
    zIndex: theme.zIndex_background,
  });

  const resizeEvent = () => {
    setBodyHeight(bodyRef.current.clientHeight);
  };
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);
  useEffect(() => {
    resizeEvent();
  }, [props.info]);

  return (
    <div>
      <animated.div style={styleBgd} onClick={() => setOpen(false)} />
      <animated.div style={style}>
        <div style={{ position: "relative", height: "70px" }}>
          <div
            style={{
              position: "absolute",
              top: "5px",
              left: "60px",
              right: "60px",
              height: "65px",
              overflow: "hidden",
            }}
          >
            <div style={{ height: "12px" }} />
            <div
              style={{
                height: "21px",
                lineHeight: "21px",
                color: "#6E3678",
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              {props.info?.name}
            </div>
            <div style={{ height: "5px" }} />
            <div
              style={{
                height: "14px",
                lineHeight: "14px",
                color: "#888888",
                fontSize: "12px",
              }}
            >
              {props?.info?.from?.koName} → {props?.info?.to?.koName}
            </div>
          </div>
          <div style={styleLine} />
          <BtnBack info={props.info} />
          <BtnMenu token={isOpen} onClick={() => setOpen(!isOpen)} />
        </div>
        <DottedLine direction="row" margin="0 12px" />
        <div ref={bodyRef}>
          <div
            style={{
              padding: "18px",
              paddingBottom: "16px",
            }}
          >
            <HeaderBody info={props.info} recallEvent={props.recallEvent} />
          </div>
        </div>
      </animated.div>
    </div>
  );
};
Header.propTypes = {
  info: PropTypes.any,
  recallEvent: PropTypes.func,
};

export default Header;
