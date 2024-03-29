import { useEffect } from "react";

import {
  useFetchEvent2023FallInfo,
  useSetEvent2023FallInfo,
  useValueEvent2023FallInfo,
} from "./useFetchEvent2023FallInfo";
import {
  useFetchEvent2024SpringInfo,
  useSetEvent2024SpringInfo,
  useValueEvent2024SpringInfo,
} from "./useFetchEvent2024SpringInfo";
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

import { Event2023FallInfoType } from "@/atoms/event2023FallInfo";
import { Event2024SpringInfoType } from "@/atoms/event2024SpringInfo";
import { LoginInfoType } from "@/atoms/loginInfo";
import { MyRoomsType } from "@/atoms/myRooms";
import { notificationOptionsType } from "@/atoms/notificationOptions";
import { TaxiLocationsType } from "@/atoms/taxiLocations";

export type AtomName =
  | "loginInfo"
  | "taxiLocations"
  | "myRooms"
  | "notificationOptions"
  | "event2023FallInfo"
  | "event2024SpringInfo";

type useValueRecoilStateType = {
  (atomName: "loginInfo"): LoginInfoType;
  (atomName: "taxiLocations"): TaxiLocationsType;
  (atomName: "myRooms"): MyRoomsType;
  (atomName: "notificationOptions"): notificationOptionsType;
  (atomName: "event2023FallInfo"): Event2023FallInfoType;
  (atomName: "event2024SpringInfo"): Event2024SpringInfoType;
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
    case "event2023FallInfo":
      return useValueEvent2023FallInfo();
    case "event2024SpringInfo":
      return useValueEvent2024SpringInfo();
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
    case "event2023FallInfo":
      return useSetEvent2023FallInfo();
    case "event2024SpringInfo":
      return useSetEvent2024SpringInfo();
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
    case "event2023FallInfo":
      return useFetchEvent2023FallInfo();
    case "event2024SpringInfo":
      return useFetchEvent2024SpringInfo();
  }
};

export const useSyncRecoilStateEffect = () => {
  const loginInfo = useValueRecoilState("loginInfo");
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

  // event2023FallInfo 초기화 및 동기화
  const fetchEvent2023FallInfo = useFetchRecoilState("event2023FallInfo");
  useEffect(fetchEvent2023FallInfo, [userId]);

  // event2024SpringInfo 초기화 및 동기화
  const fetchEvent2024SpringInfo = useFetchRecoilState("event2024SpringInfo");
  useEffect(fetchEvent2024SpringInfo, [userId]);
};

export const useIsLogin = (): boolean => {
  const isLogin = !!useValueRecoilState("loginInfo")?.id;
  return isLogin;
};
