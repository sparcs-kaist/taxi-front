import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const useR1state = () => {
  const getState = () => {
    const width = document.body.clientWidth;
    if (width >= 795) return 1;
    return 2;
  };
  const stateR = useRef(getState());
  const [state, setState] = useState(stateR.current);

  useEffect(() => {
    const resizeEvent = () => {
      const _state = getState();
      if (stateR.current !== _state) {
        stateR.current = _state;
        setState(_state);
      }
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  return state;
};

const useR2state = () => {
  const getState = () => {
    const width = document.body.clientWidth;
    if (width >= 795) return 1;
    if (width >= 595) return 2;
    return 3;
  };
  const stateR = useRef(getState());
  const [state, setState] = useState(stateR.current);

  useEffect(() => {
    const resizeEvent = () => {
      const _state = getState();
      if (stateR.current !== _state) {
        stateR.current = _state;
        setState(_state);
      }
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  return state;
};

const usePopupstate = () => {
  const getState = () => {
    const width = document.body.clientWidth;
    if (width >= 375) return 1;
    return 2;
  };
  const stateR = useRef(getState());
  const [state, setState] = useState(stateR.current);

  useEffect(() => {
    const resizeEvent = () => {
      const _state = getState();
      if (stateR.current !== _state) {
        stateR.current = _state;
        setState(_state);
      }
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  return state;
};

const R1 = (props) => {
  const state = useR1state();

  if (state == 1) {
    return (
      <div
        style={{
          position: props.position,
          height: props.height,
          width: "755px",
          margin: "auto",
        }}
      >
        {props.children}
      </div>
    );
  } else {
    return (
      <div
        style={{
          position: props.position,
          height: props.height,
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        {props.children}
      </div>
    );
  }
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

  if (state == 1 || state == 2) {
    if (props.priority === "left" && props.right === null) {
      return <R1>{props.left}</R1>;
    }
    if (props.priority === "right" && props.left === null) {
      return <R1>{props.right}</R1>;
    }
    return (
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        <div style={{ width: state == 1 ? "370px" : "calc(50% - 27.5px)" }}>
          {props.left}
        </div>
        <div style={{ width: state == 1 ? "370px" : "calc(50% - 27.5px)" }}>
          {props.right}
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        {props.priority === "left" ? props.left : props.right}
      </div>
    );
  }
};
R2.propTypes = {
  left: PropTypes.any,
  right: PropTypes.any,
  priority: PropTypes.string,
};
R2.defaultProps = {
  left: null,
  right: null,
  priority: "right",
};

const Popup = (props) => {
  const state = usePopupstate();

  if (state == 1) {
    return (
      <div
        style={{
          height: "100%",
          width: "335px",
          margin: "auto",
        }}
      >
        {props.children}
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "100%",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        {props.children}
      </div>
    );
  }
};
Popup.propTypes = {
  children: PropTypes.any,
};

export default { useR1state, useR2state, usePopupstate, R1, R2, Popup };
