import { ReactNode, useRef } from "react";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import Modal from "components/Modal";

import alertAtom from "atoms/alert";
import { useRecoilState } from "recoil";

import theme from "tools/theme";

import WbIncandescentRoundedIcon from "@material-ui/icons/WbIncandescentRounded";

const AlertProvider = () => {
  const messageCache = useRef<ReactNode>("");
  const [message, setMessage] = useRecoilState(alertAtom);

  const onClickClose = () => setMessage(null);
  if (message) messageCache.current = message;

  return (
    <Modal
      display={!!message}
      onClickClose={onClickClose}
      width={315}
      padding="10px"
      closeBtn={false}
      alert
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
        onClick={onClickClose}
      >
        확인
      </Button>
    </Modal>
  );
};

export default AlertProvider;
