import { ReactNode } from "react";

import theme from "tools/theme";

export type AdaptiveCenterProps = {
  children: ReactNode;
  horizontal?: boolean;
};

const AdaptiveCenter = ({ children, horizontal }: AdaptiveCenterProps) => (
  <div
    css={{
      position: "relative",
      width: `calc(min(${
        theme.adaptivediv.center_device_max_width
      }px, 100%) - ${theme.adaptivediv.margin * 2}px)`,
      margin: "auto",
      display: horizontal ? "flex" : "block",
    }}
  >
    {children}
  </div>
);

export default AdaptiveCenter;
