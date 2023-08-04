import {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { useValueRecoilState } from "hooks/useFetchRecoilState";
import useIsTimeOver from "hooks/useIsTimeOver";

import AdaptiveDiv from "components/AdaptiveDiv";
import { ModalChatPayement, ModalChatSettlement } from "components/ModalPopup";

import ToolButton from "./ToolButton";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import { dayNowClient, dayServerToClient } from "tools/day";
import theme from "tools/theme";

type ToolSheetProps = {
  roomInfo: Nullable<Room>;
  isOpen: boolean;
  onChangeIsOpen?: (x: boolean) => void;
  onChangeUploadedImage?: (x: Nullable<File>) => void;
};

const ToolSheet = ({
  roomInfo,
  isOpen,
  onChangeIsOpen,
  onChangeUploadedImage,
}: ToolSheetProps) => {
  const setAlert = useSetRecoilState(alertAtom);
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};
  const [isOpenSettlement, setIsOpenSettlement] = useState<boolean>(false);
  const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
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
    if (!isDepart) setAlert("출발 시각 이후에 정산하기 요청을 보내주세요.");
    else if (settlementStatusForMe === "paid")
      setAlert("정산하기 요청은 중복하여 보낼 수 없습니다.");
    else if (roomInfo?.settlementTotal)
      setAlert(
        "정산하기 요청을 한 사용자가 이미 있습니다." +
          "만약 결제하지 않은 사용자가 정산하기 요청을 보냈다면 신고해주세요."
      );
    else setIsOpenSettlement(true);
  }, [isDepart, settlementStatusForMe]);
  const onClickPayment = useCallback(() => {
    if (!isDepart) setAlert("출발 시각 이후에 송금하기 요청을 보내주세요.");
    else if (settlementStatusForMe === "sent")
      setAlert("송금하기 요청은 중복하여 보낼 수 없습니다.");
    else if (!roomInfo?.settlementTotal)
      setAlert("정산하기 요청을 보낸 사용자가 없어 송금하기가 불가능합니다.");
    else setIsOpenPayment(true);
  }, [isDepart, settlementStatusForMe, setIsOpenPayment]);
  const onRecallSettlePayment = useCallback(
    () => onChangeIsOpen?.(false),
    [onChangeIsOpen]
  );

  const styleWrap = {
    position: "absolute" as any,
    width: "100%",
    left: "0",
    bottom: "0",
    transform: `translate(0, ${isOpen ? "0" : "calc(100% + 20px)"})`,
    transition: "all 0.3s",
    padding: "16px 0 14px",
    background: theme.white,
    boxShadow: theme.shadow_clicked,
  };
  const style = {
    display: "flex",
    justifyContent: "space-around",
  };
  return (
    <div css={styleWrap}>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/heic"
        hidden
        ref={inputImageRef}
        onChange={onChangeImage}
      />
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
      {roomInfo && (
        <>
          <ModalChatSettlement
            isOpen={isOpenSettlement}
            onChangeIsOpen={setIsOpenSettlement}
            roomId={roomInfo._id}
            onRecall={onRecallSettlePayment}
          />
          <ModalChatPayement
            isOpen={isOpenPayment}
            onChangeIsOpen={setIsOpenPayment}
            roomId={roomInfo._id}
            onRecall={onRecallSettlePayment}
          />
        </>
      )}
    </div>
  );
};

export default memo(ToolSheet);
