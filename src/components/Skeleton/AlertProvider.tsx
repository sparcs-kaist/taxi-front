import alertAtom from "@/atoms/alert";
import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import ModalElem from "@/components/Modal/ModalElem";
import theme from "@/tools/theme";
import { ReactNode, useCallback, useRef } from "react";

import { useRecoilState } from "recoil";

import WbIncandescentRoundedIcon from "@material-ui/icons/WbIncandescentRounded";

const AlertProvider = () => {
  const messageCache = useRef<ReactNode>("");
  const [message, setMessage] = useRecoilState(alertAtom);

  const closeHandler = useCallback(() => setMessage(null), [setMessage]);
  if (message) messageCache.current = message;

  return (
    <ModalElem
      isOpen={!!message}
      onChangeIsOpen={closeHandler}
      onEnter={closeHandler}
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
          padding: "0 8px",
        }}
      >
        {messageCache.current}
      </div>
      <Button
        type="purple_inset"
        css={{
          padding: "9px 10px",
          borderRadius: "8px",
          ...theme.font14_bold,
        }}
        onClick={closeHandler}
      >
        확인
      </Button>
    </ModalElem>
  );
};

export default AlertProvider;
