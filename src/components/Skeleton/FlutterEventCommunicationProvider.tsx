import { useEffect } from "react";

import { useAxios } from "hooks/useTaxiAPI";

import loginInfoAtom from "atoms/loginInfo";
import { useSetRecoilState } from "recoil";

// global flag variable to check if the webview is in Flutter
let isWebViewInFlutter: boolean = false;

const FlutterEventCommunicationProvider = () => {
  const axios = useAxios();
  const setLoginInfoDetail = useSetRecoilState(loginInfoAtom);

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
      listner: () =>
        axios({
          url: "/logininfo",
          method: "get",
          onSuccess: (data) => setLoginInfoDetail(data),
        }),
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

// 로그인 시 Flutter에 로그인 이벤트 전달합니다
export const sendLoginEventToFlutter = () => {
  if (!isWebViewInFlutter) return;
  window.flutter_inappwebview.callHandler("login");
};

// 로그아웃 시 Flutter에 로그아웃 이벤트 전달합니다
export const sendLogoutEventToFlutter = () => {
  if (!isWebViewInFlutter) return;
  window.flutter_inappwebview.callHandler("logout");
};
