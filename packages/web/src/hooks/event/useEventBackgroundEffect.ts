import { useEffect } from "react";

type EventBackgroundEffectProps = {
  color: string;
};
export const useEventBackgroundEffect = ({
  color = "#000000",
}: EventBackgroundEffectProps) => {
  useEffect(() => {
    const prevBackground = document.body.style.background;
    document.body.style.background = color;
    // return () => document.body.style.background = prevBackground;
  }, [color]);
};
