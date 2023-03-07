import { ErrorType } from "./index";
import { atom } from "recoil";

const errorAtom = atom<Nullable<ErrorType>>({
  key: "errorAtom",
  default: null,
});

export default errorAtom;
