import React, { useState } from "react";
import TOSModal from "./TOSModal";

const TOS = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <TOSModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        isAgreed={true}
      />
      <input type="button" value="hi" onClick={() => setIsOpen(true)} />
    </div>
  );
};

export default TOS;
