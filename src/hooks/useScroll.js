import { useState, useEffect } from "react";

export function useScroll(ref) {
  const [scroll, setScroll] = useState(0);

  const listener = () => {
    setScroll(ref.current.scrollTop);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scroll", listener);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", listener);
      }
    };
  });

  return {
    scroll,
  };
}
