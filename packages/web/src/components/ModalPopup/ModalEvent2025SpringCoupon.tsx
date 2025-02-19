import { useCallback, useMemo, useState } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Input from "@/components/Input";
import Modal from "@/components/Modal";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import regExpTest from "@/tools/regExpTest";
import theme from "@/tools/theme";

import FestivalRoundedIcon from "@mui/icons-material/FestivalRounded";

type ModalEvent2025SpringCouponProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
> & {
  setIsOpen: (isOpen: boolean) => void;
};

const ModalEvent2025SpringCoupon = ({
  setIsOpen,
  ...modalProps
}: ModalEvent2025SpringCouponProps) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
const fetchEvent2025SpringInfo = useFetchRecoilState("event2025SpringInfo");

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
  const styleGuide = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };
  const styleInputWrap = {
    margin: "0 8px 12px",
    display: "flex",
    alignItems: "center",
    color: theme.gray_text,
    whiteSpace: "nowrap",
    ...theme.font14,
  };

  const [couponCode, setCouponCode] = useState("");
  const isValidCouponCode = useMemo(
    () => regExpTest.eventCouponCode(couponCode),
    [couponCode]
  );

  const onClickUse = useCallback(() => {
    axios({
      url: `/events/2025spring/items/useCoupon/${couponCode}`,
      method: "post",
      onSuccess: (data) => {
        setAlert(`쿠폰을 사용하여 넙죽코인 ${data.reward}개를 획득하였습니다.`);
        setIsOpen(false);
        fetchEvent2025SpringInfo();
      },
      onError: (e: any) => {
        if (
          e?.response?.data.error === "Items/useCoupon : already used coupon"
        ) {
          setAlert("이미 사용한 쿠폰입니다.");
        } else {
          setAlert("올바르지 않은 쿠폰번호입니다.");
        }
      },
    });
  }, [couponCode, setCouponCode]);

  return (
    <Modal padding="16px 12px 12px" {...modalProps}>
      <div css={styleTitle}>
        <FestivalRoundedIcon style={styleIcon} />
        쿠폰 사용하기
      </div>
      <div css={styleGuide}>
        각 쿠폰은 <b>1회씩만</b> 사용할 수 있으며, 쿠폰마다 획득할 수 있는
        넙죽코인의 수가 다릅니다. 쿠폰번호는 <b>대소문자를 구분</b>하오니
        정확하게 입력해주세요.
      </div>
      <DottedLine />
      <div css={{ height: "12px" }} />
      <div css={styleInputWrap}>
        쿠폰번호
        <Input
          value={couponCode}
          onChangeValue={setCouponCode}
          placeholder="알파벳과 숫자로 구성된 쿠폰번호를 입력하세요"
          css={{ width: "100%", marginLeft: "10px" }}
        />
      </div>
      <Button
        type="purple_inset"
        css={{
          width: "100%",
          padding: "10px 0 9px",
          borderRadius: "8px",
          ...theme.font14_bold,
        }}
        onClick={onClickUse}
        disabled={!isValidCouponCode}
      >
        {!isValidCouponCode ? "올바른 쿠폰번호를 입력하세요" : "쿠폰 사용하기"}
      </Button>
    </Modal>
  );
};

export default ModalEvent2025SpringCoupon;
