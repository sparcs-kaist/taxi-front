import { atom } from "recoil";

export type Event2023FallInfoType = Nullable<{
  creditAmount: number;
  eventStatus: string[];
  ticket1Amount: number;
  ticket2Amount: number;
}>;

const event2023FallInfoAtom = atom<Event2023FallInfoType>({
  key: "event2023FallInfoAtom",
  default: null,
});

export default event2023FallInfoAtom;
