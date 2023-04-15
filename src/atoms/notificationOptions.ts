import { atom } from "recoil";

export type notificationOptionsType = Nullable<{
  advertisement: boolean;
  beforeDepart: boolean;
  chatting: boolean;
  notice: boolean;
  keywords: [string];
}>;

const notificationOptionsAtom = atom<notificationOptionsType>({
  key: "notificationOptionsAtom",
  default: null,
});

export default notificationOptionsAtom;
