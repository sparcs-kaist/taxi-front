import { atom } from "recoil";

export type deviceTokenType = Nullable<string>;

const deviceTokenAtom = atom<deviceTokenType>({
  key: "deviceTokenAtom",
  default: null,
});

export default deviceTokenAtom;
