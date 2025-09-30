import type { FirebaseConfig } from "@/types/env";

const env = { ...import.meta.env, ...window["env"] };

// 환경변수
export const isDev = env.DEV; // automatically provided
export const backServer = isDev ? "/api" : env.REACT_APP_BACK_URL; // use proxy in dev mode
export const ioServer = isDev ? "/" : env.REACT_APP_IO_URL ?? backServer; // optional (주어지지 않은 경우 REACT_APP_BACK_URL로 설정)
export const ogServer = env.REACT_APP_OG_URL; // optional
export const s3BaseUrl = env.REACT_APP_S3_URL; // required
export const channelTalkPluginKey = env.REACT_APP_CHANNELTALK_PLUGIN_KEY; // optional
export const kakaoSDKKey = env.REACT_APP_KAKAO_SDK_KEY; // optional
export const gaTrackingId = env.REACT_APP_GA_TRACKING_ID; // optional
export const firebaseConfig: FirebaseConfig | null =
  env.REACT_APP_FIREBASE_CONFIG && JSON.parse(env.REACT_APP_FIREBASE_CONFIG); // optional
export const eventMode = env.REACT_APP_EVENT_MODE || "2025fall"; // optional. "2025fall"으로 설정 가능;

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
