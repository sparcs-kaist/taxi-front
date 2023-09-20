import { useTranslation } from "react-i18next";

import Modal from "components/Modal";

import BodyPrivacyPolicy from "./Body/BodyPrivacyPolicy";

import theme from "tools/theme";

import { ReactComponent as TaxiLogo } from "static/assets/sparcsLogos/TaxiLogo.svg";

type PopupPrivacyPolicyProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalPrivacyPolicy = ({
  isOpen,
  onChangeIsOpen,
}: PopupPrivacyPolicyProps) => {
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
      onChangeIsOpen={onChangeIsOpen}
      width={theme.modal_width_large}
      padding="16px"
    >
      <div style={styleTop}>
        <TaxiLogo style={{ height: "27px" }} />
        {t("privacy_policy")}
      </div>
      <BodyPrivacyPolicy />
    </Modal>
  );
};

export default ModalPrivacyPolicy;
