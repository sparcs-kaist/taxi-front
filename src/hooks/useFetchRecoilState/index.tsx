import { useEffect } from "react";

import { useAxios } from "hooks/useTaxiAPI";

import {
  useFetchLoginInfo,
  useSetLoginInfo,
  useValueLoginInfo,
} from "./useFetchLoginInfo";
import {
  useFetchMyRooms,
  useSetMyRooms,
  useValueMyRooms,
} from "./useFetchMyRooms";
import {
  useFetchNotificationOptions,
  useSetNotificationOptions,
  useValueNotificationOptions,
} from "./useFetchNotificationOptions";
import {
  useFetchTaxiLocations,
  useSetTaxiLocations,
  useValueTaxiLocations,
} from "./useFetchTaxiLocations";

import { LoginInfoType } from "atoms/loginInfo";
import { MyRoomsType } from "atoms/myRooms";
import { notificationOptionsType } from "atoms/notificationOptions";
import { TaxiLocationsType } from "atoms/taxiLocations";

import { deviceType } from "tools/loadenv";
import {
  sendAuthUpdateEventToFlutter,
  sendTryNotificationEventToFlutter,
} from "tools/sendEventToFlutter";
import { isNotificationOn } from "tools/trans";

export type AtomName =
  | "loginInfo"
  | "taxiLocations"
  | "myRooms"
  | "notificationOptions";

type useValueRecoilStateType = {
  (atomName: "loginInfo"): LoginInfoType;
  (atomName: "taxiLocations"): TaxiLocationsType;
  (atomName: "myRooms"): MyRoomsType;
  (atomName: "notificationOptions"): notificationOptionsType;
};
const _useValueRecoilState = (atomName: AtomName) => {
  switch (atomName) {
    case "loginInfo":
      return useValueLoginInfo();
    case "taxiLocations":
      return useValueTaxiLocations();
    case "myRooms":
      return useValueMyRooms();
    case "notificationOptions":
      return useValueNotificationOptions();
  }
};
export const useValueRecoilState =
  _useValueRecoilState as useValueRecoilStateType;

export const useSetRecoilState = (atomName: AtomName) => {
  switch (atomName) {
    case "loginInfo":
      return useSetLoginInfo();
    case "taxiLocations":
      return useSetTaxiLocations();
    case "myRooms":
      return useSetMyRooms();
    case "notificationOptions":
      return useSetNotificationOptions();
  }
};

export const useFetchRecoilState = (atomName: AtomName) => {
  switch (atomName) {
    case "loginInfo":
      return useFetchLoginInfo();
    case "taxiLocations":
      return useFetchTaxiLocations();
    case "myRooms":
      return useFetchMyRooms();
    case "notificationOptions":
      return useFetchNotificationOptions();
  }
};

export const useSyncRecoilStateEffect = () => {
  const axios = useAxios();
  const loginInfo = useValueRecoilState("loginInfo");
  const notificationOptions = useValueRecoilState("notificationOptions");
  const { id: userId, deviceToken } = loginInfo || {};

  // userId 초기화 및 동기화
  const fetchLoginInfo = useFetchRecoilState("loginInfo");
  useEffect(fetchLoginInfo, []);

  // taxiLocations 초기화 및 동기화
  const fetchTaxiLocations = useFetchRecoilState("taxiLocations");
  useEffect(fetchTaxiLocations, []);

  // myRooms 초기화 및 동기화
  const fetchMyRooms = useFetchRecoilState("myRooms");
  useEffect(fetchMyRooms, [userId]);

  // notificationOptions 초기화 및 동기화
  const fetchNotificationOptions = useFetchRecoilState("notificationOptions");
  useEffect(fetchNotificationOptions, [deviceToken]);

  // Flutter에 변동된 로그인 정보 전달
  useEffect(() => {
    const isLoading = loginInfo === null;
    if (!isLoading && deviceType.startsWith("app/"))
      sendAuthUpdateEventToFlutter(loginInfo);
  }, [userId]);

  // Flutter에 초기 알림 설정 전달
  useEffect(() => {
    const tryNotification = async () => {
      const isAllowedFInFlutter = await sendTryNotificationEventToFlutter();
      if (!isAllowedFInFlutter) {
        await axios({
          url: "/notifications/editOptions",
          method: "post",
          data: {
            options: {
              beforeDepart: false,
              chatting: false,
              notice: false,
            },
          },
          onError: () => {},
        });
      }
    };
    if (
      userId &&
      deviceType.startsWith("app/") &&
      isNotificationOn(notificationOptions)
    ) {
      tryNotification();
    }
  }, [userId, notificationOptions]);
};
