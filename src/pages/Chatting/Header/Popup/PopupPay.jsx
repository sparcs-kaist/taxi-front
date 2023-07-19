import PropTypes from "prop-types";

import { useFetchRecoilState } from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import PopupContainer from "./PopupContainer";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

const PopupPay = (props) => {
  const axios = useAxios();

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
  const fetchMyRooms = useFetchRecoilState("myRooms");

  const onClick = () => {
    axios({
      url: "/rooms/commitPayment",
      method: "post",
      data: {
        roomId: props.roomId,
      },
      onSuccess: () => {
        fetchMyRooms();
        props.recallEvent();
        props.onClickClose();
      },
      onError: () => setAlert("결제 완료를 실패하였습니다"),
    });
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
