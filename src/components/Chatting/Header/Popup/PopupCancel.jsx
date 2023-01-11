import React from "react";
import { useHistory } from "react-router-dom";
import PopupContainer from "./PopupContainer";
import PropTypes from "prop-types";
import axios from "tools/axios";
import { useSetRecoilState } from "recoil";
import alertAtom from "recoil/alert";
import myRoomAtom from "recoil/myRoom";

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

  const history = useHistory();
  const setAlert = useSetRecoilState(alertAtom);
  const setMyRoom = useSetRecoilState(myRoomAtom);
  const onClick = async () => {
    const res = await axios.post("/rooms/v2/abort", {
      roomId: props.roomId,
    });
    if (res.status === 200) {
      const { data } = await axios.get("/rooms/v2/searchByUser");
      setMyRoom(data);
      history.replace("/myroom");
    } else {
      setAlert("탑승 취소에 실패하였습니다");
    }
  };

  return (
    <PopupContainer
      popup={props.popup}
      onClickClose={props.onClickClose}
      onClickOk={onClick}
      nameOk="취소하기"
    >
      <div style={styleTextCont}>
        <span style={styleTxt1}>탑승</span>
        <span style={styleTxt2}>을 </span>
        <span style={styleTxt3}>취소</span>
        <span style={styleTxt2}>하시겠습니까?</span>
      </div>
      <div style={styleTextCont2}>
        취소 후 재탑승이 가능합니다.
        <br />
        다만, 혼자 탑승 중인 경우에는 방이 사라집니다.
      </div>
    </PopupContainer>
  );
};

PopupCancel.propTypes = {
  roomId: PropTypes.string,
  popup: PropTypes.bool,
  onClickClose: PropTypes.func,
};

export default PopupCancel;
