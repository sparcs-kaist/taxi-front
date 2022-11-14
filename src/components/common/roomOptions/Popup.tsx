import React from "react";
import RLayout from "components/common/RLayout";
import theme from "styles/theme";
import useDisableScroll from "hooks/useDisableScroll";
import Button from "components/common/Button";
import useKeyboardOperation from "hooks/useKeyboardOperation";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  children: React.ReactElement;
};

const Popup = (props: PopupProps) => {
  useDisableScroll(props.isOpen);
  useKeyboardOperation({
    display: props.isOpen,
    onEnter: props.onClick,
    onEscape: props.onClose,
  });

  const styleBgd: CSS = {
    position: "fixed",
    display: "flex",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: theme.zIndex_modal,
    background: theme.black_60,
    transitionDuration: theme.duration,
    pointerEvents: props.isOpen ? "auto" : "none",
  };
  const style = {
    height: "266px",
    borderRadius: "15px",
    background: theme.white,
  };

  if (!props.isOpen) return null;
  return (
    <div style={styleBgd} onClick={props.onClose}>
      <RLayout.Popup>
        <div style={style}>
          {props.children}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0px 10px",
            }}
          >
            <Button
              type="gray"
              width="calc(40% - 10px)"
              padding="10px 0 9px"
              radius={8}
              font={theme.font14}
              onClick={props.onClose}
            >
              취소
            </Button>
            <Button
              type="purple"
              width="60%"
              padding="10px 0 9px"
              radius={8}
              font={theme.font14_bold}
              onClick={props.onClick}
            >
              선택하기
            </Button>
          </div>
        </div>
      </RLayout.Popup>
    </div>
  );
};

export default Popup;
