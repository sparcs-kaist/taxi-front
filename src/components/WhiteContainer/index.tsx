import { HTMLProps, ReactNode } from "react";

import theme from "@/tools/theme";

type WhiteContainerProps = {
  children?: ReactNode;
} & HTMLProps<HTMLDivElement>;

const WhiteContainer = ({ children, ...htmlProps }: WhiteContainerProps) => (
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
    {...htmlProps}
  >
    {children}
  </div>
);

export default WhiteContainer;
