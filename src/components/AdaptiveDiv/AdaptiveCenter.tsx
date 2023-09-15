import { HTMLProps, ReactNode } from "react";

import theme from "tools/theme";

export type AdaptiveCenterProps = {
  children?: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

const AdaptiveCenter = ({
  children,
  className,
  ...divProps
}: AdaptiveCenterProps) => (
  <div
    className={className}
    css={{
      position: "relative",
      width: `calc(min(${
        theme.adaptivediv.center_device_max_width
      }px, 100%) - ${theme.adaptivediv.margin * 2}px)`,
      margin: "auto",
    }}
    {...divProps}
  >
    {children}
  </div>
);

export default AdaptiveCenter;
