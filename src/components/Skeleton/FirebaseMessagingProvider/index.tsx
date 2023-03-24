import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import { registerTokenOnClick } from "./firebase";

const FirebaseMessagingProvider = () => {
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const userId = loginInfoDetail?.id;

  useEffect(() => {
    // FCM 디바이스 토큰 등록
    if (userId) registerTokenOnClick();
  }, [userId]);

  return null;
};

export default FirebaseMessagingProvider;
