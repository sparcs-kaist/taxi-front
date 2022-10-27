import React from "react";
import PopupContainer from "./PopupContainer";
import PropTypes from "prop-types";
import axios from "tools/axios";
import { useSetRecoilState } from "recoil";
import alertAtom from "recoil/alert";

const PopupPay = (props) => {
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

  const setAlert = useSetRecoilState(alertAtom);
  const onClick = async () => {
    const res = await axios.post("/rooms/v2/commitPayment", {
      roomId: props.roomId,
    });
    if (res.status === 200) {
      props.recallEvent();
      props.onClickClose();
    } else {
      setAlert("결제 완료를 실패하였습니다");
    }
  };

  return (
    <PopupContainer
      popup={props.popup}
      onClickClose={props.onClickClose}
      onClickOk={onClick}
      nameOk="완료하기"
    >
      <div style={styleTextCont}>
        <span style={styleTxt1}>결제</span>
        <span style={styleTxt2}>를 </span>
        <span style={styleTxt3}>완료</span>
        <span style={styleTxt2}>하시겠습니까?</span>
      </div>
      <div style={styleTextCont2}>
        꼭 택시비를 결제한 본인만 완료해주세요.
        <br />
        완료 후 취소는 불가능합니다.
      </div>
    </PopupContainer>
  );
};

PopupPay.propTypes = {
  roomId: PropTypes.string,
  popup: PropTypes.bool,
  onClickClose: PropTypes.func,
  recallEvent: PropTypes.func,
};

export default PopupPay;
