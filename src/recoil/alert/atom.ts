import { atom } from "recoil";

const alertAtom = atom<Nullable<string>>({
  key: "alertAtom",
  default: "",
});

export default alertAtom;
