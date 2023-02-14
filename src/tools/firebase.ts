import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import axios from "tools/axios";

const firebaseConfig = {
  apiKey: "AIzaSyDHXTGYqV4gxXppv2Q1IQiegT6YhQLKN1c",
  authDomain: "taxi-app-d226a.firebaseapp.com",
  projectId: "taxi-app-d226a",
  storageBucket: "taxi-app-d226a.appspot.com",
  messagingSenderId: "595225681170",
  appId: "1:595225681170:web:b49bfd19de352984e227cb",
  measurementId: "G-1CZN13H363",
};

const firebaseApp = initializeApp(firebaseConfig);

const requestNotification = async () => {
  try {
    const supportsFCM = await isSupported();
    if (supportsFCM) {
      const firebaseMessaging = getMessaging(firebaseApp);
      const token = await getToken(firebaseMessaging);
      await axios.post("/auth/registerDeviceToken", { deviceToken: token });
    } else {
      console.log("This browser does not support FCM.");
    }
  } catch (error) {
    console.error("FCM ERROR: ", error);
  }
};

export default requestNotification;
