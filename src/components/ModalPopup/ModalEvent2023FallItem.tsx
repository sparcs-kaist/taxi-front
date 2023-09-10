import { useCallback } from "react";

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
};

const ModalEvent2023FallItem = ({
  itemInfo,
  ...modalProps
}: ModalEvent2023FallItemProps) => {
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
          modalProps.onChangeIsOpen?.(false);
          setAlert("구매가 완료되었습니다.");
        },
        onError: () => setAlert("구매를 실패하였습니다."),
      }),
    [itemInfo._id]
  );

  return (
    <Modal {...modalProps} padding="16px 12px 12px">
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
          disabled={
            eventMode !== "2023fall" ||
            !event2023FallInfo ||
            event2023FallInfo.creditAmount < itemInfo.price
          }
        >
          {eventMode != "2023fall"
            ? "이벤트 기간이 아닙니다."
            : !event2023FallInfo
            ? "이벤트 정보를 불러오는 중입니다."
            : event2023FallInfo.creditAmount < itemInfo.price
            ? "송편이 부족합니다."
            : "구매하기"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEvent2023FallItem;
