import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";
import { GameItem } from "@/types/game";
import { useValueRecoilState, useIsLogin } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";
import { useSetRecoilState } from "recoil";
import alertAtom from "@/atoms/alert";
import Modal from "@/components/Modal";
import { ReactComponent as CreditIcon } from "@/static/events/2025springCredit.svg";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import theme from "@/tools/theme";
import Button from "@/components/Button";

type ModalGameItemProps = Parameters<typeof Modal>[0] & {
    itemInfo: GameItem;
    fetchItems?: () => void;
    setShareItem?: Dispatch<SetStateAction<Nullable<GameItem>>>;
  };
const ModalGameItem = ({
    itemInfo,
    fetchItems,
    setShareItem,
    ...modalProps
  }: ModalGameItemProps) => {
    const gameInfo = useValueRecoilState("gameInfo");
    const isLogin = useIsLogin();
  
    const axios = useAxios();
    const setAlert = useSetRecoilState(alertAtom);
    const isRequesting = useRef<boolean>(false);
  
    const onClickOk = useCallback(async () => {
      if (isRequesting.current) return;
      isRequesting.current = true;
      await axios({
        url: `/events/2025spring/items/purchase/${itemInfo._id}`, // TODO: game
        method: "post",
        data: { amount: 0 },
        onSuccess: (result) => {
          fetchItems?.();
          modalProps.onChangeIsOpen?.(false);
            setShareItem?.(itemInfo);
        },
        onError: () => setAlert("구매를 실패하였습니다."),
      });
      isRequesting.current = false;
    }, [itemInfo._id, fetchItems, modalProps.onChangeIsOpen, 0]);
  
    const [isDisabled, buttonText] = useMemo(
      () =>
        !gameInfo || !isLogin
          ? [true, "로그인해야 합니다"]
<<<<<<< HEAD
          : gameInfo.isAgreeOnTermsOfEvent === false
          ? [true, "이벤트에 참여해야 합니다"]
          : gameInfo.creditAmount < 0
=======
          : gameInfo.creditAmount < itemInfo.price
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
          ? [true, "넙죽코인이 부족합니다"]
          : [false, "구매하기"],
      [gameInfo, itemInfo]
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
        </div><div
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
  
  export default ModalGameItem;