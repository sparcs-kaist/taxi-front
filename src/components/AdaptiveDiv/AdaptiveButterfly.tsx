import { ReactNode } from "react";

import { useR2state } from "hooks/useReactiveState";

import AdaptiveCenter from "./AdaptiveCenter";

export type AdaptiveButterflyProps = {
  left?: ReactNode;
  right?: ReactNode;
};

const AdaptiveButterfly = ({ left, right }: AdaptiveButterflyProps) => {
  const state = useR2state();
  if (state === 3 || !right) return <AdaptiveCenter>{left}</AdaptiveCenter>;

  const styleColumn = { width: state === 1 ? "390px" : "calc(50% - 27.5px)" };
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        justifyContent: "center",
      }}
    >
      <div style={styleColumn}>{left}</div>
      <div style={styleColumn}>{right}</div>
    </div>
  );
};

export default AdaptiveButterfly;
