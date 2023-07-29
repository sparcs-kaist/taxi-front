import { memo, useCallback, useRef } from "react";

import AdaptiveDiv from "components/AdaptiveDiv";

import ToolButton from "./ToolButton";

import theme from "tools/theme";

type ToolSheetProps = {
  isOpen: boolean;
  onChangeIsOpen?: (x: boolean) => void;
  onChangeUploadedImage?: (x: Nullable<File>) => void;
};

const ToolSheet = ({
  isOpen,
  onChangeIsOpen,
  onChangeUploadedImage,
}: ToolSheetProps) => {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const onChangeImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0];
      onChangeUploadedImage && onChangeUploadedImage(file);
      onChangeIsOpen && onChangeIsOpen(false);
      e.target.value = "";
    },
    [onChangeUploadedImage]
  );
  const onClickImage = useCallback(
    () => inputImageRef.current?.click(),
    [onChangeIsOpen]
  );
  const onClickSettlement = useCallback(() => {}, [onChangeIsOpen]);
  const onClickPayment = useCallback(() => {}, [onChangeIsOpen]);

  const styleWrap = {
    position: "absolute" as any,
    width: "100%",
    left: "0",
    bottom: "0",
    transform: `translate(0, ${isOpen ? "0" : "calc(100% + 20px)"})`,
    transition: "all 0.3s",
    padding: "16px 0 14px",
    background: theme.white,
    boxShadow: theme.shadow_clicked,
  };
  const style = {
    display: "flex",
    justifyContent: "space-around",
  };
  return (
    <div css={styleWrap}>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/heic"
        hidden
        ref={inputImageRef}
        onChange={onChangeImage}
      />
      <AdaptiveDiv type="center">
        <div css={style}>
          <ToolButton type="image" onClick={onClickImage} />
          <ToolButton type="settlement" onClick={onClickSettlement} />
          <ToolButton type="payment" onClick={onClickPayment} />
        </div>
      </AdaptiveDiv>
    </div>
  );
};

export default memo(ToolSheet);
