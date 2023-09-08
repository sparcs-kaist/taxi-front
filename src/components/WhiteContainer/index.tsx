import { ReactNode } from "react";

import theme from "tools/theme";

type WhiteContainerProps = {
  className?: string;
  children?: ReactNode;
};

const WhiteContainer = ({ className, children }: WhiteContainerProps) => (
  <div
    css={{
      margin: "0 0 15px",
      padding: "24px",
      boxShadow: theme.shadow,
      background: theme.white,
      overflow: "hidden",
      position: "relative",
      borderRadius: "12px",
    }}
    className={className}
  >
    {children}
  </div>
);

export default WhiteContainer;
