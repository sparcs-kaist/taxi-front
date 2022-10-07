import React from "react";
import RLayout from "components/common/RLayout";
import PropTypes from "prop-types";
import { theme } from "styles/theme";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Modal = (props) => {
  const styleBgd = {
    position: "fixed",
    display: "flex",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: theme.zIndex_modal,
    background: theme.black_60,
    opacity: props.display ? 1 : 0,
    transitionDuration: theme.duration,
    pointerEvents: props.display ? "auto" : "none",
  };
  const styleBtn = {
    color: theme.gray_text,
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "24px",
    cursor: "pointer",
  };
  return (
    <div style={styleBgd} onClick={props.onClickClose}>
      <RLayout.Popup width={props.width}>
        <div
          style={{
            position: "relative",
            background: theme.white,
            borderRadius: "15px",
            padding: props.padding,
          }}
        >
          {props.children}
          {props.btnCloseDisplay ? (
            <CloseRoundedIcon style={styleBtn} onClick={props.onClickClose} />
          ) : null}
        </div>
      </RLayout.Popup>
    </div>
  );
};

Modal.propTypes = {
  display: PropTypes.bool,
  onClickClose: PropTypes.func,
  width: PropTypes.number,
  padding: PropTypes.string,
  children: PropTypes.any,
  btnCloseDisplay: PropTypes.bool,
};
Modal.defaultProps = {
  onClickClose: () => {},
  width: 335,
  padding: "0px",
  btnCloseDisplay: false,
};

export default Modal;
