import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import type { EventItem, RandomBoxResult } from "@/types/event2025spring";

import { useDelayBoolean } from "@/hooks/useDelay";
import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import BodyRandomBox from "@/components/Event/BodyRandomBox";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { eventMode } from "@/tools/loadenv";
import theme from "@/tools/theme";

import { ReactComponent as CreditIcon } from "@/static/events/2025springCredit.svg";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

type ModalEvent2025SpringItemProps = Parameters<typeof Modal>[0] & {
  itemInfo: EventItem;
  fetchItems?: () => void;
  setRandomboxResult?: Dispatch<SetStateAction<Nullable<RandomBoxResult>>>;
  setShareItem?: Dispatch<SetStateAction<Nullable<EventItem>>>;
};

const ModalEvent2025SpringItem = ({
  itemInfo,
  fetchItems,
  setRandomboxResult,
  setShareItem,
  ...modalProps
}: ModalEvent2025SpringItemProps) => {
  const event2025SpringInfo = useValueRecoilState("event2025SpringInfo");
  const isLogin = useIsLogin();

  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const [bettingAmount, setBettingAmount] = useState<number>(100);
  const isDisplayRandomBox = !useDelayBoolean(!modalProps.isOpen, 500);
  const isRequesting = useRef<boolean>(false);

  const changeBettingAmountHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.valueAsNumber;
    setBettingAmount(value);
  };

  const onClickOk = useCallback(async () => {
    if (isRequesting.current) return;
    isRequesting.current = true;
    if (bettingAmount <= 0) {
      setAlert("올바른 베팅 수량을 입력해주세요.");
      isRequesting.current = false;
      return;
    }
    if (bettingAmount % 100 !== 0) {
      setAlert("베팅 수량은 100의 배수로 입력해주세요.");
      isRequesting.current = false;
      return;
    }
    await axios({
      url: `/events/2025spring/items/purchase/${itemInfo._id}`,
      method: "post",
      data: { amount: bettingAmount / 100 },
      onSuccess: (result) => {
        fetchItems?.();
        modalProps.onChangeIsOpen?.(false);
        if (itemInfo.itemType === 3) {
          setRandomboxResult?.({ ...result, amount: bettingAmount });
        } else {
          setShareItem?.(itemInfo);
        }
      },
      onError: () => setAlert("구매를 실패하였습니다."),
    });
    isRequesting.current = false;
  }, [itemInfo._id, fetchItems, modalProps.onChangeIsOpen, bettingAmount]);

  const [isDisabled, buttonText] = useMemo(
    () =>
      eventMode !== "2025spring"
        ? [true, "이벤트 기간이 아닙니다"]
        : !event2025SpringInfo || !isLogin
        ? [true, "로그인해야 합니다"]
        : event2025SpringInfo.isAgreeOnTermsOfEvent === false
        ? [true, "이벤트에 참여해야 합니다"]
        : event2025SpringInfo.creditAmount < bettingAmount
        ? [true, "넙죽코인이 부족합니다"]
        : [false, "구매하기"],
    [eventMode, event2025SpringInfo, itemInfo, bettingAmount]
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
      {itemInfo.itemType === 3 && (
        <div>
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
          </div>
          <div
            css={{
              ...theme.font16_bold,
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <CreditIcon
              css={{ width: "27px", height: "16px", marginRight: "5px" }}
            />
            베팅 수량:
            <input
              onChange={changeBettingAmountHandler}
              type="number"
              step="100"
              style={{
                ...theme.font14,
                width: "60px",
                borderRadius: "6px",
                padding: "6px 0",
                background: theme.purple_light,
                boxShadow: theme.shadow_purple_input_inset,
                border: "none",
                outline: "none",
                textAlign: "center",
                marginLeft: "5px",
              }}
              value={bettingAmount}
            />
          </div>
        </div>
      )}
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
            <CreditIcon css={{ width: "27px", height: "16px" }} />
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

export default ModalEvent2025SpringItem;
