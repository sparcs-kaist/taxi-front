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
  type ReportData = {
    reportedId: string;
    type: "no-settlement" | "no-show" | "etc-reason";
    etcDetail: string;
    time: Date;
  };
  type Location = {
    _id: string;
    enName: string;
    koName: string;
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
    roomId: string;
    type:
      | "text"
      | "in"
      | "out"
      | "s3img"
      | "payment"
      | "settlement"
      | "account";
    authorId: string;
    authorName: string;
    authorProfileUrl: string;
    content: string;
    time: Date;
    isValid: boolean;
  };
}
