import React, { useEffect } from "react";

type useKeyboardOperationProps = {
  display: boolean;
  onEnter?: () => void;
  onEscape?: () => void;
};

const useKeyboardOperation = ({
  display,
  onEnter,
  onEscape,
}: useKeyboardOperationProps) => {
  useEffect(() => {
    if (!display) return;

    function keypressEnterHandler(e: KeyboardEvent) {
      if (e.key === "Enter" && onEnter) onEnter();
    }
    function keypressEscapeHandler(e: KeyboardEvent) {
      if (e.key === "Escape" && onEscape) onEscape();
    }

    window.addEventListener("keydown", keypressEnterHandler);
    window.addEventListener("keydown", keypressEscapeHandler);

    return () => {
      window.removeEventListener("keydown", keypressEnterHandler);
      window.removeEventListener("keydown", keypressEscapeHandler);
    };
  }, [display, onEnter, onEscape]);
};

export default useKeyboardOperation;
