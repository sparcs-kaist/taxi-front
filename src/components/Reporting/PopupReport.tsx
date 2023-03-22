import { ChangeEvent, FormEvent, useState } from "react";
import ProfileImg from "components/Mypage/ProfileImg";
import Modal from "components/common/modal/Modal";
import { useAxios } from "hooks/useTaxiAPI";
import theme from "styles/theme";
import { useSetRecoilState } from "recoil";
import alertAtom from "atoms/alert";
import regExpTest from "tools/regExpTest";

import Button from "components/common//Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

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
  const axios = useAxios();
  const [type, setType] = useState<ReportTypes>(ReportTypes.NoSettlement);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [etcDetail, setEtcDetail] = useState("");
  const setAlert = useSetRecoilState(alertAtom);

  const styleProfImg: CSS = {
    width: "50px",
    height: "50px",
    marginLeft: "14px",
    flexShrink: 0,
  };
  const styleTitle: CSS = {
    margin: "0 24px 0 12px",
    ...theme.font16_bold,
    color: theme.black,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
  };
  const styleLabel: CSS = {
    flexShrink: 0,
    ...theme.font14,
    lineHeight: "16px",
    color: theme.gray_text,
  };
  const styleDropdownContainer: CSS = {
    position: "relative",
    display: "flex",
    flex: 1,
    marginLeft: "12px",
  };
  const styleArrow: CSS = {
    position: "absolute",
    top: "6px",
    right: "9px",
    fontSize: "16px",
    color: theme.gray_text,
    zIndex: 1,
  };
  const styleDropdown = (isSubmitted: boolean) =>
    ({
      appearance: "none",
      flex: 1,
      height: "28px",
      background: theme.gray_background,
      boxShadow: theme.shadow_gray_input_inset,
      borderRadius: "6px",
      outline: "none",
      border: "none",
      padding: "6px 12px",
      ...theme.font14,
      color: theme.gray_text,
      position: "relative",
      cursor: isSubmitted ? "auto" : "pointer",
    } as CSS);
  const styleBottom: CSS = {
    marginTop: "16px",
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
  };
  const styleBottomSubmitted: CSS = {
    margin: "32px auto 22px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
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
    flex: 1,
    padding: "8px 12px 8px 0",
    minHeight: "16px",
    ...theme.font14,
    color: theme.gray_text,
    overflow: "scroll",
    maxHeight: "calc(100vh - 320px)",
  };
  const styleIcon: CSS = {
    color: theme.black,
    fontSize: "14px",
    margin: "9px 6px 9px 12px",
  };

  const handleType = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as ReportTypes);
  };

  const handleSubmit = () => {
    const data: ReportData = {
      reportedId,
      type,
      etcDetail,
      time: new Date(),
    };
    axios({
      url: "/reports/create",
      method: "post",
      data,
      onSuccess: () => setIsSubmitted(true),
      onError: () => setAlert("신고에 실패했습니다."),
    });
  };

  const handleClose = () => {
    onClose();
    setIsSubmitted(false);
    setType(ReportTypes.NoSettlement);
  };

  const handleEtcDetail = (event: FormEvent<HTMLSpanElement>) => {
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
      closeBtn
    >
      <div style={styleTop}>
        <div style={styleProfImg}>
          <ProfileImg path={path} />
        </div>
        <div style={styleTitle}>{name}</div>
      </div>
      <div style={styleMiddle}>
        <div style={styleLabel}>사유</div>
        <div style={styleDropdownContainer}>
          {!isSubmitted && <ArrowDropDownRoundedIcon style={styleArrow} />}
          <select
            style={styleDropdown(isSubmitted)}
            value={type}
            onChange={handleType}
            disabled={isSubmitted}
          >
            <option value={ReportTypes.NoSettlement}>정산을 하지 않음</option>
            <option value={ReportTypes.NoShow}>택시에 동승하지 않음</option>
            <option value={ReportTypes.ETCReason}>기타 사유</option>
          </select>
        </div>
      </div>
      {type === ReportTypes.ETCReason ? (
        <div style={styleETC}>
          <EditRoundedIcon style={styleIcon} />
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
            <b style={{ color: theme.red_text }}>신고</b>가 <b>완료</b>
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
          <Button
            type="gray"
            width="calc(50% - 5px)"
            padding="10px 0 9px"
            radius={8}
            font={theme.font14}
            onClick={handleClose}
          >
            돌아가기
          </Button>
          <Button
            type="purple_inset"
            width="calc(50% - 5px)"
            padding="10px 0 9px"
            radius={8}
            font={theme.font14_bold}
            onClick={handleSubmit}
          >
            신고하기
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default PopupReport;
