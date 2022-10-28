import React from "react";
import { theme } from "styles/theme";
import { date2str } from "tools/moment";
import { ReportOptionType } from "./ReportOption";
import DottedLine from "components/common/DottedLine";
import Empty from "components/common/Empty";

type ReportListProps = {
  option: ReportOptionType;
  selectedReportHistory: Array<any>;
};

const ReportList = (props: ReportListProps) => {
  const styleBox: CSS = {
    display: "flex",
    flexDirection: "column",
    padding: "10px 12px",
    borderRadius: "12px",
    rowGap: "6px",
    boxShadow: theme.shadow_gray_button_inset,
    backgroundColor: theme.gray_background,
  };
  const styleRow = {
    display: "flex",
  };
  const styleProperty = {
    ...theme.font12,
    color: theme.gray_text,
    minWidth: "66px",
  };
  const styleInfo = {
    ...theme.font12,
  };
  const getTypeText = (type: string) => {
    return type === "no-settlement"
      ? "정산 미완료"
      : type === "no-show"
      ? "출발 시간에 나타나지 않음"
      : "기타 사유";
  };
  if (!props.selectedReportHistory?.length) {
    return (
      <Empty screen="mobile">
        {props.option === "Reporting"
          ? "신고한 기록이 없습니다"
          : "신고 받은 기록이 없습니다"}
      </Empty>
    );
  } else {
    return (
      <>
        {props.selectedReportHistory.map((report) => {
          console.log(report);
          return (
            <div key={report._id} style={styleBox}>
              <div style={styleRow}>
                <div style={styleProperty}>신고 사유</div>
                <div style={{ ...styleInfo, color: theme.purple }}>
                  {getTypeText(report.type)}
                </div>
              </div>
              <DottedLine direction="row" marginTop={2} marginBottom={1} />
              {props.option === "Reporting" && (
                <div style={styleRow}>
                  <div style={styleProperty}>별명</div>
                  <div style={styleInfo}>{report.reportedId.nickname}</div>
                </div>
              )}
              <div style={styleRow}>
                <div style={styleProperty}>신고 일시</div>
                <div style={styleInfo}>{date2str(report.time)}</div>
              </div>
              {report.type === "etc-reason" && (
                <div style={styleRow}>
                  <div style={styleProperty}>기타 사유</div>
                  <div style={{ ...styleInfo, wordBreak: "keep-all" }}>
                    {report.etcDetail}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  }
};

export default ReportList;
