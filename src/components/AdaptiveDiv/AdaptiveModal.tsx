import theme from "@/tools/theme";
import { ReactNode } from "react";

export type AdaptiveModalProps = {
  width?: PixelValue; // CSS["width"];
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
