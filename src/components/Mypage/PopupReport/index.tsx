import { useState } from "react";
import useTaxiAPI from "hooks/useTaxiAPI";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import Modal from "components/common/modal/Modal";
import DottedLine from "components/common/DottedLine";
import ReportOption, { ReportOptionType } from "./ReportOption";
import ReportList from "./ReportList";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

type ReportHistoryType = {
  reported: Array<any>; // FIXME: 신고 내역 타입 정의
  reporting: Array<any>;
};
type RecordProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PopupReport = (props: RecordProps) => {
  const { t } = useTranslation("mypage");
  const [option, setOption] = useState<ReportOptionType>("Reporting");
  const [, reportHistory] = useTaxiAPI.get("/reports/searchByUser");

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  };
  const styleGuide: CSS = {
    ...theme.font12,
    color: theme.gray_text,
    wordBreak: "keep-all",
    padding: "0 8px 12px",
  };
  const styleLogo = {
    fontSize: "21px",
    margin: "0 4px 0 8px",
  };
  const styleContainer: CSS = {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "12px",
    minHeight: "240px",
    height: "calc(100vh - 480px)",
    rowGap: "8px",
  };
  return (
    <Modal
      display={props.isOpen}
      onClickClose={props.onClose}
      padding="16px 12px"
    >
      <div style={styleTitle}>
        <ErrorOutlineRoundedIcon style={styleLogo} />
        {t("report_record")}
      </div>
      <div style={styleGuide}>{t("page_report.inquiry")}</div>
      <DottedLine direction="row" />
      <ReportOption
        option={option}
        onClick={(option: ReportOptionType) => setOption(option)}
      />
      <div style={styleContainer}>
        <ReportList
          option={option}
          selectedReportHistory={
            option === "Reporting"
              ? reportHistory?.reporting
              : reportHistory?.reported
          }
        />
      </div>
    </Modal>
  );
};

export default PopupReport;
