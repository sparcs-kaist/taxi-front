import dotenv from "dotenv";
import { FirebaseConfig } from "types/env";

dotenv.config();

const env = { ...process.env, ...window["env"] };

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
