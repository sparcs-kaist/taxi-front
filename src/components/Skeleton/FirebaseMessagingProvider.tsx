import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { useCallback, useEffect } from "react";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import { firebaseConfig } from "loadenv";

const firebaseApp = firebaseConfig && initializeApp(firebaseConfig);

const FirebaseMessagingProvider = () => {
  const axios = useAxios();
  const { id: userId, deviceToken } = useValueRecoilState("loginInfo") || {};
  const fetchLoginInfo = useFetchRecoilState("loginInfo");

  const registerToken = useCallback(async (trial: number) => {
    // 토큰 등록 실패 시 10초 간격으로 최대 3회 시도
    const maxTrial = 3;
    const trialIntervalInMs = 10000;
    if (trial > maxTrial) return;

    try {
      const isFCMSupported = await isSupported();
      if (!isFCMSupported || !navigator?.serviceWorker) {
        console.log("This browser does not support FCM.");
        return;
      }

      // 브라우저가 FCM을 지원하는 경우 FCM 서버로부터 deviceToken을 발급받습니다.
      const firebaseMessaging = getMessaging(firebaseApp);
      const newDeviceToken = await getToken(firebaseMessaging);

      // 환경변수가 주입된 서비스 워커를 새로 등록합니다.
      const firebaseConfigUrlParams = new URLSearchParams(
        firebaseConfig
      ).toString();
      await navigator.serviceWorker.register(
        `/firebase-messaging-sw.js?${firebaseConfigUrlParams}`
      );

      // 백엔드 서버에 새 deviceToken을 등록합니다.
      await axios({
        url: "/notifications/registerDeviceToken",
        method: "post",
        data: { deviceToken: newDeviceToken },
        onSuccess: fetchLoginInfo,
        onError: () => {},
      });
    } catch (error) {
      console.error("FCM ERROR: ", error);
      setTimeout(() => registerToken(++trial), trialIntervalInMs);
    }
  }, []);

  const registerEvent = useCallback(() => registerToken(1), []);

  useEffect(() => {
    // FCM 디바이스 토큰 등록
    if (userId && firebaseApp && !deviceToken) {
      // @link: https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
      // Browsers will explicitly disallow notifications not triggered in response to a user gesture.
      // Firefox is already doing this from version 72, for example.

      // registerEvent();
      document.addEventListener("click", registerEvent, { once: true });
      document.addEventListener("touchend", registerEvent, { once: true });
    }
  }, [userId, deviceToken]);

  return null;
};

export default FirebaseMessagingProvider;
