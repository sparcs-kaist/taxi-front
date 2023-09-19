type Env = {
  NODE_ENV: "development" | "production";
  REACT_APP_BACK_URL: string;
  REACT_APP_IO_URL?: string;
  REACT_APP_OG_URL?: string;
  REACT_APP_S3_URL: string;
  REACT_APP_CHANNELTALK_PLUGIN_KEY?: string;
  REACT_APP_KAKAO_SDK_KEY?: string;
  REACT_APP_GA_TRACKING_ID?: string;
  REACT_APP_FIREBASE_CONFIG?: string;
  REACT_APP_EVENT_MODE?: string;
};

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  dynamicLink: {
    host: string;
    androidPacakgeName: string;
    iosAppBundleId: string;
    appStoreId: string;
  };
};

export default Env;
