import { atom } from "recoil";
import { LoginInfoDetailType } from "./index";

const loginInfoDetailAtom = atom<Nullable<LoginInfoDetailType>>({
  key: "loginInfoDetailAtom",
  default: null,
});

export default loginInfoDetailAtom;
