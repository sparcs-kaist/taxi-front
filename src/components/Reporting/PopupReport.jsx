import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import ProfileImg from "components/Mypage/ProfileImg";
import { FaPen } from "react-icons/fa";
import Modal from "components/common/modal/Modal";
import axios from "tools/axios";
import { date2str } from "tools/moment";
const PopupReport = (props) => {
  const [type, setType] = useState("no-settlement");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [etcDetail, setEtcDetail] = useState("");

  const styleProfImg = {
    width: "50px",
    height: "50px",
    marginLeft: "24px",
  };
  const styleTitle = {
    height: "20px",
    marginLeft: "12px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "17px",
    lineHeight: "20px",
    letterSpacing: "0.1em",
    color: "#323232",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "200px",
  };
  const styleTop = {
    marginTop: "6px",
    width: "100%",
    display: "flex",
    alignItems: "center",
  };
  const styleMiddle = {
    margin: "18px 20px 0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "6px",
  };
  const styleLabel = {
    width: "2.5em",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.05em",
    color: "#888888",
  };
  const styleDropdown = {
    width: "100%",
    marginLeft: "10px",
    height: "28px",
    background: "#EEEEEE",
    boxShadow: "inset 1px 1px 2.5px -1px rgba(0, 0, 0, 0.075)",
    borderRadius: "6px",
    outline: "none",
    border: "none",
    paddingLeft: "12px",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#888888",
  };
  const styleBottom = {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
  };
  const styleBottomSubmitted = {
    margin: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };
  const styleCancel = {
    width: "77px",
    height: "36px",
    background: "#EEEEEE",
    boxShadow: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075)",
    borderRadius: "8px",
    color: "#888888",
  };
  const styleSubmit = {
    width: "218px",
    height: "36px",
    background: "#6E3678",
    boxShadow: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075)",
    borderRadius: "8px",
    color: "white",
  };
  const styleETC = {
    display: "flex",
    justifyContent: "space-between",
    background: "#EEEEEE",
    boxShadow: "inset 1px 1px 2.5px -1px rgba(0, 0, 0, 0.075)",
    borderRadius: "6px",
    margin: "10px 20px 0px",
  };
  const styleText = {
    background: "#EEEEEE",
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
  const styleIcon = {
    position: "relative",
    top: "10.75px",
    left: "13.75px",
    width: "10.5px",
    height: "10.5px",
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async () => {
    const time = new Date();
    const reportedId = props.reportedId;
    const data = { reportedId, type, etcDetail, time };
    const res = await axios.post("/users/report", data);
    if (res.status === 204) {
      setIsSubmitted(true);
    } else {
      alert("신고에 실패했습니다.");
    }
  };

  const handleClose = () => {
    props.onClose();
    setIsSubmitted(false);
    setType("no-settlement");
  };

  return (
    <Modal
      display={props.isOpen}
      onClickClose={handleClose}
      maxWidth="325px"
      padding="10px"
      btnCloseDisplay={true}
    >
      <div style={styleTop}>
        <div style={styleProfImg}>
          <ProfileImg path={props.path} />
        </div>
        <div style={styleTitle}>{props.name}</div>
      </div>

      <div style={styleMiddle}>
        <div style={styleLabel}>사유</div>
        <select style={styleDropdown} value={type} onChange={handleType}>
          <option value="no-settlement">정산을 하지 않음</option>
          <option value="no-show">택시에 동승하지 않음</option>
          <option value="etc-reason">기타 사유</option>
        </select>
      </div>
      {type === "etc-reason" ? (
        <div style={styleETC}>
          <FaPen style={styleIcon} />
          <span
            role="textbox"
            style={styleText}
            contentEditable={!isSubmitted}
            // onChange={(e) => setEtcDetail(e.target.value)}
            onInput={(e) => setEtcDetail(e.currentTarget.textContent)}
            value={etcDetail}
          ></span>
        </div>
      ) : null}
      {isSubmitted ? (
        <div style={styleBottomSubmitted}>
          <div
            style={{
              fontSize: "16px",
              lineHeight: "19px",
              color: "#323232",
              fontWeight: "400",
            }}
          >
            <b
              style={{
                color: "#DD616E",
                fontWeight: "700",
              }}
            >
              신고
            </b>
            가{" "}
            <b
              style={{
                fontWeight: "700",
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
              color: "#888888",
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

PopupReport.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  path: PropTypes.string,
  name: PropTypes.string,
  reportedId: PropTypes.string,
};

export default PopupReport;
