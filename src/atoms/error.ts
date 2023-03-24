import { ReactNode } from "react";
import { atom } from "recoil";

export type ErrorType = {
  title: string;
  message: ReactNode;
  record: Nullable<string>;
};

const errorAtom = atom<Nullable<ErrorType>>({
  key: "errorAtom",
  default: null,
});

export default errorAtom;
