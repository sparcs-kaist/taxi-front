import React from "react";
import { theme } from "styles/theme";
import { date2str } from "tools/moment";
import { ReportOptionType } from "./ReportOption";
import { ReportHistoryType } from "./index";
import DottedLine from "components/common/DottedLine";
import Empty from "components/common/Empty";

type ReportListProps = {
  option: ReportOptionType;
  reportHistory: ReportHistoryType;
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
    width: "66px",
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
  return props.option === "Reporting" ? (
    !props.reportHistory?.reporting.length ? (
      <Empty screen="mobile">신고한 기록이 없습니다</Empty>
    ) : (
      <>
        {props.reportHistory?.reporting.map((report, index) => {
          console.log(report);
          return (
            <div key={index} style={styleBox}>
              <div style={styleRow}>
                <div style={styleProperty}>신고 사유</div>
                <div style={{ ...styleInfo, color: theme.purple }}>
                  {getTypeText(report.type)}
                </div>
              </div>
              <DottedLine direction="row" marginTop={2} marginBottom={2} />
              <div style={styleRow}>
                <div style={styleProperty}>별명</div>
                <div style={styleInfo}>{report.reportedId.id}</div>
              </div>
              <div style={styleRow}>
                <div style={styleProperty}>신고 일시</div>
                <div style={styleInfo}>{date2str(report.time)}</div>
              </div>
            </div>
          );
        })}
      </>
    )
  ) : !props.reportHistory?.reported.length ? (
    <Empty screen="mobile">신고 받은 기록이 없습니다</Empty>
  ) : (
    <>
      {props.reportHistory?.reported.map((report, index) => {
        return (
          <div key={index} style={styleBox}>
            <div style={styleRow}>
              <div style={styleProperty}>신고 사유</div>
              <div style={{ ...styleInfo, color: theme.purple }}>
                {getTypeText(report.type)}
              </div>
            </div>
            <DottedLine direction="row" marginTop={2} marginBottom={2} />
            <div style={styleRow}>
              <div style={styleProperty}>신고 일시</div>
              <div style={styleInfo}>{date2str(report.time)}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReportList;
