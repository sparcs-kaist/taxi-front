import React from "react";
import Modal from "components/common/modal/Modal";
import DottedLine from "components/common/DottedLine";
import { theme } from "styles/theme";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

type ReportProps = { isOpen: boolean; onClose: () => void };

const PopupReport = (props: ReportProps) => {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  };
  const styleLogo = {
    fontSize: "21px",
    margin: "0 4px 0 8px",
  };
  const styleContainer = {
    overflow: "auto",
    marginTop: "4px",
    paddingBottom: "8px",
    marginBottom: "4px",
    minHeight: "270px",
    height: "calc(100vh - 360px)",
  };
  return (
    <Modal
      display={props.isOpen}
      onClickClose={props.onClose}
      padding="16px 12px 12px"
    >
      <div style={styleTitle}>
        <ErrorOutlineRoundedIcon style={styleLogo} />
        신고 내역
      </div>
      <DottedLine direction="row" />
      <div style={styleContainer}></div>
      <DottedLine direction="row" />
    </Modal>
  );
};

export default PopupReport;
