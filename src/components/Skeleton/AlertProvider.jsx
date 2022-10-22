import React, { useRef } from "react";
import Modal from "components/common/modal/Modal";
import { useRecoilState } from "recoil";
import alertAtom from "recoil/alert";
import Button from "components/common/Button";
import { theme } from "styles/theme";
import DottedLine from "components/common/DottedLine";

import WbIncandescentRoundedIcon from "@material-ui/icons/WbIncandescentRounded";

const AlertProvider = () => {
  const messageCache = useRef("");
  const [message, setMessage] = useRecoilState(alertAtom);

  const onClickClose = () => setMessage(null);
  if (message) messageCache.current = message;

  return (
    <Modal
      display={message ? true : false}
      onClickClose={onClickClose}
      width={315}
      padding="10px"
      closeBtn={false}
      alert={true}
    >
      <div
        style={{
          ...theme.font16_bold,
          display: "flex",
          alignItems: "center",
          margin: "2px 0px 8px 6px",
          columnGap: "4px",
        }}
      >
        <WbIncandescentRoundedIcon style={{ fontSize: "16px" }} />
        알림
      </div>
      <DottedLine direction="row" margin={2} />
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
        radius="8px"
        font={theme.font14_bold}
        onClick={onClickClose}
      >
        확인
      </Button>
    </Modal>
  );
};

export default AlertProvider;
