import { ReactNode, useCallback, useRef } from "react";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import ModalElem from "components/Modal/ModalElem";

import alertAtom from "atoms/alert";
import { useRecoilState } from "recoil";

import theme from "tools/theme";

import WbIncandescentRoundedIcon from "@material-ui/icons/WbIncandescentRounded";

const AlertProvider = () => {
  const messageCache = useRef<ReactNode>("");
  const [message, setMessage] = useRecoilState(alertAtom);

  const closeHandler = useCallback(() => setMessage(null), [setMessage]);
  const onChangeIsOpen = useCallback(
    (v: boolean) => {
      if (!v) closeHandler();
    },
    [closeHandler]
  );
  if (message) messageCache.current = message;

  return (
    <ModalElem
      isOpen={!!message}
      onChangeIsOpen={onChangeIsOpen}
      width={theme.modal_width_alert}
      padding="10px"
      displayCloseBtn={false}
      isAlert
    >
      <div
        style={{
          ...theme.font16_bold,
          display: "flex",
          alignItems: "center",
          margin: "2px 0 8px 6px",
          columnGap: "4px",
        }}
      >
        <WbIncandescentRoundedIcon style={{ fontSize: "16px" }} />
        알림
      </div>
      <DottedLine direction="row" margin="0 2px" />
      <div
        style={{
          ...theme.font14,
          textAlign: "center",
          wordBreak: "keep-all",
          width: "fit-content",
          margin: "24px auto",
        }}
      >
        {messageCache.current}
      </div>
      <Button
        type="purple_inset"
        padding="9px 10px"
        radius={8}
        font={theme.font14_bold}
        onClick={closeHandler}
      >
        확인
      </Button>
    </ModalElem>
  );
};

export default AlertProvider;
