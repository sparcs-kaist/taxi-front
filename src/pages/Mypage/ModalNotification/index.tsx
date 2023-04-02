import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useAxios } from "hooks/useTaxiAPI";

import DottedLine from "components/DottedLine";
import Modal from "components/Modal";
import Toggle from "components/Toggle";

import Guide from "./Guide";

import deviceTokenAtom from "atoms/deviceToken";
import notificationOptionsAtom from "atoms/notificationOptions";
import { useRecoilState, useRecoilValue } from "recoil";

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
  const axios = useAxios();
  const deviceToken = useRecoilValue(deviceTokenAtom);
  const [notificationOptions, setNotificationOptions] = useRecoilState(
    notificationOptionsAtom
  );
  const isOnNotification =
    // notificationOptions?.advertisement ||
    // notificationOptions?.beforeDepart ||
    notificationOptions?.chatting || notificationOptions?.notice;
  // notificationOptions?.keywords?.length;
  const isAxiosCalled = useRef(false);

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

  const onChangeNotificationOption = useCallback(
    (optionName: string) => async (value: boolean) => {
      if (isAxiosCalled.current) return;
      isAxiosCalled.current = true;
      await axios({
        url: "/notifications/editOptions",
        method: "post",
        data: {
          deviceToken,
          options: {
            [optionName]: value,
          },
        },
      });
      setNotificationOptions(
        await axios({
          url: "/notifications/options",
          method: "get",
          params: { deviceToken },
        })
      );
      isAxiosCalled.current = false;
    },
    [deviceToken]
  );
  const onChangeNotificationAll = useCallback(
    async (value: boolean) => {
      if (isAxiosCalled.current) return;
      isAxiosCalled.current = true;
      await axios({
        url: "/notifications/editOptions",
        method: "post",
        data: {
          deviceToken,
          options: {
            beforeDepart: value,
            chatting: value,
            notice: value,
          },
        },
      });
      setNotificationOptions(
        await axios({
          url: "/notifications/options",
          method: "get",
          params: { deviceToken },
        })
      );
      isAxiosCalled.current = false;
    },
    [deviceToken]
  );
  const onChangeNotificationChatting = useCallback(
    onChangeNotificationOption("chatting"),
    [onChangeNotificationOption]
  );
  // const onChangeNotificationBeforeDepart = useCallback(
  //   onChangeNotificationOption("beforeDepart"),
  //   [onChangeNotificationOption]
  // );
  const onChangeNotificationNotice = useCallback(
    onChangeNotificationOption("notice"),
    [onChangeNotificationOption]
  );

  return (
    <Modal
      display={isOpen}
      onClickClose={onChangeIsOpen ? () => onChangeIsOpen(false) : undefined}
      padding="16px 20px 20px"
    >
      <div css={styleTitle}>
        {isOnNotification ? (
          <AlarmOnRoundedIcon style={styleLogo} />
        ) : (
          <AlarmOffRoundedIcon style={styleLogo} />
        )}
        {t("notification")}
      </div>
      {deviceToken ? (
        <>
          <div css={styleGuide}>
            브라우저를 닫아도 푸시 알림을 받을 수 있습니다.
          </div>
          <div css={styleBody}>
            <SelectNotification
              text="알림"
              value={!!isOnNotification}
              onChangeValue={onChangeNotificationAll}
            />
            <DottedLine direction="row" />
            <SelectNotification
              text="채팅 알림"
              value={!!notificationOptions?.chatting}
              onChangeValue={onChangeNotificationChatting}
            />
            {/* <SelectNotification
              text="출발 10분 전 알림"
              value={!!notificationOptions?.beforeDepart}
              onChangeValue={onChangeNotificationBeforeDepart}
            /> */}
            <SelectNotification
              text="서비스 공지 알림"
              value={!!notificationOptions?.notice}
              onChangeValue={onChangeNotificationNotice}
            />
          </div>
        </>
      ) : (
        <Guide />
      )}
    </Modal>
  );
};

export default ModalNotification;
