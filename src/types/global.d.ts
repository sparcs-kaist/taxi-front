import type { Dayjs as _Dayjs } from "dayjs";
import type { Location as _RouterLocation } from "history";
import type { CSSProperties } from "react";

import Env from "./env";

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
  type Location = {
    _id: string;
    enName: string;
    koName: string;
  };
  type User = {
    _id: string;
    name: string;
    nickname: string;
    profileImageUrl: string;
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
    part: [
      {
        _id: string;
        name: string;
        nickname: string;
        profileImageUrl: string;
        isSettlement?: string;
      }
    ];
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
  }
}
