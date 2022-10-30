import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import HeaderBody from "./HeaderBody";
import PropTypes from "prop-types";
import { theme } from "styles/theme";
import DottedLine from "components/common/DottedLine";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Header = (props) => {
  const bodyRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const history = useHistory();

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
  };
  const styleIcon = {
    fontSize: "24px",
    fill: theme.purple,
    cursor: theme.cursor(),
  };
  const styleInfo = {
    width: "100%",
    rowGap: 5,
    marginLeft: 16,
    display: "flex",
    flexDirection: "column",
  };

  const resizeEvent = () => {
    setBodyHeight(bodyRef.current.clientHeight);
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
            <div style={{ ...theme.font18, color: theme.purple }}>
              {props.info?.name}
            </div>
            <div style={{ ...theme.font12, color: theme.gray_text }}>
              {props?.info?.from?.koName}&nbsp; → &nbsp;
              {props?.info?.to?.koName}
            </div>
          </div>
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
          <DottedLine direction="row" margin={16} />
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
