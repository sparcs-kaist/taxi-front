import React from "react";
import { useR1state, useR2state, usePopupstate } from "hooks/useReactiveState";
import PropTypes from "prop-types";

const R1 = (props) => {
  const state = useR1state();
  return (
    <div
      style={{
        position: props.position,
        height: props.height,
        width: state === 1 ? "390px" : undefined,
        margin: state === 1 ? "auto" : "0 20px",
      }}
    >
      {props.children}
    </div>
  );
};
R1.propTypes = {
  position: PropTypes.string,
  children: PropTypes.any,
  height: PropTypes.any,
};
R1.defaultProps = {
  position: "relative",
};

const R2 = (props) => {
  const state = useR2state();
  if (state === 3 || !props.right) return <R1>{props.left}</R1>;

  const styleColumn = { width: state == 1 ? "390px" : "calc(50% - 27.5px)" };
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        justifyContent: "center",
      }}
    >
      <div style={styleColumn}>{props.left}</div>
      <div style={styleColumn}>{props.right}</div>
    </div>
  );
};
R2.propTypes = {
  left: PropTypes.any,
  right: PropTypes.any,
};
R2.defaultProps = {
  left: null,
  right: null,
};

const Popup = (props) => {
  const state = usePopupstate(props.width);
  return (
    <div
      style={{
        margin: state === 1 ? "auto" : "auto 20px",
        width: state === 1 ? props.width : "calc(100% - 40px)",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      {props.children}
    </div>
  );
};
Popup.propTypes = {
  children: PropTypes.any,
  width: PropTypes.number,
};
Popup.defaultProps = {
  width: 335,
};

export default { R1, R2, Popup };
