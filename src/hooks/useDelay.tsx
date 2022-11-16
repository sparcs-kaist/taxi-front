import { useRef, useState, useEffect } from "react";

const useDelay = <TypeValue,>(
  value: TypeValue,
  isValid: boolean,
  delayTime: number
): TypeValue => {
  const valueRef = useRef(value);
  const [delayedValue, setDelayedValue] = useState(value);

  const updateValue = (x: TypeValue) => {
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
