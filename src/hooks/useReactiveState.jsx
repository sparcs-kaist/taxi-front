import React, { useState, useRef, useEffect } from "react";

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

export { useR1state, useR2state, usePopupstate };
