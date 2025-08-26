import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

import DottedLine from "@/components/DottedLine";
import Modal from "@/components/Modal";

import "./ModalNoticeDetailBody.css";

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
    padding: "10px 32px 12px 8px",
  };

  const styleBody = {
    padding: "10px 0px 10px 0px",
  };

  const NotionImage = (props: any) => {
    const { src, alt, style, ...rest } = props;
    return (
      <div
        style={{
          maxWidth: "100%",
          maxHeight: "45vh",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          {...rest} // ✅ className 등 전달
          style={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
            ...(style || {}), // ✅ Notion이 내려주는 style 보존
          }}
        />
      </div>
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      css={{ padding: "10px", overflowY: "auto", maxHeight: "70vh" }}
    >
      <div style={styleTitle}>{title}</div>
      <DottedLine />
      <div style={styleBody}>
        {recordMap && (
          <NotionRenderer
            recordMap={recordMap}
            bodyClassName="less-indent-notion-body"
            components={{ Image: NotionImage }}
            forceCustomImages
          />
        )}
      </div>
    </Modal>
  );
};

export default ModalNoticeDetail;
