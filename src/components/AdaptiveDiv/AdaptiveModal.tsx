import { ReactNode } from "react";

import theme from "tools/theme";

export type AdaptiveModalProps = {
  width?: PixelValue; // CSSProperties["width"];
  children: ReactNode;
};

const AdaptiveModal = ({
  width = theme.modal_width,
  children,
}: AdaptiveModalProps) => {
  return (
    <div
      css={{
        width: `min(${width}, calc(100% - ${theme.adaptivediv.margin * 2}px))`,
        margin: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default AdaptiveModal;
