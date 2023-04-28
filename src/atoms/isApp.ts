import { atom } from "recoil";

export type IsAppAtomType = boolean;

const isAppAtom = atom<IsAppAtomType>({
  key: "isAppAtom",
  default: false,
});

export default isAppAtom;
