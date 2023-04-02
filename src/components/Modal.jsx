import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { useDelayBoolean } from "hooks/useDelay";
import useDisableScrollEffect from "hooks/useDisableScrollEffect";
import useKeyboardOperationEffect from "hooks/useKeyboardOperationEffect";

import RLayout from "components/RLayout";

import theme from "tools/theme";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Modal = (props) => {
  const [display, setDisplay] = useState(false);
  const shouldMount = useDelayBoolean(props.display, theme.duration_num);
  const modalRef = useRef(null);
  const clickRef = useRef(false);

  useDisableScrollEffect(props.display);
  useKeyboardOperationEffect({
    onEnter: props.display ? props?.onEnter : undefined,
    onEscape: props.display ? props.onClickClose : undefined,
  });
  useEffect(() => {
    setDisplay(shouldMount && props.display);
  }, [shouldMount, props.display]);

  const styleBgd = {
    position: "fixed",
    display: "flex",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: props.alert ? theme.zIndex_alert : theme.zIndex_modal,
    background: props.alert ? theme.black_40 : theme.black_60,
    opacity: display ? 1 : 0,
    transition: `opacity ${theme.duration} ease-in-out`,
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
  if (!shouldMount) return null;
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
          {props.closeBtn && (
            <CloseRoundedIcon style={styleBtn} onClick={props.onClickClose} />
          )}
        </div>
      </RLayout.Popup>
    </div>
  );
};

Modal.propTypes = {
  display: PropTypes.bool,
  closeBtn: PropTypes.bool,
  width: PropTypes.number,
  padding: PropTypes.string,
  alert: PropTypes.bool,
  children: PropTypes.any,
  onClickClose: PropTypes.func,
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
