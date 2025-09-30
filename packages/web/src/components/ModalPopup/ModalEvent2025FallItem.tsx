import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";

import type { EventItem } from "@/types/event2025fall";

import { useDelayBoolean } from "@/hooks/useDelay";
import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import BodyRandomBox from "@/components/Event/BodyRandomBox";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { eventMode } from "@/tools/loadenv";
import theme from "@/tools/theme";

import { ReactComponent as TicketIcon } from "@/static/events/2023fallTicket2.svg";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

type ModalEvent2025FallItemProps = Parameters<typeof Modal>[0] & {
  itemInfo: EventItem;
  fetchItems?: () => void;
  setShareItem?: Dispatch<SetStateAction<Nullable<EventItem>>>;
};

const ModalEvent2025FallItem = ({
  itemInfo,
  fetchItems,
  setShareItem,
  ...modalProps
}: ModalEvent2025FallItemProps) => {
  const event2025FallInfo = useValueRecoilState("event2025FallInfo");
  const isLogin = useIsLogin();

  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const isDisplayRandomBox = !useDelayBoolean(!modalProps.isOpen, 500);
  const isRequesting = useRef<boolean>(false);

  const onClickOk = useCallback(async () => {
    if (isRequesting.current) return;
    isRequesting.current = true;
    // if (bettingAmount <= 0) {
    //   setAlert("올바른 베팅 수량을 입력해주세요.");
    //   isRequesting.current = false;
    //   return;
    // }
    // if (bettingAmount % 100 !== 0) {
    //   setAlert("베팅 수량은 100의 배수로 입력해주세요.");
    //   isRequesting.current = false;
    //   return;
    // }

    await axios({
      url: `/events/2025fall/items/purchase/${itemInfo._id}`,
      method: "post",
      data: { amount: 1 },
      onSuccess: (result) => {
        fetchItems?.();
        modalProps.onChangeIsOpen?.(false);
        setShareItem?.(itemInfo);
      },
      onError: () => setAlert("구매를 실패하였습니다."),
    });
    isRequesting.current = false;
  }, [itemInfo._id, fetchItems, modalProps.onChangeIsOpen, 100]);

  const [isDisabled, buttonText] = useMemo(
    () =>
      eventMode !== "2025fall"
        ? [true, "이벤트 기간이 아닙니다"]
        : !event2025FallInfo || !isLogin
        ? [true, "로그인해야 합니다"]
        : event2025FallInfo.isAgreeOnTermsOfEvent === false
        ? [true, "이벤트에 참여해야 합니다"]
        : event2025FallInfo.creditAmount < 100
        ? [true, "응모권이 부족합니다"]
        : [false, "구매하기"],
    [eventMode, event2025FallInfo, itemInfo, 100]
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

  return (
    <Modal padding="16px 12px 12px" {...modalProps}>
      <div css={styleTitle}>
        <AccountBalanceWalletRoundedIcon style={styleIcon} />
        구매하기
      </div>

      <DottedLine />
      {itemInfo.itemType === 3 ? (
        isDisplayRandomBox ? (
          <BodyRandomBox isBoxOpend={false} nonClick />
        ) : (
          <div css={{ textAlign: "center" }}>
            <Loading />
          </div>
        )
      ) : (
        <img
          css={{
            width: "100%",
            borderRadius: "8px",
            aspectRatio: "1/1",
          }}
          src={itemInfo.imageUrl}
          alt={itemInfo.name}
        />
      )}
      {itemInfo.itemType !== 3 && (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: "10px",
            padding: "16px 4px",
          }}
        >
          <div css={theme.font16_bold}>{itemInfo.name}</div>
          <div css={theme.font14}>{itemInfo.description}</div>
          <div
            css={{
              display: "flex",
              gap: "4px",
            }}
          >
            <TicketIcon
              css={{ width: "27px", height: "27px", marginTop: "-5px" }}
            />
            <div>{itemInfo.price}</div>
          </div>
        </div>
      )}

      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="gray"
          css={{
            width: "calc(40% - 10px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14,
          }}
          onClick={() => modalProps?.onChangeIsOpen?.(false)}
        >
          취소
        </Button>
        <Button
          type="purple"
          css={{
            width: "60%",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={onClickOk}
          disabled={isDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEvent2025FallItem;
