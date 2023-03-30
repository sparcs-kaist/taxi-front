import { useState } from "react";
import { useTranslation } from "react-i18next";

import DottedLine from "components/DottedLine";
import Modal from "components/Modal";
import Toggle from "components/Toggle";

import theme from "tools/theme";

import AlarmOffRoundedIcon from "@mui/icons-material/AlarmOffRounded";
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
}: SelectNotificationProps) => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div css={theme.font14}>{text}</div>
    <Toggle value={value} onChangeValue={onChangeValue} />
  </div>
);

const ModalNotification = ({
  isOpen,
  onChangeIsOpen,
}: ModalNotificationProps) => {
  const { t } = useTranslation("mypage");

  // for test
  const [toggleValue, setToggleValue] = useState(true);

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  };
  const styleLogo = {
    fontSize: "21px",
    margin: "0 4px 0 0px",
  };
  const styleGuide = {
    ...theme.font12,
    color: theme.gray_text,
    marginBottom: "12px",
    wordBreak: "keep-all" as any,
  };
  const styleBody = { display: "grid", rowGap: "12px" };

  return (
    <Modal
      display={isOpen}
      onClickClose={onChangeIsOpen ? () => onChangeIsOpen(false) : undefined}
      padding="16px 20px 20px"
    >
      <div css={styleTitle}>
        {toggleValue ? (
          <AlarmOnRoundedIcon style={styleLogo} />
        ) : (
          <AlarmOffRoundedIcon style={styleLogo} />
        )}
        {t("notification")}
      </div>
      <div css={styleGuide}>알림기능 테스트</div>
      <div css={styleBody}>
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
