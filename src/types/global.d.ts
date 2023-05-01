import { CSSProperties } from "react";

export {};

declare global {
  type Nullable<T> = T | null | undefined;
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
    name: string;
    from: Location;
    to: Location;
    time: string;
    madeat: string;
    settlementTotal?: number;
    maxPartLength: number;
    part: [
      {
        _id: string;
        name: string;
        nickname: string;
        profileImageUrl: string;
      }
    ];
  };
  type Chat = {
    roomId: string; // 방의 objectId
    type:
      | "text"
      | "in"
      | "out"
      | "s3img"
      | "payment"
      | "settlement"
      | "account"; // 메시지 종류 (text|in|out|s3img)
    authorId: string; // 작성자 objectId
    authorName?: string; // 작성자 닉네임 (사용자 입,퇴장 알림 등 전체 메시지일 때: null)
    authorProfileUrl?: string;
    content: string;
    time: Date; // UTC 시각
    isValid: boolean;
    inOutNames: [string];
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
    Kakao: any;
  }
}
