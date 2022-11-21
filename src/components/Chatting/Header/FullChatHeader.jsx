import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import HeaderBody from "./HeaderBody";
import PropTypes from "prop-types";
import theme from "styles/theme";
import DottedLine from "components/common/DottedLine";
import { useR2state } from "hooks/useReactiveState";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Header = (props) => {
  const bodyRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const history = useHistory();
  const reactiveState = useR2state();

  const styleBgd = {
    position: "fixed",
    top: "5px",
    width: "100%",
    height: "100%",
    background: theme.black_40,
    zIndex: theme.zIndex_background,
    pointerEvents: isOpen ? "auto" : "none",
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.3s",
  };
  const styleHeader = {
    position: "fixed",
    top: "5px",
    width: "100%",
    overflow: "hidden",
    background: theme.white,
    boxShadow: theme.shadow_3,
    zIndex: theme.zIndex_header,
    height: `${64 + (isOpen ? bodyHeight : 0)}px`,
    transition: "height 0.3s",
  };
  const styleHeaderTop = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    height: "100%",
    boxSizing: "border-box",
  };
  const styleIcon = {
    fontSize: "24px",
    fill: theme.purple,
    ...theme.cursor(),
  };
  const styleInfo = {
    width: "100%",
    rowGap: "5px",
    margin: "0 8px 0 16px",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  };
  const styleText = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  };

  const resizeEvent = () => {
    setBodyHeight(bodyRef.current?.clientHeight);
  };
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, [props.info]);

  return (
    <>
      <div style={styleBgd} onClick={() => setOpen(false)} />
      <div style={styleHeader}>
        <div style={styleHeaderTop}>
          <ArrowBackRoundedIcon
            style={styleIcon}
            onClick={() => history.goBack()}
          />
          <div style={styleInfo}>
            <div style={{ ...theme.font18, color: theme.purple, ...styleText }}>
              {props.info?.name}
            </div>
            <div
              style={{ ...theme.font12, color: theme.gray_text, ...styleText }}
            >
              {props?.info?.from?.koName}&nbsp; → &nbsp;
              {props?.info?.to?.koName}
            </div>
          </div>
          {reactiveState !== 3 && (
            <FullscreenExitRoundedIcon
              style={{ ...styleIcon, marginRight: "12px" }}
              onClick={() => history.replace(`/myroom/${props.info?._id}`)}
            />
          )}
          {isOpen ? (
            <CloseRoundedIcon
              style={styleIcon}
              onClick={() => setOpen(!isOpen)}
            />
          ) : (
            <MenuRoundedIcon
              style={styleIcon}
              onClick={() => setOpen(!isOpen)}
            />
          )}
        </div>
        <div style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.3s" }}>
          <DottedLine direction="row" margin="0 16px" />
        </div>
        <div ref={bodyRef} style={{ padding: "16px" }}>
          <HeaderBody info={props.info} recallEvent={props.recallEvent} />
        </div>
      </div>
    </>
  );
};
Header.propTypes = {
  info: PropTypes.any,
  recallEvent: PropTypes.func,
};

export default Header;
