import type { Dayjs as _Dayjs } from "dayjs";
import type { Location as _RouterLocation } from "history";
import type { CSSProperties } from "react";

import Env from "./env";
import type { Location } from "./location";

export {};

declare global {
  type Nullable<T> = T | null | undefined;
  type RouterLocation = _RouterLocation;
  type Dayjs = _Dayjs;
  type CSS = CSSProperties;
  type PixelValue = "0" | `${number}px`;
  type Margin =
    | `${PixelValue}`
    | `${PixelValue} ${PixelValue}`
    | `${PixelValue} ${PixelValue} ${PixelValue}`
    | `${PixelValue} ${PixelValue} ${PixelValue} ${PixelValue}`;
  type Padding = Margin;
  type User = {
    _id: string;
    name: string;
    nickname: string;
    profileImageUrl: string;
    isSettlement?: "not-departed" | "paid" | "send-required" | "sent";
    readAt: Date;
    withdraw: boolean;
    badge: boolean;
    isArrived?: boolean;
    hasCarrier?: boolean; 
  };
  type Room = {
    _id: string;
    name: string;
    from: Location;
    to: Location;
    time: Date;
    madeat: Date;
    settlementTotal?: number;
    maxPartLength: number;
    part: Array<User>;
    emojiIdentifier?: string;
  };

  type ReportResponse = { status: number };
  type Report = {
    reportedId: string;
    type: "no-settlement" | "no-show" | "etc-reason";
    etcDetail: string;
    time: Date;
  };

  interface Window {
    flutter_inappwebview: {
      callHandler: (name: string, ...args: any[]) => Promise<any>;
    };
    env: Env;
    Kakao: any;
    dataLayer: any[];
  }
}
