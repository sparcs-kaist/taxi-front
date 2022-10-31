import { atom } from "recoil";

const alertAtom = atom<Nullable<string>>({
  key: "alertAtom",
  default: null,
});

export default alertAtom;
