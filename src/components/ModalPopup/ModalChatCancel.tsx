import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useFetchRecoilState } from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import Modal from "components/Modal";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "tools/theme";

type ModalChatCancelProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
> & { roomId: Room["_id"] };

const ModalChatCancel = ({ roomId, ...modalProps }: ModalChatCancelProps) => {
  const axios = useAxios();
  const history = useHistory();
  const setAlert = useSetRecoilState(alertAtom);
  const fetchMyrooms = useFetchRecoilState("myRooms");

  const onClickOk = useCallback(
    () =>
      axios({
        url: "/rooms/abort",
        method: "post",
        data: { roomId },
        onSuccess: () => {
          fetchMyrooms();
          history.replace("/myroom");
        },
        onError: () => setAlert("탑승 취소를 실패하였습니다."),
      }),
    [roomId]
  );

  const styleTextCont = {
    textAlign: "center" as any,
  };
  const styleTextCont2 = {
    textAlign: "center" as any,
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
    <Modal {...modalProps} padding="10px" onEnter={onClickOk}>
      <div css={{ margin: "26px 0 24px" }}>
        <div css={styleTextCont}>
          <span css={styleTxt1}>탑승</span>
          <span css={styleTxt2}>을 </span>
          <span css={styleTxt3}>취소</span>
          <span css={styleTxt2}>하시겠습니까?</span>
        </div>
        <div css={styleTextCont2}>
          취소 후 재탑승이 가능합니다.
          <br />
          다만, 혼자 탑승 중인 경우에는 방이 사라집니다.
        </div>
      </div>
      <div
        css={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Button
          type="gray"
          width="calc(50% - 5px)"
          padding="10px 0 9px"
          radius={8}
          font={theme.font14}
          onClick={() => modalProps?.onChangeIsOpen?.(false)}
        >
          돌아가기
        </Button>
        <Button
          type="purple_inset"
          width="calc(50% - 5px)"
          padding="10px 0 9px"
          radius={8}
          font={theme.font14_bold}
          onClick={onClickOk}
        >
          취소하기
        </Button>
      </div>
    </Modal>
  );
};

export default ModalChatCancel;
