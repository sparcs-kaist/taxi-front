import dotenv from "dotenv";

import type { FirebaseConfig } from "types/env";

dotenv.config();

const env = { ...process.env, ...window["env"] };

// 환경변수
export const nodeEnv = env.NODE_ENV; // automatically provided
export const backServer = env.REACT_APP_BACK_URL; // required
export const ioServer = env.REACT_APP_IO_URL ?? backServer; // optional (주어지지 않은 경우 REACT_APP_BACK_URL로 설정)
export const ogServer = env.REACT_APP_OG_URL; // optional
export const s3BaseUrl = env.REACT_APP_S3_URL; // required
export const channelTalkPluginKey = env.REACT_APP_CHANNELTALK_PLUGIN_KEY; // optional
export const kakaoSDKKey = env.REACT_APP_KAKAO_SDK_KEY; // optional
export const gaTrackingId = env.REACT_APP_GA_TRACKING_ID; // optional
export const firebaseConfig: Nullable<FirebaseConfig> =
  env.REACT_APP_FIREBASE_CONFIG && JSON.parse(env.REACT_APP_FIREBASE_CONFIG); // optional
export const eventMode: Nullable<string> = undefined; // "2023fall";

// devicet-type 감지
const userAgent = navigator.userAgent.toLowerCase();
const maxTouchPoints = navigator.maxTouchPoints || 0;
export const deviceType = userAgent.includes("taxi-app-webview/ios")
  ? "app/ios"
  : userAgent.includes("taxi-app-webview/android")
  ? "app/android"
  : userAgent.includes("taxi-app-webview")
  ? "app/else"
  : userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod") ||
    (userAgent.includes("macintosh") && maxTouchPoints > 1)
  ? "mobile/ios"
  : userAgent.includes("android")
  ? "mobile/android"
  : "else";
