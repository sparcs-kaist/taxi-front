import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

import Modal from "@/components/Modal";

type ModalNoticeDetailProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
  recordMap: ExtendedRecordMap | undefined;
};

const ModalNoticeDetail = ({
  isOpen,
  onChangeIsOpen,
  recordMap,
}: ModalNoticeDetailProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      css={{ padding: "10px" }}
    >
      {recordMap && <NotionRenderer recordMap={recordMap} />}
    </Modal>
  );
};

export default ModalNoticeDetail;
