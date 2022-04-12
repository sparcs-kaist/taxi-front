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

const useR2state = () => {};

const R1 = (props) => {
  const state = useR1state();

  if (state == 1) {
    return (
      <div
        style={{
          position: "relative",
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
          position: "relative",
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
  children: PropTypes.any,
};

const R2 = () => {};

export default { useR1state, useR2state, R1, R2 };
