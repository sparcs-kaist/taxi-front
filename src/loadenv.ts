import dotenv from "dotenv";

dotenv.config();

const env = { ...process.env, ...window["env"] };

export const nodeEnv: string = env.NODE_ENV; // automatically provided
export const backServer: string = env.REACT_APP_BACK_URL; // required
export const ioServer: string = env.REACT_APP_IO_URL ?? backServer; // optional (주어지지 않은 경우 REACT_APP_BACK_URL로 설정)
export const ogServer: Nullable<string> = env.REACT_APP_OG_URL; // optional
export const s3BaseUrl: string = env.REACT_APP_S3_URL; // required
export const channelTalkPluginKey: Nullable<string> =
  env.REACT_APP_CHANNELTALK_PLUGIN_KEY; // optional
export const kakaoSDKKey: Nullable<string> = env.REACT_APP_KAKAO_SDK_KEY; // optional
export const gaTrackingId: Nullable<string> = env.REACT_APP_GA_TRACKING_ID; // optional
export const firebaseConfig: Nullable<{
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  dinamicLink: {
    host: string;
    androidPacakgeName: string;
    iosAppBundleId: string;
    appStoreId: string;
  };
}> = env.REACT_APP_FIREBASE_CONFIG && JSON.parse(env.REACT_APP_FIREBASE_CONFIG); // optional
