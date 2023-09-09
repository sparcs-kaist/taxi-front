import { useCallback } from "react";

import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import { EventItemProps } from "components/Event/EventItem";
import {
  useFetchEventInfo,
  useValueEventInfo,
} from "pages/Event/hooks/useFetchEventInfo";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "tools/theme";

import { ReactComponent as CreditIcon } from "static/events/2023fallCredit.svg";

export type BodyEventItemProps = {
  itemInfo: EventItemProps;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const BodyEventItem = ({ itemInfo, onChangeIsOpen }: BodyEventItemProps) => {
  const fetchEventInfo = useFetchEventInfo();
  const eventInfo = useValueEventInfo();

  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);

  const onClickOk = useCallback(
    () =>
      axios({
        url: `/events/2023fall/items/purchase/${itemInfo._id}`,
        method: "post",
        onSuccess: () => {
          fetchEventInfo();
          onChangeIsOpen(false);
          setAlert("구매가 완료되었습니다.");
        },
        onError: () => setAlert("구매를 실패하였습니다."),
      }),
    [itemInfo._id]
  );

  return (
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
        disabled={eventInfo ? eventInfo?.creditAmount < itemInfo.price : true}
      >
        구매하기
      </Button>
    </div>
  );
};

export default BodyEventItem;
