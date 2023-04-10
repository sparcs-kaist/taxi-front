import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import PrivacyPolicy from "components/ModalPopup/PrivacyPolicy";

import theme from "tools/theme";

import { ReactComponent as TaxiLogo } from "static/assets/TaxiLogo.svg";

type PopupPrivacyPolicyProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PopupPrivacyPolicy = ({ isOpen, onClose }: PopupPrivacyPolicyProps) => {
  const { t } = useTranslation("mypage");

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
      onChangeIsOpen={onClose}
      width={theme.modal_width_large}
      padding="16px"
    >
      <div style={styleTop}>
        <TaxiLogo style={{ height: "27px" }} />
        {t("privacy_policy")}
      </div>
      <PrivacyPolicy />
    </Modal>
  );
};

export default PopupPrivacyPolicy;
