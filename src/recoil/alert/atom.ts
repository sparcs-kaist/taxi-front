import { atom } from "recoil";

const alertAtom = atom<Nullable<String>>({
  key: "alertAtom",
  default: null,
});

export default alertAtom;
