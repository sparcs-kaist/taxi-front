import { ReactNode } from "react";

import RLayout from "components/RLayout";

import theme from "tools/theme";

type WhiteContainerProps = {
  padding?: string;
  margin?: string;
  marginAuto?: boolean;
  style?: CSS;
  children: ReactNode;
};

const WhiteContainer = ({
  padding = "24px",
  margin = "0 0 15px",
  marginAuto = false,
  style,
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
        transform: "translateZ(0)", // 사파리의 렌더링 엔진 Webkit의 버그로 overflow: hidden이 적용되지 않는 버그 해결
        ...style,
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
