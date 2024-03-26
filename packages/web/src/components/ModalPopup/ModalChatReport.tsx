import { useEffect, useState } from "react";

import type { Report } from "@/types/report";

import Modal from "@/components/Modal";

import BodyChatReportDone from "./Body/BodyChatReportDone";
import BodyChatReportSelectType from "./Body/BodyChatReportSelectType";
import BodyChatReportSelectUser from "./Body/BodyChatReportSelectUser";

import theme from "@/tools/theme";

import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";

type ModalChatReportProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
> & { roomInfo: Room; userOid?: string };

const ModalChatReport = ({
  roomInfo,
  userOid,
  ...modalProps
}: ModalChatReportProps) => {
  const [reportedId, setReportedId] =
    useState<Nullable<Report["reportedId"]>>();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (userOid && roomInfo.part.find((user) => user._id === userOid)) {
      setReportedId(userOid);
      setIsSelected(true);
      setIsSubmitted(false);
    } else {
      setReportedId(undefined);
      setIsSelected(false);
      setIsSubmitted(false);
    }
  }, [roomInfo, userOid, modalProps.isOpen]);

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };

  return (
    <Modal {...modalProps} padding="16px 12px 12px">
      <div css={styleTitle}>
        <ReportGmailerrorredRoundedIcon style={styleIcon} />
        신고하기
      </div>
      {!reportedId || !isSelected ? (
        <BodyChatReportSelectUser
          roomInfo={roomInfo}
          reportedId={reportedId}
          setReportedId={setReportedId}
          setIsSelected={setIsSelected}
          onChangeIsOpen={modalProps?.onChangeIsOpen}
        />
      ) : !isSubmitted ? (
        <BodyChatReportSelectType
          roomInfo={roomInfo}
          reportedId={reportedId}
          setIsSelected={setIsSelected}
          setIsSubmitted={setIsSubmitted}
        />
      ) : (
        <BodyChatReportDone onChangeIsOpen={modalProps?.onChangeIsOpen} />
      )}
    </Modal>
  );
};

export default ModalChatReport;
