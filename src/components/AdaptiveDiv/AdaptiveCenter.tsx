import { ReactNode } from "react";

import { useR1state } from "hooks/useReactiveState";

export type AdaptiveCenterProps = {
  children: ReactNode;
};

const AdaptiveCenter = ({ children }: AdaptiveCenterProps) => {
  const state = useR1state();
  return (
    <div
      css={{
        position: "relative",
        width: state === 1 ? "390px" : undefined,
        margin: state === 1 ? "auto" : "0 20px",
      }}
    >
      {children}
    </div>
  );
};

export default AdaptiveCenter;
