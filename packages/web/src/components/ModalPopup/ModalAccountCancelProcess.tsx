import Modal from "@/components/Modal";

import BodyAccountCancelProcess from "./Body/BodyAccountCancelProcess";

import theme from "@/tools/theme";

import { ReactComponent as TaxiLogo } from "@/static/assets/sparcsLogos/TaxiLogo.svg";

type PopupAccountCancelProcessProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalAccountCancelProcess = ({
  isOpen,
  onChangeIsOpen,
}: PopupAccountCancelProcessProps) => {
  const styleTop: CSS = {
    display: "flex",
    alignItems: "center",
    margin: "8px 0 16px 8px",
    ...theme.font16_bold,
    columnGap: "8px",
  };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      width={theme.modal_width_large}
      padding="16px"
    >
      <div style={styleTop}>
        <TaxiLogo style={{ height: "27px" }} />
        회원 탈퇴 절차
      </div>
      <BodyAccountCancelProcess />
    </Modal>
  );
};

export default ModalAccountCancelProcess;
