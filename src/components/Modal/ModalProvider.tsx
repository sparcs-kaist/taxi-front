import modalsAtom from "@/atoms/modals";

import ModalElem from "./ModalElem";

import { useRecoilValue } from "recoil";

const ModalProvider = () => {
  const modals = useRecoilValue(modalsAtom);
  return (
    <>
      {modals.map(({ id, props }) => (
        <ModalElem key={id} {...props} />
      ))}
    </>
  );
};

export default ModalProvider;
