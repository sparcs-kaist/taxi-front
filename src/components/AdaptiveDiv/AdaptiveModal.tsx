import { CSSProperties, ReactNode } from "react";

import { usePopupstate } from "hooks/useReactiveState";

export type AdaptiveModalProps = {
  width?: CSSProperties["width"];
  children: ReactNode;
};

const AdaptiveModal = ({ width = 335, children }: AdaptiveModalProps) => {
  const state = usePopupstate(width);
  return (
    <div
      css={{
        margin: state === 1 ? "auto" : "auto 20px",
        width: state === 1 ? width : "calc(100% - 40px)",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default AdaptiveModal;
