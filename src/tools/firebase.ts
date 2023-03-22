import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import axios from "hooks/useTaxiAPI/axios";
import { firebaseConfig } from "loadenv";

const firebaseApp = firebaseConfig && initializeApp(firebaseConfig);

const registerToken = async (trial: number) => {
  // 토큰 등록 실패 시 10초 간격으로 최대 3회 시도
  const maxTrial = 3;
  const trialIntervalInMs = 10000;
  if (trial > maxTrial) return;

  try {
    const supportsFCM = await isSupported();
    if (supportsFCM) {
      // 브라우저가 FCM을 지원하는 경우 FCM 서버로부터 deviceToken을 발급받습니다.
      const firebaseMessaging = getMessaging(firebaseApp);
      const deviceToken = await getToken(firebaseMessaging);

      // 환경변수가 주입된 서비스 워커를 새로 등록합니다.
      if ("serviceWorker" in navigator) {
        const firebaseConfigUrlParams = new URLSearchParams(
          firebaseConfig
        ).toString();
        await navigator.serviceWorker.register(
          `/firebase-messaging-sw.js?${firebaseConfigUrlParams}`
        );
      }

      // 백엔드 서버에 새 deviceToken을 등록합니다.
      await axios.post("/auth/registerDeviceToken", { deviceToken });
    } else {
      console.log("This browser does not support FCM.");
    }
  } catch (error) {
    console.error("FCM ERROR: ", error);
    setTimeout(() => registerToken(++trial), trialIntervalInMs);
  }
};

const registerEvent = () => registerToken(1);

const registerTokenOnClick = () => {
  if (firebaseApp) {
    document.addEventListener("click", registerEvent, { once: true });
    document.addEventListener("touchend", registerEvent, { once: true });
  }
};

export default registerTokenOnClick;
