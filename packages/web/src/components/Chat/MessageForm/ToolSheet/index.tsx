import {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import useAccountFromChats from "@/hooks/chat/useAccountFromChats";
import useSendMessage from "@/hooks/chat/useSendMessage";
import useSettlementFromChats from "@/hooks/chat/useSettlementFromChats";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import useIsTimeOver from "@/hooks/useIsTimeOver";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import {
  ModalChatPayment,
  ModalChatSaveAccount,
  ModalChatSettlement,
} from "@/components/ModalPopup";

import ToolButton from "./ToolButton";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { dayNowClient, dayServerToClient } from "@/tools/day";
import theme from "@/tools/theme";

import { keyframes } from "@emotion/react";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

type ToolSheetProps = {
  roomInfo: Nullable<Room>;
  isOpen: boolean;
  onChangeIsOpen?: (x: boolean) => void;
  onChangeUploadedImage?: (x: Nullable<File>) => void;
  account: ReturnType<typeof useAccountFromChats>;
  settlement: ReturnType<typeof useSettlementFromChats>;
  sendMessage: ReturnType<typeof useSendMessage>;
};

const ToolSheet = ({
  roomInfo,
  isOpen,
  onChangeIsOpen,
  onChangeUploadedImage,
  account,
  settlement,
  sendMessage,
}: ToolSheetProps) => {
  const setAlert = useSetRecoilState(alertAtom);
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};
  const [accountToSave, setAccountToSave] = useState<string>("");
  const [isOpenSettlement, setIsOpenSettlement] = useState<boolean>(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
  const [isOpenSaveAccount, setIsOpenSaveAccount] = useState<boolean>(true);
  const isDepart = useIsTimeOver(
    roomInfo ? dayServerToClient(roomInfo.time) : dayNowClient()
  ); // 방 출발 여부
  const settlementStatusForMe = useMemo(
    () =>
      roomInfo &&
      roomInfo.part.filter((user) => user._id === userOid)?.[0]?.isSettlement,
    [userOid, roomInfo]
  );

  const inputImageRef = useRef<HTMLInputElement>(null);
  const onChangeImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target?.files?.[0];
      onChangeUploadedImage?.(file);
      onChangeIsOpen?.(false);
      e.target.value = "";
    },
    [onChangeUploadedImage, onChangeIsOpen]
  );
  const onClickImage = useCallback(() => inputImageRef.current?.click(), []);
  const onClickSettlement = useCallback(() => {
    if (!isDepart)
      setAlert("출발 시각 이후부터 정산 및 송금하기가 가능합니다.");
    else if (settlementStatusForMe === "paid")
      setAlert("정산하기는 중복하여 수행될 수 없습니다.");
    else if (roomInfo?.settlementTotal)
      setAlert(
        <>
          정산하기 요청을 한 사용자가 이미 있습니다.
          <br />
          만약 결제하지 않은 사용자가 정산하기 요청을 보냈다면 신고해주세요.
        </>
      );
    else setIsOpenSettlement(true);
  }, [isDepart, settlementStatusForMe]);
  const onClickPayment = useCallback(() => {
    if (!isDepart)
      setAlert("출발 시각 이후부터 정산 및 송금하기가 가능합니다.");
    else if (!roomInfo?.settlementTotal)
      setAlert("정산하기를 요청한 사용자가 없어 송금하기가 불가능합니다.");
    else setIsOpenPayment(true);
  }, [isDepart, settlementStatusForMe, setIsOpenPayment]);
  const onRecallSettlePayment = useCallback(
    () => onChangeIsOpen?.(false),
    [onChangeIsOpen]
  );
  const openSaveAccountModal = useCallback((account: string) => {
    setAccountToSave(account);
    setIsOpenSaveAccount(true);
  }, []);

  const stylePanel = {
    position: "absolute" as any,
    width: "100%",
    left: "0",
    bottom: "0",
    padding: "16px 0 14px",
    background: theme.white,
    boxShadow: theme.shadow_clicked,
    animation: `${slideUp} 0.25s ease`,
  };
  const style = {
    display: "flex",
    justifyContent: "space-around",
  };
  return (
    <>
      {/* 파일 input과 모달은 항상 마운트 유지 (모달은 전역 atom에 등록되므로 언마운트 시 닫힘) */}
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/heic"
        hidden
        ref={inputImageRef}
        onChange={onChangeImage}
      />
      {/* 3메뉴 패널은 + 버튼으로 열었을 때(isOpen)만 입력창 위에 출현 */}
      {isOpen && (
        <div css={stylePanel}>
          <AdaptiveDiv type="center">
            <div css={style}>
              <ToolButton type="image" onClick={onClickImage} />
              <ToolButton
                type="settlement"
                onClick={onClickSettlement}
                isVaild={isDepart && !roomInfo?.settlementTotal}
              />
              <ToolButton
                type="payment"
                onClick={onClickPayment}
                isVaild={
                  isDepart &&
                  !!roomInfo?.settlementTotal &&
                  settlementStatusForMe === "send-required"
                }
              />
            </div>
          </AdaptiveDiv>
        </div>
      )}
      {roomInfo && (
        <>
          <ModalChatSettlement
            isOpen={isOpenSettlement}
            onChangeIsOpen={setIsOpenSettlement}
            roomInfo={roomInfo}
            onRecall={onRecallSettlePayment}
            openSaveAccountModal={openSaveAccountModal}
          />
          <ModalChatPayment
            isOpen={isOpenPayment}
            onChangeIsOpen={setIsOpenPayment}
            roomInfo={roomInfo}
            account={account}
            settlement={settlement}
            onRecall={onRecallSettlePayment}
          />
          {accountToSave && (
            <ModalChatSaveAccount
              isOpen={isOpenSaveAccount}
              onChangeIsOpen={setIsOpenSaveAccount}
              account={accountToSave}
            />
          )}
        </>
      )}
    </>
  );
};

export default memo(ToolSheet);
