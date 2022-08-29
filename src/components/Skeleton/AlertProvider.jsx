import React, { useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import Modal from "components/common/modal/Modal";
import { useRecoilState } from "recoil";
import alertAtom from "recoil/alert";
import Button from "components/common/modal/Button";

const AlertProvider = () => {
  const [display, setDisplay] = useStateWithCallbackLazy(false);
  const [message, setMessage] = useRecoilState(alertAtom);

  useEffect(() => setDisplay(message ? true : false), [message]);
  const onClickClose = () => {
    setDisplay(false, () => setMessage(null));
  };

  return (
    <Modal
      display={display}
      onClickClose={onClickClose}
      maxWidth="325px"
      padding="10px"
      top="100px"
      btnCloseDisplay={true}
    >
      <div style={{ padding: "10px", paddingBottom: "20px", fontSize: "15px" }}>
        {message}
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
