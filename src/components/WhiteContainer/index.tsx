import { ReactNode } from "react";

import theme from "tools/theme";

type WhiteContainerProps = {
  padding?: CSS["padding"];
  margin?: CSS["margin"];
  style?: CSS;
  children: ReactNode;
};

const WhiteContainer = ({
  padding = "24px",
  margin = "0 0 15px",
  style,
  children,
}: WhiteContainerProps) => (
  <div
    css={{
      margin: margin,
      padding: padding,
      boxShadow: theme.shadow,
      background: theme.white,
      overflow: "hidden",
      position: "relative",
      borderRadius: "12px",
      ...style,
    }}
  >
    {children}
  </div>
);

export default WhiteContainer;
