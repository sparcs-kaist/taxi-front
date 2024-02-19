import { useEffect } from "react";

export const useEventBackgroundEffect = (color: string = "#000000") => {
  useEffect(() => {
    const prevBackground = document.body.style.background;
    document.body.style.background = color;
    return () => {
      document.body.style.background = prevBackground;
    };
  }, [color]);
};
