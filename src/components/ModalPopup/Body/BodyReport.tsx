import { useTranslation } from "react-i18next";

import DottedLine from "components/DottedLine";
import Empty from "components/Empty";

import { date2str } from "tools/moment";
import theme from "tools/theme";

type BodyReportProps = {
  option: "Reporting" | "Reported";
  selectedReportHistory: Array<any>;
};

const ReportList = (props: BodyReportProps) => {
  const { t } = useTranslation("mypage");

  const styleContainer = {
    display: "flex",
    flexDirection: "column" as any,
    overflow: "auto",
    borderRadius: "12px",
    minHeight: "240px",
    height: "calc(100vh - 480px)",
    rowGap: "8px",
  };
  const styleBox = {
    display: "flex",
    flexDirection: "column" as any,
    padding: "10px 12px",
    borderRadius: "12px",
    rowGap: "6px",
    boxShadow: theme.shadow_gray_button_inset,
    backgroundColor: theme.gray_background,
  };
  const styleRow = {
    display: "flex",
    flexWrap: "nowrap" as any,
    columnGap: "8px",
  };
  const styleProperty = {
    ...theme.font12,
    color: theme.gray_text,
    minWidth: "58px",
  };
  const styleInfo = {
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
      <Empty type="mobile">
        {props.option === "Reporting"
          ? t("page_report.empty_reported")
          : t("page_report.empty_received")}
      </Empty>
    );
  }
  return (
    <div css={styleContainer}>
      {props.selectedReportHistory.map((report) => {
        return (
          <div key={report._id} css={styleBox}>
            <div css={styleRow}>
              <div style={styleProperty}>{t("page_report.reason")}</div>
              <div style={{ ...styleInfo, color: theme.purple }}>
                {getTypeText(report.type)}
              </div>
            </div>
            <DottedLine direction="row" margin="2px 0" />
            {props.option === "Reporting" && (
              <div css={styleRow}>
                <div style={styleProperty}>{t("nickname")}</div>
                <div style={styleInfo}>{report.reportedId.nickname}</div>
              </div>
            )}
            <div css={styleRow}>
              <div style={styleProperty}>{t("page_report.date")}</div>
              <div style={styleInfo}>{date2str(report.time)}</div>
            </div>
            {report.type === "etc-reason" && (
              <div css={styleRow}>
                <div style={styleProperty}>{t("page_report.etc_reason")}</div>
                <div style={styleInfo}>{report.etcDetail}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReportList;
