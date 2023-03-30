import { CSSProperties } from "react";
import { FunctionComponent, SVGProps } from "react";

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
  type ReportResponse = { status: number };
}

// declare module "*.svg" {
//   export const ReactComponent: FunctionComponent<
//     SVGProps<SVGSVGElement> & { title?: string }
//   >;
//   const src: string;
//   export default src;
// }
