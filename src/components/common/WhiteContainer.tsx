import React from "react";
import RLayout from "components/common/RLayout";
import { theme } from "styles/theme";

type WhiteContainerProps = {
  padding?: string;
  margin?: string;
  marginAuto?: boolean;
  children: React.ReactNode;
};

const WhiteContainer = ({
  padding = "24px",
  margin = "0 0 15px",
  marginAuto = false,
  ...props
}: WhiteContainerProps) => {
  const box = (
    <div
      style={{
        margin: margin,
        padding: padding,
        boxShadow: theme.shadow,
        background: theme.white,
        overflow: "hidden",
        position: "relative",
        borderRadius: "12px",
      }}
    >
      {props.children}
    </div>
  );
  if (marginAuto) {
    return <RLayout.R1>{box}</RLayout.R1>;
  }
  return box;
};

export default WhiteContainer;
