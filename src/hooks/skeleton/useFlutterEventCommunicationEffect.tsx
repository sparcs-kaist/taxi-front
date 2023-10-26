import alertAtom from "@/atoms/alert";
import errorAtom from "@/atoms/error";
import { LoginInfoType } from "@/atoms/loginInfo";
import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";
import { isNotificationOn } from "@/tools/trans";
import { InAppNotification } from "@/types/inAppNotification";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useSetRecoilState } from "recoil";

/** flag variable to check if the webview is in Flutter */
let isWebViewInFlutter: boolean = false;

export default () => {
  const axios = useAxios();
  const history = useHistory();
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

    // Flutter에서 history에 새로운 path를 push 할 때, 호출됩니다.
    eventListeners.push({
      name: "pushHistory",
      listner: ({ detail }: { detail: string }) => history.push(detail),
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

/** 로그인 정보 변동 시 Flutter에 이벤트를 전달합니다 */
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

/**
 * 버튼 클릭으로 인한 로그아웃 시 Flutter에 이벤트 전달합니다
 * 이용약관 미동의로 인한 로그아웃 시에도 이벤트를 전달합니다
 */
export const sendAuthLogoutEventToFlutter = async () => {
  if (!isWebViewInFlutter) return;
  try {
    await window.flutter_inappwebview.callHandler("auth_logout");
  } catch (e) {
    console.error(e);
  }
};

/** 알림을 "on"으로 설정 시 Flutter에게 이벤트를 전달하고 앱의 알림 설정 여부를 반환받습니다. */
export const sendTryNotificationEventToFlutter = async (): Promise<boolean> => {
  if (!isWebViewInFlutter) return true;
  try {
    return await window.flutter_inappwebview.callHandler("try_notification");
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * 클립보드로 텍스트 복사 시 Flutter에게 이벤트를 전달합니다.
 * 복사 여부를 반환받습니다.
 */
export const sendClipboardCopyEventToFlutter = async (
  value: string
): Promise<boolean> => {
  if (!isWebViewInFlutter) return false;
  try {
    const result = await window.flutter_inappwebview.callHandler(
      "clipboard_copy",
      value
    );
    return !!result;
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * 인앱 알림 발생 시 Flutter에 이벤트를 전달합니다.
 * 인앱 알림 성공 여부를 반환받습니다.
 */
export const sendPopupInAppNotificationEventToFlutter = async (
  value: InAppNotification
): Promise<boolean> => {
  if (!isWebViewInFlutter) return false;
  try {
    const result = await window.flutter_inappwebview.callHandler(
      "popup_inAppNotification",
      value
    );
    return !!result;
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * 인스타그램 스토리 공유 이벤트 발생 시 Flutter에 이벤트를 전달합니다.
 * 인스타그램 실행 여부를 반환받습니다.
 */
export const sendPopupInstagramStoryShareToFlutter = async (value: {
  backgroundLayerUrl: string;
  stickerLayerUrl: string;
}): Promise<boolean> => {
  if (!isWebViewInFlutter) return false;
  try {
    const result = await window.flutter_inappwebview.callHandler(
      "popup_instagram_story_share",
      value
    );
    return !!result;
  } catch (e) {
    console.error(e);
    return false;
  }
};
