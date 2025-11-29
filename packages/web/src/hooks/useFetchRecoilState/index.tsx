import { useEffect } from "react";

import {
  useFetchEvent2023FallInfo,
  useSetEvent2023FallInfo,
  useValueEvent2023FallInfo,
} from "./useFetchEvent2023FallInfo";
import {
  useFetchEvent2024FallInfo,
  useSetEvent2024FallInfo,
  useValueEvent2024FallInfo,
} from "./useFetchEvent2024FallInfo";
import {
  useFetchEvent2024SpringInfo,
  useSetEvent2024SpringInfo,
  useValueEvent2024SpringInfo,
} from "./useFetchEvent2024SpringInfo";
import {
  useFetchEvent2025FallInfo,
  useSetEvent2025FallInfo,
  useValueEvent2025FallInfo,
} from "./useFetchEvent2025FallInfo";
import {
  useFetchEvent2025SpringInfo,
  useSetEvent2025SpringInfo,
  useValueEvent2025SpringInfo,
} from "./useFetchEvent2025SpringInfo";
import {
  useFetchGameInfo,
  useSetGameInfo,
  useValueGameInfo, // [추가]
} from "./useFetchGameInfo";
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
import { Event2024FallInfoType } from "@/atoms/event2024FallInfo";
import { Event2024SpringInfoType } from "@/atoms/event2024SpringInfo";
import { Event2025FallInfoType } from "@/atoms/event2025FallInfo";
import { Event2025SpringInfoType } from "@/atoms/event2025SpringInfo";
import { GameInfoType } from "@/atoms/gameInfo";
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
  | "event2024SpringInfo"
  | "event2024FallInfo"
  | "event2025SpringInfo"
  | "event2025FallInfo"
  | "gameInfo";

type useValueRecoilStateType = {
  (atomName: "loginInfo"): LoginInfoType;
  (atomName: "taxiLocations"): TaxiLocationsType;
  (atomName: "myRooms"): MyRoomsType;
  (atomName: "notificationOptions"): notificationOptionsType;
  (atomName: "event2023FallInfo"): Event2023FallInfoType;
  (atomName: "event2024SpringInfo"): Event2024SpringInfoType;
  (atomName: "event2024FallInfo"): Event2024FallInfoType;
  (atomName: "event2025SpringInfo"): Event2025SpringInfoType;
  (atomName: "event2025FallInfo"): Event2025FallInfoType;
  (atomName: "gameInfo"): GameInfoType;
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
    case "event2024FallInfo":
      return useValueEvent2024FallInfo();
    case "event2025SpringInfo":
      return useValueEvent2025SpringInfo();
    case "event2025FallInfo":
      return useValueEvent2025FallInfo();
    case "gameInfo":
      return useValueGameInfo();
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
    case "event2024FallInfo":
      return useSetEvent2024FallInfo();
    case "event2025SpringInfo":
      return useSetEvent2025SpringInfo();
    case "event2025FallInfo":
      return useSetEvent2025FallInfo();
    case "gameInfo":
      return useSetGameInfo();
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
    case "event2024FallInfo":
      return useFetchEvent2024FallInfo();
    case "event2025SpringInfo":
      return useFetchEvent2025SpringInfo();
    case "event2025FallInfo":
      return useFetchEvent2025FallInfo();
    case "gameInfo":
      return useFetchGameInfo();
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

  // event2024FallInfo 초기화 및 동기화
  const fetchEvent2024FallInfo = useFetchRecoilState("event2024FallInfo");
  useEffect(fetchEvent2024FallInfo, [userId]);

  // event2025SpringInfo 초기화 및 동기화
  const fetchEvent2025SpringInfo = useFetchRecoilState("event2025SpringInfo");
  useEffect(fetchEvent2025SpringInfo, [userId]);

  // event2025FallInfo 초기화 및 동기화
  const fetchEvent2025FallInfo = useFetchRecoilState("event2025FallInfo");
  useEffect(fetchEvent2025FallInfo, [userId]);

  // gameInfo 초기화 및 동기화
  const fetchGameInfo = useFetchRecoilState("gameInfo");
  useEffect(fetchGameInfo, [userId]);
};

export const useIsLogin = (): boolean => {
  const isLogin = !!useValueRecoilState("loginInfo")?.id;
  return isLogin;
};
