import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { useAxios } from "hooks/useTaxiAPI";

import PopupContainer from "./PopupContainer";

import alertAtom from "atoms/alert";
import myRoomsAtom from "atoms/myRooms";
import { useSetRecoilState } from "recoil";

const PopupCancel = (props) => {
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

  const history = useHistory();
  const setAlert = useSetRecoilState(alertAtom);
  const setMyRooms = useSetRecoilState(myRoomsAtom);
  const onClick = () =>
    axios({
      url: "/rooms/abort",
      method: "post",
      data: {
        roomId: props.roomId,
      },
      onSuccess: async () => {
        setMyRooms(
          await axios({
            url: "/rooms/searchByUser",
            method: "get",
          })
        );
        history.replace("/myroom");
      },
      onError: () => setAlert("탑승 취소에 실패하였습니다"),
    });

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
