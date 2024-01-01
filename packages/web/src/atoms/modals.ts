import { ModalElemProps } from "@/components/Modal/ModalElem";

import { atom } from "recoil";

export type ModalType = {
  id: string;
  props: ModalElemProps;
};

const modalsAtom = atom<Array<ModalType>>({
  key: "modalsAtom",
  default: [],
});

export default modalsAtom;
