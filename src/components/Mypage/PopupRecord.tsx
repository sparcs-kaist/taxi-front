import React, { useState } from "react";
import Modal from "components/common/modal/Modal";
import DottedLine from "components/common/DottedLine";
import { theme } from "styles/theme";
import Empty from "components/common/Empty";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

type ReportOptionType = "Reporting" | "Reported";
type ReportOptionProps = {
  option: ReportOptionType;
  onClick: (option: ReportOptionType) => void;
};

const ReportOption = (props: ReportOptionProps) => {
  const styleContainer = {
    display: "flex",
    columnGap: "8px",
    padding: "10px 0 12px 8px",
  };
  const styleButton = (isSelected: boolean) => {
    return {
      display: "flex",
      ...theme.font10,
      borderRadius: "4px",
      padding: "3px 6px 3px",
      cursor: theme.cursor(),
      color: isSelected ? theme.white : theme.gray_text,
      backgroundColor: isSelected ? theme.purple : theme.gray_background,
      boxShadow: isSelected
        ? theme.shadow_purple_button_inset
        : theme.shadow_gray_input_inset,
    };
  };
  return (
    <div style={styleContainer}>
      <div
        style={styleButton(props.option === "Reporting")}
        onClick={() => props.onClick("Reporting")}
      >
        신고한 내역
      </div>
      <div
        style={styleButton(props.option === "Reported")}
        onClick={() => props.onClick("Reported")}
      >
        신고 받은 내역
      </div>
    </div>
  );
};

type RecordProps = {
  isOpen: boolean;
  onClose: () => void;
  reportHistory: Array<any>;
};

const PopupRecord = (props: RecordProps) => {
  const [option, setOption] = useState<ReportOptionType>("Reporting");
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
  const styleContainer = {
    overflow: "auto",
    minHeight: "270px",
    height: "calc(100vh - 360px)",
    // maskImage:
    //   "linear-gradient(to bottom, transparent, white 16px, white calc(100% - 16px), transparent 100%)",
  };
  return (
    <Modal
      display={props.isOpen}
      onClickClose={props.onClose}
      padding="16px 12px"
    >
      <div style={styleTitle}>
        <ErrorOutlineRoundedIcon style={styleLogo} />
        신고 내역
      </div>
      <div style={styleGuide}>
        아래 신고 내역에 대해 문의하고 싶으신 경우 “채널톡 문의하기” 메뉴를
        이용해주세요.
      </div>
      <DottedLine direction="row" />
      <ReportOption
        option={option}
        onClick={(option: ReportOptionType) => setOption(option)}
      />
      <div style={styleContainer}>
        {!props.reportHistory?.length ? (
          <Empty screen="mobile">신고한 기록이 없습니다</Empty>
        ) : (
          props.reportHistory.map((report, index) => {
            return (
              <div key={index}>{report}</div>
              // reportedId, type, etcDetail, time, ["no-settlement", "no-show", "etc-reason"]
            );
          })
        )}
      </div>
    </Modal>
  );
};

export default PopupRecord;
