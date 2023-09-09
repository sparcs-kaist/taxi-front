import { useState } from "react";

import { ModalEvent2023FallMissionComplete } from "components/ModalPopup";

const EventProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalEvent2023FallMissionComplete
      isOpen={isOpen}
      onChangeIsOpen={setIsOpen}
    />
  );
};

export default EventProvider;
