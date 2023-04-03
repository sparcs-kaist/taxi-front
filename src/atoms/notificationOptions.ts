import { atom } from "recoil";

export type notificationOptionsType = {
  advertisement: boolean;
  beforeDepart: boolean;
  chatting: boolean;
  notice: boolean;
  keywords: [string];
};

const notificationOptionsAtom = atom<Nullable<notificationOptionsType>>({
  key: "notificationOptionsAtom",
  default: null,
});

export default notificationOptionsAtom;
