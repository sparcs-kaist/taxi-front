import type { FirebaseConfig } from "@/types/env";

// 환경변수
export const nodeEnv = import.meta.env.DEV; // automatically provided
export const backServer = import.meta.env.REACT_APP_BACK_URL; // required
export const ioServer = import.meta.env.REACT_APP_IO_URL ?? backServer; // optional (주어지지 않은 경우 REACT_APP_BACK_URL로 설정)
export const ogServer = import.meta.env.REACT_APP_OG_URL; // optional
export const s3BaseUrl = import.meta.env.REACT_APP_S3_URL; // required
export const channelTalkPluginKey = import.meta.env
  .REACT_APP_CHANNELTALK_PLUGIN_KEY; // optional
export const kakaoSDKKey = import.meta.env.REACT_APP_KAKAO_SDK_KEY; // optional
export const gaTrackingId = import.meta.env.REACT_APP_GA_TRACKING_ID; // optional
export const firebaseConfig: Nullable<FirebaseConfig> =
  import.meta.env.REACT_APP_FIREBASE_CONFIG &&
  JSON.parse(import.meta.env.REACT_APP_FIREBASE_CONFIG); // optional
export const eventMode = import.meta.env.REACT_APP_EVENT_MODE || null; // optional. "2023fall"로 설정 가능

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
