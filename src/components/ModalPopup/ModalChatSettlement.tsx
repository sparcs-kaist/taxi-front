import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import Modal from "components/Modal";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "tools/theme";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

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
        url: "/rooms/commitPayment",
        method: "post",
        data: { roomId },
        onSuccess: () => {
          modalProps.onChangeIsOpen?.(false);
          onRecall?.();
        },
        onError: () => setAlert("정산하기 요청을 실패하였습니다."),
      }),
    [roomId, modalProps.onChangeIsOpen, onRecall]
  );

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };
  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };
  // const styleTextCont = {
  //   textAlign: "center" as any,
  // };
  // const styleTextCont2 = {
  //   textAlign: "center" as any,
  //   lineHieght: "12px",
  //   paddingTop: "6px",
  //   fontSize: "10px",
  //   color: "888888",
  // };
  // const styleTxt1 = {
  //   fontSize: "16px",
  //   fontWeight: "bold",
  // };
  // const styleTxt2 = {
  //   fontSize: "16px",
  //   fontWeight: 300,
  // };
  // const styleTxt3 = {
  //   fontSize: "16px",
  //   fontWeight: "bold",
  //   color: "#6E3678",
  // };

  return (
    <Modal {...modalProps} padding="16px 12px 12px" onEnter={onClickOk}>
      <div css={styleTitle}>
        <AccountBalanceWalletRoundedIcon style={styleIcon} />
        정산하기
      </div>
      <div css={styleText}>동승자들에게 송금을 요청할 수 있습니다.</div>
      <div css={styleText}>
        • 완료 후 취소는 <b>불가능</b>합니다.
        <br />
        <span css={{ color: theme.red_text }}>
          • 본인이 택시 요금을 계산한 경우에만 진행해주세요.
        </span>
      </div>
      <DottedLine />
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
