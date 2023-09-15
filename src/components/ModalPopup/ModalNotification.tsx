import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import DottedLine from "components/DottedLine";
import Modal from "components/Modal";
import Toggle from "components/Toggle";

import BodyNotificationGuide from "./Body/BodyNotificationGuide";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import { deviceType } from "tools/loadenv";
import { sendTryNotificationEventToFlutter } from "tools/sendEventToFlutter";
import theme from "tools/theme";
import { isNotificationOn } from "tools/trans";

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

  const setAlert = useSetRecoilState(alertAtom);
  const { deviceToken } = useValueRecoilState("loginInfo") || {};
  const notificationOptions = useValueRecoilState("notificationOptions");
  const fetchNotificationOptions = useFetchRecoilState("notificationOptions");
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

      if (value) {
        const isAllowedInFlutter = await sendTryNotificationEventToFlutter();
        if (!isAllowedInFlutter) {
          setAlert("디바이스 설정에서 Taxi앱 알림을 허용해주세요.");
          isAxiosCalled.current = false;
          return;
        }
      }

      await axios({
        url: "/notifications/editOptions",
        method: "post",
        data: {
          options: {
            [optionName]: value,
          },
        },
      });
      fetchNotificationOptions();
      isAxiosCalled.current = false;
    },
    [deviceToken]
  );
  const onChangeNotificationAll = useCallback(
    async (value: boolean) => {
      if (isAxiosCalled.current) return;
      isAxiosCalled.current = true;

      if (value) {
        const isAllowedInFlutter = await sendTryNotificationEventToFlutter();
        if (!isAllowedInFlutter) {
          setAlert("디바이스 설정에서 Taxi앱 알림을 허용해주세요.");
          isAxiosCalled.current = false;
          return;
        }
      }

      await axios({
        url: "/notifications/editOptions",
        method: "post",
        data: {
          options: {
            beforeDepart: value,
            chatting: value,
            notice: value,
          },
        },
      });
      fetchNotificationOptions();
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
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      padding="16px 20px 20px"
    >
      <div css={styleTitle}>
        {isNotificationOn(notificationOptions) ? (
          <AlarmOnRoundedIcon style={styleLogo} />
        ) : (
          <AlarmOffRoundedIcon style={styleLogo} />
        )}
        {t("notification")}
      </div>
      {deviceToken ? (
        <>
          <div css={styleGuide}>
            {deviceType.startsWith("app/")
              ? "앱을 닫아도 푸시 알림을 받을 수 있습니다."
              : "브라우저를 닫아도 웹 푸시 알림을 받을 수 있습니다."}
          </div>
          <div css={styleBody}>
            <SelectNotification
              text="알림"
              value={isNotificationOn(notificationOptions)}
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
        <BodyNotificationGuide />
      )}
    </Modal>
  );
};

export default ModalNotification;
