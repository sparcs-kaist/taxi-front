import { CSSProperties } from "react";

export {};

declare global {
  type Nullable<T> = T | null | undefined;
  type CSS = CSSProperties;
  type ReportData = {
    reportedId: string;
    type: string;
    etcDetail: string;
    time: Date;
  };
  type ReportResponse = { status: number };
}
