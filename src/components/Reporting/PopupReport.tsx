import React from "react";
import { useState } from "react";
import ProfileImg from "components/Mypage/ProfileImg";
import { FaPen } from "react-icons/fa";
import Modal from "components/common/modal/Modal";
import axios from "tools/axios";
import { theme } from "styles/theme";

type Data = { reportedId: string; type: string; etcDetail: string; time: Date };
type Response = { status: number };

type PopupReportProps = {
  isOpen: boolean;
  onClose: () => void;
  path: string;
  name: string;
  reportedId: string;
};

type Types = "no-settlement" | "no-show" | "etc-reason";

const PopupReport = ({
  isOpen,
  onClose,
  path,
  name,
  reportedId,
}: PopupReportProps) => {
  const types: Types[] = ["no-settlement", "no-show", "etc-reason"];
  const [type, setType] = useState(types[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [etcDetail, setEtcDetail] = useState("");

  const styleProfImg: React.CSSProperties = {
    width: "50px",
    height: "50px",
    marginLeft: "24px",
  };
  const styleTitle: React.CSSProperties = {
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
  const styleTop: React.CSSProperties = {
    marginTop: "6px",
    width: "100%",
    display: "flex",
    alignItems: "center",
  };
  const styleMiddle: React.CSSProperties = {
    margin: "18px 20px 0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "6px",
  };
  const styleLabel: React.CSSProperties = {
    width: "2.5em",
    ...theme.font14,
    lineHeight: "16px",
    letterSpacing: "0.05em",
    color: theme.gray_text,
  };
  const styleDropdown: React.CSSProperties = {
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
  const styleBottom: React.CSSProperties = {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
  };
  const styleBottomSubmitted: React.CSSProperties = {
    margin: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };
  const styleCancel: React.CSSProperties = {
    width: "77px",
    height: "36px",
    background: theme.gray_background,
    boxShadow: theme.shadow_gray_button_inset,
    borderRadius: "8px",
    color: theme.gray_text,
  };
  const styleSubmit: React.CSSProperties = {
    width: "218px",
    height: "36px",
    background: "#6E3678",
    boxShadow: theme.shadow_gray_button_inset,
    borderRadius: "8px",
    color: "white",
  };
  const styleETC: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    background: theme.gray_background,
    boxShadow: theme.shadow_gray_input_inset,
    borderRadius: "6px",
    margin: "10px 20px 0px",
  };
  const styleText: React.CSSProperties = {
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
  const styleIcon: React.CSSProperties = {
    position: "relative",
    top: "10.75px",
    left: "13.75px",
    width: "10.5px",
    height: "10.5px",
  };

  const handleType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as Types);
  };

  const handleSubmit = async (): Promise<void> => {
    const data: Data = {
      reportedId: reportedId,
      type: type,
      etcDetail: etcDetail,
      time: new Date(),
    };
    const res: Response = await axios.post("/users/report", data);
    if (res.status === 200) {
      setIsSubmitted(true);
    } else {
      alert("신고에 실패했습니다.");
    }
  };

  const handleClose = () => {
    onClose();
    setIsSubmitted(false);
    setType(types[0]);
  };

  const handleEtcDetail = (event: React.FormEvent<HTMLSpanElement>) => {
    setEtcDetail(event.currentTarget.innerText);
  };

  return (
    <Modal
      display={isOpen}
      onClickClose={handleClose}
      maxWidth="325px"
      padding="10px"
      btnCloseDisplay={true}
    >
      <div style={styleTop}>
        <div style={styleProfImg}>
          <ProfileImg path={path} />
        </div>
        <div style={styleTitle}>{name}</div>
      </div>

      <div style={styleMiddle}>
        <div style={styleLabel}>사유</div>
        <select style={styleDropdown} value={type} onChange={handleType}>
          <option value={types[0]}>정산을 하지 않음</option>
          <option value={types[1]}>택시에 동승하지 않음</option>
          <option value={types[2]}>기타 사유</option>
        </select>
      </div>
      {type === types[2] ? (
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
