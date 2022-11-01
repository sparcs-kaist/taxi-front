import { CSSProperties } from "react";

export {};

type Value = "0" | `${number}px`;

declare global {
  type Nullable<T> = T | null | undefined;
  type CSS = CSSProperties;
  type Margin = `${Value} ${Value}` | `${Value} ${Value} ${number}px`;
  type Padding = `${Value} ${Value}` | `${Value} ${Value} ${number}px`;
  type ReportData = {
    reportedId: string;
    type: string;
    etcDetail: string;
    time: Date;
  };
  type ReportResponse = { status: number };
}
