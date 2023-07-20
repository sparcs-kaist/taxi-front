import { useEffect, useRef, useState } from "react";

import theme from "tools/theme";

type ButterflyState = "wide" | "narrow" | "fold";

const getButterflyState = (): ButterflyState => {
  const width = document.body.clientWidth;
  if (width >= theme.adaptivediv.butterfly_device_max_width.wide) return "wide";
  if (width >= theme.adaptivediv.butterfly_device_max_width.narrow)
    return "narrow";
  return "fold";
};

const useButterflyState = (): ButterflyState => {
  const stateR = useRef<ButterflyState>(getButterflyState());
  const [state, setState] = useState<ButterflyState>(stateR.current);

  useEffect(() => {
    const resizeEvent = () => {
      const _state = getButterflyState();
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

export default useButterflyState;
