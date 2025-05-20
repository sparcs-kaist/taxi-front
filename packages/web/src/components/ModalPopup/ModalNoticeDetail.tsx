import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

import Modal from "@/components/Modal";

import theme from "@/tools/theme";

type ModalNoticeDetailProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
  recordMap: ExtendedRecordMap | undefined;
  title: string;
};

const ModalNoticeDetail = ({
  isOpen,
  onChangeIsOpen,
  recordMap,
  title,
}: ModalNoticeDetailProps) => {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      css={{ padding: "10px" }}
    >
      <div style={styleTitle}>{title}</div>
      <div>{recordMap && <NotionRenderer recordMap={recordMap} />}</div>
    </Modal>
  );
};

export default ModalNoticeDetail;
