import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import Modal from "components/Modal";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "tools/theme";

type ModalChatSettlementProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
> & { roomId: Room["_id"]; onRecall?: () => void };

const ModalChatSettlement = ({
  roomId,
  onRecall,
  ...modalProps
}: ModalChatSettlementProps) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);

  const onClickOk = useCallback(
    () =>
      axios({
        url: "/rooms/commitSettlement",
        method: "post",
        data: { roomId },
        onSuccess: () => {
          modalProps.onChangeIsOpen?.(false);
          onRecall?.();
        },
        onError: () => setAlert("송금하기 요청을 실패하였습니다."),
      }),
    [roomId, modalProps.onChangeIsOpen, onRecall]
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
          <span css={styleTxt1}>송금</span>
          <span css={styleTxt2}>을 </span>
          <span css={styleTxt3}>완료</span>
          <span css={styleTxt2}>하시겠습니까?</span>
        </div>
        <div css={styleTextCont2}>
          택시비 결제자에게 송금 후 완료해주세요.
          <br />
          완료 후 취소는 불가능합니다.
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
          onClick={() => modalProps.onChangeIsOpen?.(false)}
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
          완료하기
        </Button>
      </div>
    </Modal>
  );
};

export default ModalChatSettlement;
