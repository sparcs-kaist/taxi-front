import { useCallback, useMemo } from "react";

import type { EventItem } from "types/event2023fall";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import Modal from "components/Modal";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import { eventMode } from "tools/loadenv";
import theme from "tools/theme";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { ReactComponent as CreditIcon } from "static/events/2023fallCredit.svg";

type ModalEvent2023FallItemProps = Parameters<typeof Modal>[0] & {
  itemInfo: EventItem;
  fetchItems?: () => void;
};

const ModalEvent2023FallItem = ({
  itemInfo,
  fetchItems,
  ...modalProps
}: ModalEvent2023FallItemProps) => {
  const fetchEvent2023FallInfo = useFetchRecoilState("event2023FallInfo");
  const event2023FallInfo = useValueRecoilState("event2023FallInfo");

  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);

  const onClickOk = useCallback(
    () =>
      axios({
        url: `/events/2023fall/items/purchase/${itemInfo._id}`,
        method: "post",
        onSuccess: () => {
          fetchEvent2023FallInfo();
          fetchItems?.();
          modalProps.onChangeIsOpen?.(false);
          setAlert("구매가 완료되었습니다.");
        },
        onError: () => setAlert("구매를 실패하였습니다."),
      }),
    [itemInfo._id]
  );

  const [isDisabled, buttonText] = useMemo(
    () =>
      eventMode !== "2023fall"
        ? [true, "이벤트 기간이 아닙니다"]
        : itemInfo.stock <= 0
        ? [true, "매진된 상품은 구매할 수 없습니다"]
        : !event2023FallInfo
        ? [true, "로그인 후 구매가 가능합니다"]
        : event2023FallInfo.creditAmount < itemInfo.price
        ? [true, "송편이 부족하여 구매할 수 없습니다"]
        : [false, "구매하기"],
    [eventMode, event2023FallInfo, itemInfo]
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
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          gap: "10px",
        }}
      >
        <img
          css={{
            width: "100%",
            borderRadius: "12px",
            aspectRatio: "1/1",
          }}
          src={itemInfo.imageUrl}
          alt={itemInfo.name}
        />
        <div css={theme.font16_bold}>{itemInfo.name}</div>
        <div css={theme.font14}>{itemInfo.description}</div>
        <div
          css={{
            display: "flex",
            gap: "4px",
          }}
        >
          <CreditIcon style={{ width: "27px", height: "16px" }} />
          <div>{itemInfo.price}</div>
        </div>
        <Button
          type="purple_inset"
          css={{
            width: "100%",
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

export default ModalEvent2023FallItem;
