import { ReactNode } from "react";
import errorAtom from "./atom";

export type ErrorType = {
  title: string;
  message: ReactNode;
  record: Nullable<string>;
};

export default errorAtom;
