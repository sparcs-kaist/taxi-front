import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useAccountFromChats from "hooks/chat/useAccountFromChats";
import { useValueRecoilState } from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import ButtonShare from "components/Button/ButtonShare";
import DottedLine from "components/DottedLine";
import LinkCopy from "components/Link/LinkCopy";
import LinkPayment from "components/Link/LinkPayment";
import Modal from "components/Modal";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "tools/theme";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import { ReactComponent as KakaoPayLogo } from "static/assets/serviceLogos/KakaoPayLogo.svg";
import { ReactComponent as TossLogo } from "static/assets/serviceLogos/TossLogo.svg";

type ModalChatSettlementProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
> & {
  roomInfo: Room;
  onRecall?: () => void;
  account: ReturnType<typeof useAccountFromChats>;
};

const ModalChatSettlement = ({
  roomInfo,
  account,
  onRecall,
  ...modalProps
}: ModalChatSettlementProps) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};
  const isRequesting = useRef<boolean>(false);
  const [isCopied, setIsCopied] = useState(false);
  const settlementStatusForMe = useMemo(
    () =>
      roomInfo &&
      roomInfo.part.filter((user) => user._id === userOid)?.[0]?.isSettlement,
    [userOid, roomInfo]
  );
  const onCopy = useCallback(() => setIsCopied(true), [setIsCopied]);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const onClickOk = async () => {
    if (isRequesting.current) return;
    isRequesting.current = true;
    await axios({
      url: "/rooms/commitSettlement",
      method: "post",
      data: { roomId: roomInfo._id },
      onSuccess: () => {
        modalProps.onChangeIsOpen?.(false);
        onRecall?.();
      },
      onError: () => setAlert("송금하기를 실패하였습니다."),
    });
    isRequesting.current = false;
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
    ...theme.font14,
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    margin: "0 8px 12px",
    color: theme.gray_text,
  };

  return (
    <Modal {...modalProps} padding="16px 12px 12px" onEnter={onClickOk}>
      <div css={styleTitle}>
        <LocalAtmRoundedIcon style={styleIcon} />
        송금하기
      </div>
      {account && (
        <>
          <div css={styleText}>
            택시비 결제자의 계좌번호를 참고하시어 송금해 주세요. 결제 방법 선택
            시에 해당 앱으로 이동합니다.
          </div>
          <div css={styleAccount} className="selectable">
            계좌번호
            <div css={{}}>{account}</div>
          </div>
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <LinkCopy value={account} onCopy={onCopy}>
              <ButtonShare
                text="계좌 복사"
                icon={
                  isCopied ? (
                    <CheckRoundedIcon
                      style={{ fontSize: "16px", color: theme.gray_text }}
                    />
                  ) : (
                    <ContentCopyIcon
                      style={{ fontSize: "16px", color: theme.gray_text }}
                    />
                  )
                }
                background={theme.gray_background}
              />
            </LinkCopy>
            <LinkPayment type="kakaopay" account={account}>
              <ButtonShare
                text="카카오페이"
                icon={<KakaoPayLogo css={{ width: "22px" }} />}
                background="#FFEB00"
              />
            </LinkPayment>
            <LinkPayment type="toss" account={account}>
              <ButtonShare
                text="토스"
                icon={<TossLogo css={{ width: "24px" }} />}
                background="#0050FF"
              />
            </LinkPayment>
          </div>
          <DottedLine />
          <div css={{ height: "12px" }} />
        </>
      )}
      <div css={styleText}>
        택시비 결제자에게 송금 후 <b>송금 확인</b> 버튼을 눌러주세요.
      </div>
      <div css={styleText}>
        • 완료 후 취소는 <b>불가능</b>합니다.
        <br />
        <span css={{ color: theme.red_text }}>
          • 결제자에게 금액을 송금한 경우에만 진행해주세요.
        </span>
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
          disabled={settlementStatusForMe !== "send-required"}
        >
          {settlementStatusForMe === "send-required"
            ? "송금 확인"
            : settlementStatusForMe === "sent"
            ? "송금 확인 완료"
            : "송금 확인 불가능"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalChatSettlement;
