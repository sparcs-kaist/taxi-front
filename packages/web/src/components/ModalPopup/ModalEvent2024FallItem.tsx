import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";

import type { EventItem } from "@/types/event2024fall";

import { useDelayBoolean } from "@/hooks/useDelay";
import {
  useFetchRecoilState,
  useIsLogin,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import BodyRandomBox from "@/components/Event/BodyRandomBox";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { eventMode } from "@/tools/loadenv";
import theme from "@/tools/theme";

import { ReactComponent as CreditIcon } from "@/static/events/2023fallCredit.svg";
// ToDo : 2023fall 이미지
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

type ModalEvent2024FallItemProps = Parameters<typeof Modal>[0] & {
  itemInfo: EventItem;
  fetchItems?: () => void;
  setRewardItem?: Dispatch<SetStateAction<Nullable<EventItem>>>;
  setShareItem?: Dispatch<SetStateAction<Nullable<EventItem>>>;
};

const ModalEvent2024FallItem = ({
  itemInfo,
  fetchItems,
  setRewardItem,
  setShareItem,
  ...modalProps
}: ModalEvent2024FallItemProps) => {
  const fetchEvent2024FallInfo = useFetchRecoilState("event2024FallInfo");
  const event2024FallInfo = useValueRecoilState("event2024FallInfo");
  const isLogin = useIsLogin();

  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const isDisplayRandomBox = !useDelayBoolean(!modalProps.isOpen, 500);
  const isRequesting = useRef<boolean>(false);

  const onClickOk = useCallback(async () => {
    if (isRequesting.current) return;
    isRequesting.current = true;
    await axios({
      url: `/events/2024fall/items/purchase/${itemInfo._id}`,
      method: "post",
      onSuccess: ({ reward }) => {
        fetchEvent2024FallInfo();
        fetchItems?.();
        modalProps.onChangeIsOpen?.(false);
        if (itemInfo.itemType === 3 && reward) {
          setRewardItem?.(reward);
        } else {
          setShareItem?.(itemInfo);
        }
      },
      onError: () => setAlert("구매를 실패하였습니다."),
    });
    isRequesting.current = false;
  }, [
    itemInfo._id,
    fetchItems,
    modalProps.onChangeIsOpen,
    fetchEvent2024FallInfo,
  ]);

  const [isDisabled, buttonText] = useMemo(
    () =>
      eventMode !== "2024fall"
        ? [true, "이벤트 기간이 아닙니다"]
        : itemInfo.stock <= 0
        ? [true, "매진된 상품입니다"]
        : !event2024FallInfo || !isLogin
        ? [true, "로그인 후 구매가 가능합니다"]
        : event2024FallInfo.creditAmount < itemInfo.price
        ? [true, "송편이 부족합니다"]
        : [false, "구매하기"],
    [eventMode, event2024FallInfo, itemInfo]
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
      {itemInfo.itemType === 3 ? (
        isDisplayRandomBox ? (
          <BodyRandomBox isBoxOpend={false} />
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
          <CreditIcon css={{ width: "27px", height: "16px" }} />
          <div>{itemInfo.price}</div>
        </div>
      </div>

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

export default ModalEvent2024FallItem;
