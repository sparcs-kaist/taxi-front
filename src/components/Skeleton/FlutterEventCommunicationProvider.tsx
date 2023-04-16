import { useEffect } from "react";

import { useFetchRecoilState } from "hooks/useFetchRecoilState";

import alertAtom from "atoms/alert";
import errorAtom from "atoms/error";
import { LoginInfoType } from "atoms/loginInfo";
import { useSetRecoilState } from "recoil";

// global flag variable to check if the webview is in Flutter
let isWebViewInFlutter: boolean = false;

const FlutterEventCommunicationProvider = () => {
  const setAlert = useSetRecoilState(alertAtom);
  const setError = useSetRecoilState(errorAtom);
  const fetchLoginInfo = useFetchRecoilState("loginInfo");

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

  return null;
};

export default FlutterEventCommunicationProvider;

export const getIsWebViewInFlutter = () => isWebViewInFlutter;

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
