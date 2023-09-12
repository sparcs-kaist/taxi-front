import { useState } from "react";

import { ModalEvent2023FallRandomBox } from "components/ModalPopup";

const EventProvider = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ModalEvent2023FallRandomBox isOpen={isOpen} onChangeIsOpen={setIsOpen} />
  );
};

export default EventProvider;
