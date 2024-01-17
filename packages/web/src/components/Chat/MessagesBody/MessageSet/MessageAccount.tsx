import { useMemo, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import { ModalChatPayement } from "@/components/ModalPopup";

import Button from "./Button";

import theme from "@/tools/theme";

import WalletRoundedIcon from "@mui/icons-material/WalletRounded";

type MessageAccountProps = {
  roomInfo: Room;
  account: string;
};

const MessageAccount = ({ roomInfo, account }: MessageAccountProps) => {
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
  const [bankName, accountNumber] = useMemo((): [string, string] => {
    const splited = account.split(" ");
    return [splited?.[0] || "", splited?.[1] || ""];
  }, [account]);
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
  const styleBody = { padding: "10px" };
  const styleLine = { display: "flex", gap: "6px" };
  const styleLineLeft = { ...theme.font14, color: theme.gray_text };
  const styleLineRight = { ...theme.font14, color: theme.black };
  const styleButtonSection = { display: "flex", gap: "6px", marginTop: "10px" };

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
        <div css={{ height: "6px" }} />
        <div css={styleLine}>
          <div css={styleLineLeft}>계좌</div>
          <div css={styleLineRight}>{accountNumber}</div>
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
      <ModalChatPayement
        isOpen={isOpenPayment}
        onChangeIsOpen={setIsOpenPayment}
        roomInfo={roomInfo}
        account={account}
      />
    </div>
  );
};

export default MessageAccount;
