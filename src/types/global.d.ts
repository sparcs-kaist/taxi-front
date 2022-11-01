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
    type: string;
    etcDetail: string;
    time: Date;
  };
  type ReportResponse = { status: number };
}
