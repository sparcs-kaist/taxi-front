import { useRef, useState, useEffect } from "react";

const useDelay = <T,>(
  value: T,
  isValid: boolean,
  delayTime: number
): T => {
  const valueRef = useRef(value);
  const [delayedValue, setDelayedValue] = useState(value);

  const updateValue = (x: T) => {
    if (valueRef.current === x) setDelayedValue(x);
  };

  useEffect(() => {
    valueRef.current = value;

    if (isValid) updateValue(value);
    else {
      const timeoutId = setTimeout(() => updateValue(value), delayTime);
      return () => clearTimeout(timeoutId);
    }
  }, [value, isValid]);

  return delayedValue;
};

const useDelayBoolean = (value: boolean, delayTime: number): boolean =>
  useDelay(value, value, delayTime);

export default useDelay;
export { useDelay, useDelayBoolean };
