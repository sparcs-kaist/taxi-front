import { useEffect } from "react";

type useKeyboardOperationEffectProps = {
  onEnter?: () => void;
  onEscape?: () => void;
};

const useKeyboardOperationEffect = ({
  onEnter,
  onEscape,
}: useKeyboardOperationEffectProps) => {
  useEffect(() => {
    const keypressHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && onEnter) onEnter();
      if (e.key === "Escape" && onEscape) onEscape();
    };

    window.addEventListener("keydown", keypressHandler);
    return () => window.removeEventListener("keydown", keypressHandler);
  }, [onEnter, onEscape]);
};

export default useKeyboardOperationEffect;
