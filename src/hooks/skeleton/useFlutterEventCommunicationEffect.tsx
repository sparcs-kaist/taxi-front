import { useEffect, useState } from "react";

import { PopupInAppNotification } from "types/notification";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import alertAtom from "atoms/alert";
import errorAtom from "atoms/error";
import { LoginInfoType } from "atoms/loginInfo";
import { useSetRecoilState } from "recoil";

import { isNotificationOn } from "tools/trans";

// global flag variable to check if the webview is in Flutter
let isWebViewInFlutter: boolean = false;

export default () => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const setError = useSetRecoilState(errorAtom);
  const loginInfo = useValueRecoilState("loginInfo");
  const { id: userId } = loginInfo || {};
  const notificationOptions = useValueRecoilState("notificationOptions");
  const fetchLoginInfo = useFetchRecoilState("loginInfo");

  const [isWebViewInFlutterState, setIsWebViewInFlutterState] =
    useState<boolean>(false);

  useEffect(() => {
    const eventListeners: Array<{
      name: string;
      listner: (event: any) => void;
    }> = [];

    // Flutter에서 webview가 준비되었을 때, 호출됩니다.
    eventListeners.push({
      name: "flutterInAppWebViewPlatformReady",
      listner: () => {
        isWebViewInFlutter = true;
        setIsWebViewInFlutterState(true);
      },
    });

    // Flutter에서 logininfo 업데이트를 요청할 때, 호출됩니다.
    eventListeners.push({
      name: "updateLoginInfo",
      listner: () => fetchLoginInfo(),
    });

    // Flutter에서 에러를 전달할 때, 호출됩니다.
    eventListeners.push({
      name: "createError",
      listner: ({
        detail: { title, message },
      }: {
        detail: { title: string; message: string };
      }) => setError({ title, message, record: null }),
    });

    // Flutter에서 Alert 모달을 띄울 때, 호출됩니다.
    eventListeners.push({
      name: "createAlert",
      listner: ({ detail }: { detail: string }) => setAlert(detail),
    });

    eventListeners.forEach(({ name, listner }) =>
      window.addEventListener(name, listner)
    );
    return () =>
      eventListeners.forEach(({ name, listner }) =>
        window.removeEventListener(name, listner)
      );
  }, []);

  // Flutter에 변동된 로그인 정보 전달
  useEffect(() => {
    const isLoading = loginInfo === null;
    if (!isLoading && isWebViewInFlutterState)
      sendAuthUpdateEventToFlutter(loginInfo);
  }, [userId, isWebViewInFlutterState]);

  // Flutter에 초기 알림 설정 전달
  useEffect(() => {
    const tryNotification = async () => {
      const isAllowedFInFlutter = await sendTryNotificationEventToFlutter();
      if (!isAllowedFInFlutter) {
        await axios({
          url: "/notifications/editOptions",
          method: "post",
          data: {
            options: {
              beforeDepart: false,
              chatting: false,
              notice: false,
            },
          },
          onError: () => {},
        });
      }
    };
    if (
      userId &&
      isWebViewInFlutterState &&
      isNotificationOn(notificationOptions)
    ) {
      tryNotification();
    }
  }, [userId, notificationOptions, isWebViewInFlutterState]);
};

// 로그인 정보 변동 시 Flutter에 이벤트를 전달합니다
export const sendAuthUpdateEventToFlutter = async (
  loginInfo: LoginInfoType
) => {
  if (!isWebViewInFlutter) return;
  try {
    await window.flutter_inappwebview.callHandler("auth_update", loginInfo);
  } catch (e) {
    console.error(e);
  }
};

// 버튼 클릭으로 인한 로그아웃 시 Flutter에 이벤트 전달합니다
// 이용약관 미동의로 인한 로그아웃 시에도 이벤트를 전달합니다
export const sendAuthLogoutEventToFlutter = async () => {
  if (!isWebViewInFlutter) return;
  try {
    await window.flutter_inappwebview.callHandler("auth_logout");
  } catch (e) {
    console.error(e);
  }
};

// 알림을 "on"으로 설정 시 Flutter에게 이벤트를 전달하고 앱의 알림 설정 여부를 반환받습니다.
export const sendTryNotificationEventToFlutter = async () => {
  if (!isWebViewInFlutter) return true;
  try {
    return await window.flutter_inappwebview.callHandler("try_notification");
  } catch (e) {
    console.error(e);
    return false;
  }
};

// 알림을 "on"으로 설정 시 Flutter에게 이벤트를 전달하고 앱의 알림 설정 여부를 반환받습니다.
export const sendClipboardCopyEventToFlutter = async (value: string) => {
  if (!isWebViewInFlutter) return true;
  try {
    await window.flutter_inappwebview.callHandler("clipboard_copy", value);
  } catch (e) {
    console.error(e);
  }
};

export const sendPopupInAppNotificationEventToFlutter = async (
  value: PopupInAppNotification
) => {
  if (!isWebViewInFlutter) return true;
  try {
    console.log("fake call", value);
    await window.flutter_inappwebview.callHandler(
      "popup_inAppNotification",
      value
    );
  } catch (e) {
    console.error(e);
  }
};
