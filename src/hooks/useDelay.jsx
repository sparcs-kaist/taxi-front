import React, { useRef, useState } from "react";

const useDelay = (value, isValid, delayTime) => {
  const valueRef = useRef(value);
  const [delayedValue, setDelayedValue] = useState(value);
  
  const updateValue = (x) => {
    if (valueRef.current === x) setDelayedValue(x);
  }

  useEffect(() => {
    valueRef.current = value;

    if (isValid) updateValue(value);
    else {
      const timeoutId = setTimeout(() => updateValue(value), delayTime);
      return () => clearTimeout(timeoutId)
    }
  }, [value, isValid]);

  return delayedValue;
};
