import { Event } from "types/event2023fall";

import { atom } from "recoil";

export type Event2023FallInfoType = Nullable<{
  creditAmount: number;
  eventStatus: string[];
  events: Event[];
  ticket1Amount: number;
  ticket2Amount: number;
}>;

const event2023FallInfoAtom = atom<Event2023FallInfoType>({
  key: "event2023FallInfoAtom",
  default: null,
});

export default event2023FallInfoAtom;
