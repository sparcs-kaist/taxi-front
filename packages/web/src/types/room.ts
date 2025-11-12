import { Location } from "./location";

export interface Room {
  _id: string;
  name: string;
  from: Location;
  to: Location;
  time: string;
  currentNum: number;
  maxNum: number;
}