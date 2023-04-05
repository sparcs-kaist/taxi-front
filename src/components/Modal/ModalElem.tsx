import {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDelayBoolean } from "hooks/useDelay";
import useDisableScrollEffect from "hooks/useDisableScrollEffect";
import useKeyboardOperationEffect from "hooks/useKeyboardOperationEffect";

import RLayout from "components/RLayout";

import theme from "tools/theme";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export type ModalElemProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
  onEnter?: () => void;
  displayCloseBtn?: boolean;
  width?: PixelValue;
  padding?: Padding;
  children: ReactNode;
  isAlert?: boolean;
};

const ModalElem = ({
  isOpen,
  onChangeIsOpen,
  onEnter,
  displayCloseBtn = true,
  width = theme.modal_width,
  padding = "0px",
  children,
  isAlert = false,
}: ModalElemProps) => {
  const [display, setDisplay] = useState(false);
  const shouldMount = useDelayBoolean(isOpen, theme.duration_num);
  const modalRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef(false);

  const closeHandler = useCallback(
    onChangeIsOpen ? () => onChangeIsOpen(false) : () => {},
    [onChangeIsOpen]
  );
  const onMouseDown = useCallback(({ target }: MouseEvent) => {
    if (!modalRef.current?.contains(target as Node)) {
      clickRef.current = true;
    }
  }, []);
  const onMouseUp = useCallback(
    ({ target }: MouseEvent) => {
      if (clickRef.current && !modalRef.current?.contains(target as Node)) {
        closeHandler();
      }
      clickRef.current = false;
    },
    [closeHandler]
  );

  useDisableScrollEffect(isOpen);
  useKeyboardOperationEffect({
    onEnter: isOpen ? onEnter : undefined,
    onEscape: isOpen ? closeHandler : undefined,
  });
  useEffect(() => {
    setDisplay(shouldMount && isOpen);
  }, [shouldMount, isOpen]);

  const styleBgd = {
    position: "fixed" as any,
    display: "flex",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "calc(100% + 1px)", // useDisableScrollEffect 로 감소된 1px을 보정
    zIndex: isAlert ? theme.zIndex_alert : theme.zIndex_modal,
    background: isAlert ? theme.black_40 : theme.black_60,
    opacity: display ? 1 : 0,
    transition: `opacity ${theme.duration} ease-in-out`,
    pointerEvents: (isOpen ? "auto" : "none") as any,
  };
  const styleBody = {
    position: "relative" as any,
    background: theme.white,
    borderRadius: "15px",
    padding: padding,
    minHeight: "148px",
    maxHeight: "720px",
    display: "flex",
    flexDirection: "column" as any,
    boxSizing: "border-box" as any,
  };
  const styleBtn: CSS = useMemo(
    () => ({
      color: theme.gray_text,
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "24px",
      cursor: "pointer",
    }),
    []
  );

  if (!shouldMount) return null;
  return (
    <div css={styleBgd} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <RLayout.Popup width={parseFloat(width.replace("px", ""))}>
        <div ref={modalRef} css={styleBody}>
          {children}
          {displayCloseBtn && (
            <CloseRoundedIcon style={styleBtn} onClick={closeHandler} />
          )}
        </div>
      </RLayout.Popup>
    </div>
  );
};

export default ModalElem;
