import React from "react";
import { useState } from "react";
import ProfileImg from "components/Mypage/ProfileImg";
import { FaPen } from "react-icons/fa";
import Modal from "components/common/modal/Modal";
import axios from "tools/axios";
import { theme } from "styles/theme";
import { useSetRecoilState } from "recoil";
import alertAtom from "recoil/alert";
import regExpTest from "tools/regExpTest";

type PopupReportProps = {
  isOpen: boolean;
  onClose: () => void;
  path: string;
  name: string;
  reportedId: string;
};

enum ReportTypes {
  NoSettlement = "no-settlement",
  NoShow = "no-show",
  ETCReason = "etc-reason",
}

const PopupReport = ({
  isOpen,
  onClose,
  path,
  name,
  reportedId,
}: PopupReportProps) => {
  const [type, setType] = useState<ReportTypes>(ReportTypes.NoSettlement);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [etcDetail, setEtcDetail] = useState("");
  const setAlert = useSetRecoilState(alertAtom);

  const styleProfImg: CSS = {
    width: "50px",
    height: "50px",
    marginLeft: "24px",
  };
  const styleTitle: CSS = {
    height: "20px",
    marginLeft: "12px",
    ...theme.font16_bold,
    lineHeight: "20px",
    letterSpacing: "0.1em",
    color: theme.black,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "200px",
  };
  const styleTop: CSS = {
    marginTop: "6px",
    width: "100%",
    display: "flex",
    alignItems: "center",
  };
  const styleMiddle: CSS = {
    margin: "18px 20px 0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "6px",
  };
  const styleLabel: CSS = {
    width: "2.5em",
    ...theme.font14,
    lineHeight: "16px",
    letterSpacing: "0.05em",
    color: theme.gray_text,
  };
  const styleDropdown: CSS = {
    width: "100%",
    marginLeft: "10px",
    height: "28px",
    background: theme.gray_background,
    boxShadow: theme.shadow_gray_input_inset,
    borderRadius: "6px",
    outline: "none",
    border: "none",
    paddingLeft: "12px",
    ...theme.font14,
    lineHeight: "16px",
    color: theme.gray_text,
  };
  const styleBottom: CSS = {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
  };
  const styleBottomSubmitted: CSS = {
    margin: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };
  const styleCancel: CSS = {
    width: "77px",
    height: "36px",
    background: theme.gray_background,
    boxShadow: theme.shadow_gray_button_inset,
    borderRadius: "8px",
    color: theme.gray_text,
    border: "none",
    outline: "none",
  };
  const styleSubmit: CSS = {
    width: "218px",
    height: "36px",
    background: "#6E3678",
    boxShadow: theme.shadow_gray_button_inset,
    borderRadius: "8px",
    color: "white",
    border: "none",
    outline: "none",
  };
  const styleETC: CSS = {
    display: "flex",
    justifyContent: "space-between",
    background: theme.gray_background,
    boxShadow: theme.shadow_gray_input_inset,
    borderRadius: "6px",
    margin: "10px 20px 0px",
  };
  const styleText: CSS = {
    background: theme.gray_background,
    width: "221px",
    minHeight: "16px",
    lineHeight: "16px",
    fontSize: "14px",
    outline: "none",
    border: "none",
    resize: "none",
    margin: "8px 8px 8px 0px",
    overflow: "hidden",
  };
  const styleIcon: CSS = {
    position: "relative",
    top: "10.75px",
    left: "13.75px",
    width: "10.5px",
    height: "10.5px",
  };

  const handleType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as ReportTypes);
  };

  const handleSubmit = async (): Promise<void> => {
    const data: ReportData = {
      reportedId,
      type,
      etcDetail,
      time: new Date(),
    };
    const res: ReportResponse = await axios.post("/reports/create", data);
    if (res.status === 200) {
      setIsSubmitted(true);
    } else {
      setAlert("신고에 실패했습니다.");
    }
  };

  const handleClose = () => {
    onClose();
    setIsSubmitted(false);
    setType(ReportTypes.NoSettlement);
  };

  const handleEtcDetail = (event: React.FormEvent<HTMLSpanElement>) => {
    if (!regExpTest.reportMsg(event.currentTarget.innerText)) {
      setAlert("신고 이유는 1500자 까지 허용됩니다.");
    }
    setEtcDetail(event.currentTarget.innerText);
  };

  return (
    <Modal
      display={isOpen}
      onClickClose={handleClose}
      width={325}
      padding="10px"
      closeBtn={true}
    >
      <div style={styleTop}>
        <div style={styleProfImg}>
          <ProfileImg path={path} />
        </div>
        <div style={styleTitle}>{name}</div>
      </div>

      <div style={styleMiddle}>
        <div style={styleLabel}>사유</div>
        <select
          style={styleDropdown}
          value={type}
          onChange={handleType}
          disabled={isSubmitted}
        >
          <option value={ReportTypes.NoSettlement}>정산을 하지 않음</option>
          <option value={ReportTypes.NoShow}>택시에 동승하지 않음</option>
          <option value={ReportTypes.ETCReason}>기타 사유</option>
        </select>
      </div>
      {type === ReportTypes.ETCReason ? (
        <div style={styleETC}>
          <FaPen style={styleIcon} />
          <span
            role="textbox"
            style={styleText}
            contentEditable={!isSubmitted}
            onInput={handleEtcDetail}
          ></span>
        </div>
      ) : null}
      {isSubmitted ? (
        <div style={styleBottomSubmitted}>
          <div
            style={{
              ...theme.font16,
              lineHeight: "19px",
              color: theme.black,
            }}
          >
            <b
              style={{
                color: theme.red_text,
                fontWeight: "700",
                marginRight: "2px",
              }}
            >
              신고
            </b>
            가{" "}
            <b
              style={{
                fontWeight: "700",
                marginRight: "2px",
              }}
            >
              완료
            </b>
            되었습니다.
          </div>
          <div
            style={{
              fontSize: "10px",
              lineHeight: "12px",
              color: theme.gray_text,
            }}
          >
            신고 내역은 마이 페이지에서 확인 가능합니다.
          </div>
        </div>
      ) : (
        <div style={styleBottom}>
          <button style={styleCancel}>취소</button>
          <button style={styleSubmit} onClick={handleSubmit}>
            신고하기
          </button>
        </div>
      )}
    </Modal>
  );
};

export default PopupReport;
