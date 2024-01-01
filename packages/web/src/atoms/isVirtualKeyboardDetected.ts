import { atom } from "recoil";

export type IsVirtualKeyboardDetectedType = boolean;

const isVirtualKeyboardDetectedAtom = atom<IsVirtualKeyboardDetectedType>({
  key: "isVirtualKeyboardDetectedAtom",
  default: false,
});

export default isVirtualKeyboardDetectedAtom;
