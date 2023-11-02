import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useQuery } from "@/hooks/useTaxiAPI";

import DottedLine from "@/components/DottedLine";
import Modal from "@/components/Modal";
import Navigation from "@/components/Navigation";

import BodyReport from "./Body/BodyReport";

import theme from "@/tools/theme";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

// type ReportHistoryType = {
//   reported: Array<any>; // FIXME: 신고 내역 타입 정의
//   reporting: Array<any>;
// };
type RecordProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalReport = (props: RecordProps) => {
  const { t } = useTranslation("mypage");
  const [, reportHistory] = useQuery.get("/reports/searchByUser");

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  };
  const styleGuide = {
    ...theme.font12,
    color: theme.gray_text,
    wordBreak: "keep-all" as any,
    padding: "0 8px 12px",
  };
  const styleLogo = {
    fontSize: "21px",
    margin: "0 4px 0 8px",
  };

  const pages = useMemo(
    () => [
      {
        key: "Reporting",
        name: t("page_report.reported"),
        body: (
          <BodyReport
            option="Reporting"
            selectedReportHistory={reportHistory?.reporting}
          />
        ),
      },
      {
        key: "Reported",
        name: t("page_report.received"),
        body: (
          <BodyReport
            option="Reported"
            selectedReportHistory={reportHistory?.reported}
          />
        ),
      },
    ],
    [reportHistory]
  );

  return (
    <Modal
      isOpen={props.isOpen}
      onChangeIsOpen={props.onChangeIsOpen}
      padding="16px 12px"
    >
      <div css={styleTitle}>
        <ErrorOutlineRoundedIcon style={styleLogo} />
        {t("report_record")}
      </div>
      <div css={styleGuide}>{t("page_report.inquiry")}</div>
      <DottedLine />
      <div css={{ height: "12px" }} />
      <Navigation pages={pages} />
    </Modal>
  );
};

export default ModalReport;
