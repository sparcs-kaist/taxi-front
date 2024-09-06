import Modal from "@/components/Modal";

import BodyEvent2024FallAbuseWarning from "./Body/BodyEvent2024FallAbuseWarning";

import theme from "@/tools/theme";

import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";

type ModalEvent2024FallAbuseWarningProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
>;

const ModalEvent2024FallAbuseWarning = ({
  ...modalProps
}: ModalEvent2024FallAbuseWarningProps) => {
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
      <BodyEvent2024FallAbuseWarning
        onChangeIsOpen={modalProps?.onChangeIsOpen}
      />
    </Modal>
  );
};

export default ModalEvent2024FallAbuseWarning;
