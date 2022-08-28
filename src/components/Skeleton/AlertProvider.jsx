import React from "react";
import Modal from "components/common/modal/Modal";
import { useRecoilState } from "recoil";
import alertAtom from "recoil/alert";

const AlertProvider = () => {
  const [message, setMessage] = useRecoilState(alertAtom);

  return (
    <Modal
      display={message ? true : false}
      onClickClose={() => setMessage(null)}
      maxWidth="325px"
      padding="10px"
      btnCloseDisplay={true}
    >
      {message}
    </Modal>
  );
};

export default AlertProvider;
