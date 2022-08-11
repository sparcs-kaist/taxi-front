import React from "react";
import PopupContainer from "./PopupContainer";
import PropTypes from "prop-types";

const PopupCancel = (props) => {
  const styleTextCont = {
    textAlign: "center",
  };
  const styleTextCont2 = {
    textAlign: "center",
    lineHieght: "12px",
    paddingTop: "6px",
    fontSize: "10px",
    color: "888888",
  };
  const styleTxt1 = {
    fontSize: "16px",
    fontWeight: "bold",
  };
  const styleTxt2 = {
    fontSize: "16px",
    fontWeight: 300,
  };
  const styleTxt3 = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#6E3678",
  };

  return (
    <PopupContainer popup={props.popup} onClickClose={props.onClickClose}>
      <div style={styleTextCont}>
        <span style={styleTxt1}>탑승</span>
        <span style={styleTxt2}>을 </span>
        <span style={styleTxt3}>취소</span>
        <span style={styleTxt2}>하시겠습니까?</span>
      </div>
      <div style={styleTextCont2}>취소 후 재탑승이 가능합니다.</div>
    </PopupContainer>
  );
};

PopupCancel.propTypes = {
  popup: PropTypes.bool,
  onClickClose: PropTypes.func,
};

export default PopupCancel;
