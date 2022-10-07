import React, { useRef } from "react";
import Modal from "components/common/modal/Modal";
import { useRecoilState } from "recoil";
import alertAtom from "recoil/alert";
import Button from "components/common/modal/Button";

const AlertProvider = () => {
  const messageCache = useRef("");
  const [message, setMessage] = useRecoilState(alertAtom);

  const onClickClose = () => setMessage(null);
  if (message) messageCache.current = message;

  return (
    <Modal
      display={message ? true : false}
      onClickClose={onClickClose}
      padding="10px"
      top="100px"
      btnCloseDisplay={true}
    >
      <div style={{ padding: "10px", paddingBottom: "20px", fontSize: "15px" }}>
        {messageCache.current}
      </div>
      <Button
        onClick={onClickClose}
        boxShadow="inset 2px 2px 5px -2px rgba(0, 0, 0, 0.25)"
        color="#FFFFFF"
        background="#6E3678"
      >
        확인
      </Button>
    </Modal>
  );
};

export default AlertProvider;
