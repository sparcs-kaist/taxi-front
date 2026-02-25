import { useMemo, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import { ModalChatPayment } from "@/components/ModalPopup";

import Button from "./Button";
import useSettlementFromChats from "@/hooks/chat/useSettlementFromChats";

import theme from "@/tools/theme";

import WalletRoundedIcon from "@mui/icons-material/WalletRounded";

type MessageAccountProps = {
  roomInfo: Room;
  account: string;
  settlement: ReturnType<typeof useSettlementFromChats>;
};

const MessageAccount = ({ roomInfo, account, settlement }: MessageAccountProps) => {
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
  const [bankName, accountNumber] = useMemo((): [string, string] => {
    const splited = account.split(" ");
    return [splited?.[0] || "", splited?.[1] || ""];
  }, [account]);
  const [totalAmount, perPersonAmount] = useMemo((): [number, number] => {
    return [settlement?.total || 0, settlement?.perPerson || 0];
  }, [settlement]);
  const settlementStatusForMe = useMemo(
    () =>
      roomInfo &&
      roomInfo.part.filter((user) => user._id === userOid)?.[0]?.isSettlement,
    [userOid, roomInfo]
  );

  const style = { width: "210px" };
  const styleHead = {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    ...theme.font16,
    color: theme.white,
    padding: "7px 10px 6px",
    boxSizing: "border-box" as any,
    height: "32px",
    backgroundColor: theme.purple,
  };
  const styleBody = { padding: "10px", display: "flex", flexDirection: "column" as const, gap: "6px" };
  const styleLine = { display: "flex", gap: "6px" };
  const styleLineLeft = { ...theme.font14, color: theme.gray_text };
  const styleLineRight = { ...theme.font14, color: theme.black };
  const styleButtonSection = { display: "flex", gap: "6px", marginTop: "4px" };

  return (
    <div css={style}>
      <div css={styleHead}>
        <WalletRoundedIcon />
        정산을 시작합니다.
      </div>
      <div css={styleBody}>
        <div css={styleLine}>
          <div css={styleLineLeft}>은행</div>
          <div css={styleLineRight}>{bankName}</div>
        </div>
        <div css={styleLine}>
          <div css={styleLineLeft}>계좌</div>
          <div css={styleLineRight}>{accountNumber}</div>
        </div><div css={styleLine}>
          <div css={styleLineLeft}>총 금액</div>
          <div css={styleLineRight}>{totalAmount}원</div>
        </div>
        <div css={styleLine}>
          <div css={styleLineLeft}>송금할 금액</div>
          <div css={styleLineRight}>{perPersonAmount}원</div>
        </div>
        <div css={styleButtonSection}>
          <div css={{ flex: 1 }}>
            {settlementStatusForMe === "paid" ? (
                <Button onClick={() => setIsOpenPayment(true)} isVaild={false}>
                  송금 요청 완료
                </Button>
              ) : // @todo: 정산현황
              settlementStatusForMe === "sent" ? (
                <Button onClick={() => setIsOpenPayment(true)} isVaild={false}>
                  송금 완료
                </Button>
              ) : (
                <Button onClick={() => setIsOpenPayment(true)}>송금하기</Button>
              )}
          </div>
        </div>
      </div>
      <ModalChatPayment
        isOpen={isOpenPayment}
        onChangeIsOpen={setIsOpenPayment}
        roomInfo={roomInfo}
        account={account}
        settlement={settlement}
      />
    </div>
  );
};

export default MessageAccount;
