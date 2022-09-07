import React from "react";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";
import RLayout from "components/common/RLayout";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import ProfileImg from "components/Mypage/ProfileImg";
import { FaPen } from "react-icons/fa";

const PopupReport = (props) => {
  const [selection, setSelection] = useState(0);
  const [reportReason, setReportReason] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const styleBgd = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: 50,
    background: `rgba(0,0,0,0.6)`,
    opacity: props.isOpen ? 1 : 0,
    pointerEvents: props.isOpen ? "auto" : "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const style = {
    height: "100%",
    overflow: "hidden",
    background: "white",
    borderRadius: "15px",
  };

  const styleClose = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "24px",
    height: "24px",
  };

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
    marginTop: "16px",

    width: "100%",
    display: "flex",
    alignItems: "center",
  };

  const styleMiddle = {
    marginLeft: "30px",
    marginTop: "18px",
    display: "flex",
    alignItems: "center",
    marginBottom: "6px",
  };

  const styleLabel = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.05em",
    color: "#888888",
  };

  const styleDropdown = {
    width: "228px",
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
    margin: "10px",
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
    marginLeft: "30px",
    marginRight: "30px",
    marginTop: "10px",
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
    margin: "8px 12px 8px 8px",
    overflow: "hidden",
  };

  const styleIcon = {
    position: "relative",
    top: "10.75px",
    left: "13.75px",
    width: "10.5px",
    height: "10.5px",
  };

  const handleSelect = (e) => {
    setSelection(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleClose = () => {
    props.onClose();
    setIsSubmitted(false);
    setSelection(0);
    setReportReason("");
  };

  return (
    <animated.div style={styleBgd}>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
        }}
        onClick={handleClose}
      />
      <div
        style={{
          position: "absolute",
          width: "325px",
        }}
      >
        <div style={style}>
          <CloseRoundedIcon style={styleClose} onClick={handleClose} />
          <div style={styleTop}>
            <div style={styleProfImg}>
              <ProfileImg path={props.path} />
            </div>
            <div style={styleTitle}>{props.name}</div>
          </div>

          <div style={styleMiddle}>
            <div style={styleLabel}>사유</div>
            <select
              style={styleDropdown}
              value={selection}
              onChange={handleSelect}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">기타</option>
            </select>
          </div>
          {selection === "3" ? (
            <div style={styleETC}>
              <FaPen style={styleIcon} />
              <span
                role="textbox"
                style={styleText}
                contentEditable={!isSubmitted}
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
        </div>
      </div>
    </animated.div>
  );
};

PopupReport.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  path: PropTypes.string,
  name: PropTypes.string,
};

export default PopupReport;
