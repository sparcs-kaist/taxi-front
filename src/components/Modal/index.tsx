import modalsAtom from "@/atoms/modals";
import useDateToken from "@/hooks/useDateToken";
import { useEffect } from "react";

import { ModalElemProps } from "./ModalElem";

import { useSetRecoilState } from "recoil";

const Modal = (props: ModalElemProps) => {
  const [id] = useDateToken();
  const setModals = useSetRecoilState(modalsAtom);

  useEffect(() => {
    setModals((prev) => [...prev, { id, props }]);
    return () => setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  useEffect(() => {
    setModals((prev) =>
      prev.map((modal) => (modal.id === id ? { id, props } : modal))
    );
  }, Object.values(props));

  return null;
};

export default Modal;
