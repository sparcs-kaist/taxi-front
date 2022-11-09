import { ReactNode } from "react";
import { atom } from "recoil";

const alertAtom = atom<ReactNode>({
  key: "alertAtom",
  default: null,
});

export default alertAtom;
