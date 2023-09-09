import { atom } from "recoil";

export type eventInfoType = Nullable<{
  creditAmount: number;
  eventStatus: string[];
  ticket1Amount: number;
  ticket2Amount: number;
}>;

const eventInfoAtom = atom<eventInfoType>({
  key: "eventInfoAtom",
  default: null,
});

export default eventInfoAtom;
