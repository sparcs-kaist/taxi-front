import { useMemo, useRef, useState } from "react";

import useSendMessage from "@/hooks/chat/useSendMessage";
import { useEvent2024SpringQuestComplete } from "@/hooks/event/useEvent2024SpringQuestComplete";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import InputAcount from "@/components/Input/InputAccount";
import Modal from "@/components/Modal";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import regExpTest from "@/tools/regExpTest";
import theme from "@/tools/theme";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

type ModalChatSettlementProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
> & {
  roomInfo: Room;
  onRecall?: () => void;
  openSaveAccountModal?: (account: string) => void;
};

const ModalChatSettlement = ({
  roomInfo,
  onRecall,
  openSaveAccountModal,
  ...modalProps
}: ModalChatSettlementProps) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const { account: defaultAccount } = useValueRecoilState("loginInfo") || {};
  const [account, setAccount] = useState<string>(defaultAccount || "");
  const isValidAccount = useMemo(() => regExpTest.account(account), [account]);
  const isRequesting = useRef<boolean>(false);
  const sendMessage = useSendMessage(roomInfo._id, isRequesting);
  const event2024SpringQuestComplete = useEvent2024SpringQuestComplete();

  const onClickOk = () => {
    if (isRequesting.current || !isValidAccount) return;
    isRequesting.current = true;
    axios({
      url: "/rooms/commitPayment",
      method: "post",
      data: { roomId: roomInfo._id },
      onSuccess: async () => {
        isRequesting.current = false;
        onRecall?.();
        if (account !== "") {
          await sendMessage("account", { text: account });
          isRequesting.current = false;
          if (account !== defaultAccount) openSaveAccountModal?.(account);
        }
        //#region event2024Spring
        event2024SpringQuestComplete("payingAndSending");
        event2024SpringQuestComplete("sending");
        //#endregion
        modalProps.onChangeIsOpen?.(false);
      },
      onError: () => {
        isRequesting.current = false;
        setAlert("정산하기를 실패했습니다.");
      },
    });
  };

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
  const styleAccount = {
    margin: "12px 8px",
    display: "flex",
    alignItems: "center",
    color: theme.gray_text,
    whiteSpace: "nowrap",
    ...theme.font14,
  } as const;
  const styleButtons = {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  } as const;
  const styleAlarm = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };

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
      <div css={styleAccount}>
        계좌번호
        <InputAcount
          value={account}
          onChangeValue={setAccount}
          css={{ width: "100%", marginLeft: "10px" }}
        />
      </div>
      {isValidAccount ? (
        account === "" ? (
          <div css={{ ...styleAlarm, color: theme.gray_text }}>
            • 계좌번호를 공유하지 않고 정산 요청을 합니다.
          </div>
        ) : (
          <div css={{ ...styleAlarm, color: theme.gray_text }}>
            • 정산 요청과 함께 계좌번호를 채팅창에 전송합니다.
          </div>
        )
      ) : (
        <div css={{ ...styleAlarm, color: theme.red_text }}>
          • 올바른 계좌번호를 입력해주세요.
        </div>
      )}
      <div css={styleButtons}>
        <Button
          type="gray"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14,
          }}
          onClick={() => modalProps.onChangeIsOpen?.(false)}
        >
          돌아가기
        </Button>
        <Button
          type="purple_inset"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={onClickOk}
          disabled={!isValidAccount}
        >
          완료하기
        </Button>
      </div>
    </Modal>
  );
};

export default ModalChatSettlement;
