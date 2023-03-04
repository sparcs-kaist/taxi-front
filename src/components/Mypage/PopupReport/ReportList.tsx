import React from "react";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { date2str } from "tools/moment";
import { ReportOptionType } from "./ReportOption";
import DottedLine from "components/common/DottedLine";
import Empty from "components/common/Empty";

type ReportListProps = {
  option: ReportOptionType;
  selectedReportHistory: Array<any>;
};

const ReportList = (props: ReportListProps) => {
  const { t } = useTranslation("mypage");
  const styleBox: CSS = {
    display: "flex",
    flexDirection: "column",
    padding: "10px 12px",
    borderRadius: "12px",
    rowGap: "6px",
    boxShadow: theme.shadow_gray_button_inset,
    backgroundColor: theme.gray_background,
  };
  const styleRow: CSS = {
    display: "flex",
    flexWrap: "nowrap",
    columnGap: "8px",
  };
  const styleProperty = {
    ...theme.font12,
    color: theme.gray_text,
    minWidth: "58px",
  };
  const styleInfo: CSS = {
    ...theme.font12,
  };
  const getTypeText = (type: string) => {
    return type === "no-settlement"
      ? t("page_report.no_settlement")
      : type === "no-show"
      ? t("page_report.no_show")
      : t("page_report.etc_reason");
  };
  if (!props.selectedReportHistory?.length) {
    return (
      <Empty screen="mobile">
        {props.option === "Reporting"
          ? t("page_report.empty_reported")
          : t("page_report.empty_received")}
      </Empty>
    );
  }
  return (
    <>
      {props.selectedReportHistory.map((report) => {
        return (
          <div key={report._id} style={styleBox}>
            <div style={styleRow}>
              <div style={styleProperty}>{t("page_report.reason")}</div>
              <div style={{ ...styleInfo, color: theme.purple }}>
                {getTypeText(report.type)}
              </div>
            </div>
            <DottedLine direction="row" margin="2px 0" />
            {props.option === "Reporting" && (
              <div style={styleRow}>
                <div style={styleProperty}>{t("nickname")}</div>
                <div style={styleInfo}>{report.reportedId.nickname}</div>
              </div>
            )}
            <div style={styleRow}>
              <div style={styleProperty}>{t("page_report.date")}</div>
              <div style={styleInfo}>{date2str(report.time)}</div>
            </div>
            {report.type === "etc-reason" && (
              <div style={styleRow}>
                <div style={styleProperty}>{t("page_report.etc_reason")}</div>
                <div style={styleInfo}>{report.etcDetail}</div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ReportList;
