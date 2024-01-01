import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

export default (): [
  {
    onMouseEnter: () => void;
    onMouseDown: () => void;
    onTouchStart: () => void;
    onMouseLeave: () => void;
    onMouseUp: () => void;
    onTouchEnd: () => void;
    onTouchCancel: () => void;
  },
  boolean,
  boolean,
  Dispatch<SetStateAction<boolean>>,
  Dispatch<SetStateAction<boolean>>
] => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const setBoth = useCallback(
    (v: boolean) => {
      setIsHover(v);
      setIsClicked(v);
    },
    [setIsHover, setIsClicked]
  );
  const hoverProps = useMemo(
    () => ({
      onMouseEnter: () => setIsHover(true),
      onMouseDown: () => setIsClicked(true),
      onTouchStart: () => setBoth(true),
      onMouseLeave: () => setBoth(false),
      onMouseUp: () => setIsClicked(false),
      onTouchEnd: () => setBoth(false),
      onTouchCancel: () => setBoth(false),
    }),
    [setIsHover, setIsClicked, setBoth]
  );
  return [hoverProps, isHover, isClicked, setIsHover, setIsClicked];
};
