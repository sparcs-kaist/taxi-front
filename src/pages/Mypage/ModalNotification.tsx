import { useState } from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Toggle from "components/Toggle";

import theme from "tools/theme";

import AlarmOffRoundedIcon from "@mui/icons-material/AlarmOffRounded";
import AlarmOnRoundedIcon from "@mui/icons-material/AlarmOnRounded";

type ModalNotificationProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
};

const ModalNotification = ({
  isOpen,
  onChangeIsOpen,
}: ModalNotificationProps) => {
  const { t } = useTranslation("mypage");

  const styleTitle: CSS = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  };
  const styleLogo: CSS = {
    fontSize: "21px",
    margin: "0 4px 0 8px",
  };

  // for test
  const [toggleValue, setToggleValue] = useState(true);

  return (
    <Modal
      display={isOpen}
      onClickClose={onChangeIsOpen ? () => onChangeIsOpen(false) : undefined}
      padding="16px 12px"
    >
      <div style={styleTitle}>
        <AlarmOnRoundedIcon style={styleLogo} />
        {t("notification")}
      </div>
      <Toggle value={toggleValue} onChangeValue={setToggleValue} />
    </Modal>
  );
};

export default ModalNotification;
