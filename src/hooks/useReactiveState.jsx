import React, { useState, useRef, useEffect } from "react";

const useBodySize = () => {
  const bodySizeR = useRef([0, 0]);
  const [bodySize, setBodySize] = useState(bodySizeR.current);

  useEffect(() => {
    const resizeEvent = () => {
      const _bodySize = [document.body.clientWidth, document.body.clientHeight];
      if (
        bodySizeR.current[0] !== _bodySize[0] ||
        bodySizeR.current[1] !== _bodySize[1]
      ) {
        bodySizeR.current = _bodySize;
        setBodySize(_bodySize);
      }
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  return bodySize;
};

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

const usePopupstate = (modalWidth) => {
  const getState = () => {
    const width = document.body.clientWidth;
    if (width >= modalWidth + 40) return 1;
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

export { useBodySize, useR1state, useR2state, usePopupstate };
