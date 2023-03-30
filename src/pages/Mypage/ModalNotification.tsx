import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import DottedLine from "components/DottedLine";
import Modal from "components/Modal";
import Toggle from "components/Toggle";

import theme from "tools/theme";

// import AlarmOffRoundedIcon from "@mui/icons-material/AlarmOffRounded";
import AlarmOnRoundedIcon from "@mui/icons-material/AlarmOnRounded";

type SelectNotificationProps = {
  text: string;
  value: boolean;
  onChangeValue: (value: boolean) => void;
};

type ModalNotificationProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
};

const SelectNotification = ({
  text,
  value,
  onChangeValue,
}: SelectNotificationProps) => {
  const style: CSS = useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }),
    []
  );
  const styleText: CSS = useMemo(
    () => ({
      ...theme.font14,
    }),
    []
  );

  return (
    <div style={style}>
      <div style={styleText}>{text}</div>
      <Toggle value={value} onChangeValue={onChangeValue} />
    </div>
  );
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
    margin: "0 4px 0 0px",
  };
  const styleGuide: CSS = {
    ...theme.font12,
    color: theme.gray_text,
    marginBottom: "12px",
    wordBreak: "keep-all",
  };
  const styleBody: CSS = { display: "grid", rowGap: "12px" };

  // for test
  const [toggleValue, setToggleValue] = useState(true);

  return (
    <Modal
      display={isOpen}
      onClickClose={onChangeIsOpen ? () => onChangeIsOpen(false) : undefined}
      padding="16px 20px 20px"
    >
      <div style={styleTitle}>
        <AlarmOnRoundedIcon style={styleLogo} />
        {t("notification")}
      </div>
      <div style={styleGuide}>알림기능 테스트</div>
      <div style={styleBody}>
        <SelectNotification
          text="알림"
          value={toggleValue}
          onChangeValue={setToggleValue}
        />
        <DottedLine direction="row" />
        <SelectNotification
          text="채팅 알림"
          value={toggleValue}
          onChangeValue={setToggleValue}
        />
        <SelectNotification
          text="출발 10분 전 알림"
          value={toggleValue}
          onChangeValue={setToggleValue}
        />
        <SelectNotification
          text="서비스 공지 알림"
          value={toggleValue}
          onChangeValue={setToggleValue}
        />
      </div>
    </Modal>
  );
};

export default ModalNotification;
