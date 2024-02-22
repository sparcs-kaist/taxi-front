import Modal from "@/components/Modal";

import BodyEvent2024AbuseWarning from "./Body/BodyEvent2024AbuseWarning";

import theme from "@/tools/theme";

import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";

type ModalEvent2024AbuseWarningProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
>;

const ModalChatReport = ({
  ...modalProps
}: ModalEvent2024AbuseWarningProps) => {
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
        경고
      </div>
      <BodyEvent2024AbuseWarning onChangeIsOpen={modalProps?.onChangeIsOpen} />
    </Modal>
  );
};

export default ModalChatReport;
