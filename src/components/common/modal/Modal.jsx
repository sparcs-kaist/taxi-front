import React, { useRef } from "react";
import RLayout from "components/common/RLayout";
import PropTypes from "prop-types";
import useDisableScroll from "hooks/useDisableScroll";
import useKeyboardOperation from "hooks/useKeyboardOperation";
import theme from "styles/theme";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Modal = (props) => {
  useDisableScroll(props.display);
  useKeyboardOperation({
    display: props.display,
    onEnter: props?.onEnter,
    onEscape: props.onClickClose,
  });
  const modalRef = useRef(null);
  const clickRef = useRef(false);

  const styleBgd = {
    position: "fixed",
    display: "flex",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: props.alert ? theme.zIndex_alert : theme.zIndex_modal,
    background: props.alert ? theme.black_40 : theme.black_60,
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
    <div
      style={styleBgd}
      onMouseDown={(event) => {
        if (!modalRef.current.contains(event.target)) {
          clickRef.current = true;
        }
      }}
      onMouseUp={(event) => {
        if (clickRef.current && !modalRef.current.contains(event.target)) {
          props.onClickClose();
        }
        clickRef.current = false;
      }}
    >
      <RLayout.Popup width={props.width}>
        <div
          ref={modalRef}
          style={{
            position: "relative",
            background: theme.white,
            borderRadius: "15px",
            padding: props.padding,
            minHeight: "148px",
            maxHeight: "720px",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          {props.children}
          {props.closeBtn ? (
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
  closeBtn: PropTypes.bool,
  alert: PropTypes.bool,
  onEnter: PropTypes.func,
};
Modal.defaultProps = {
  onClickClose: () => {},
  width: 335,
  padding: "0px",
  closeBtn: true,
  alert: false,
};

export default Modal;
