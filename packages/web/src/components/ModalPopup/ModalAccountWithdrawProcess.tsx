import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Modal from "@/components/Modal";

import Button from "../Button";
import BodyAccountWithdrawProcess from "./Body/BodyAccountWithdrawProcess";
import BodyAccountWithdrawProcess2nd from "./Body/BodyAccountWithdrawProcess2nd";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { deviceType } from "@/tools/loadenv";
import { sendAuthLogoutEventToFlutter } from "@/tools/sendEventToFlutter";
import theme from "@/tools/theme";

import { ReactComponent as TaxiLogo } from "@/static/assets/sparcsLogos/TaxiLogo.svg";

type PopupAccountCancelProcessProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalAccountWithdrawProcess = ({
  isOpen,
  onChangeIsOpen = () => {},
}: PopupAccountCancelProcessProps) => {
  const axios = useAxios();
  const { t } = useTranslation("mypage");
  const setAlert = useSetRecoilState(alertAtom);

  const { id: userId } = useValueRecoilState("loginInfo") || {};
  const myRooms = useValueRecoilState("myRooms");
  const myOngoingRoom = myRooms?.ongoing.slice() ?? [];
  const roomCompleted = myOngoingRoom.length === 0;

  const isEligible = roomCompleted; // TODO : 탈퇴 불가 조건이 추가될 경우, 수정 필요

  const isLogin = useIsLogin();
  const [page, setPage] = useState<1 | 2>(1);

  const styleTop: CSS = {
    display: "flex",
    alignItems: "center",
    margin: "8px 0 16px 8px",
    ...theme.font16_bold,
    columnGap: "8px",
  };

  useEffect(() => {
    if (isOpen) setPage(1);
  }, [isOpen]);

  const onClose = () => {
    onChangeIsOpen(false);
  };

  const onWithdraw = useCallback(async () => {
    try {
      await axios({
        url: "/users/withdraw",
        method: "post",
        data: { userId },
        onSuccess: async ({ ssoLogoutUrl }) => {
          if (deviceType.startsWith("app/"))
            await sendAuthLogoutEventToFlutter();
          window.location.href = ssoLogoutUrl;
        },
        onError: () => {
          setAlert("회원 탈퇴에 실패하였습니다.");
        },
      });
    } catch (error) {
      setAlert("회원 탈퇴에 실패하였습니다.");
    }
  }, [userId, setAlert]);

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      width={theme.modal_width_large}
      padding="16px"
      css={{
        // alert modal의 2배 이하로.
        maxWidth:
          String(Number(theme.modal_width_alert.split("px")[0]) * 2) + "px",
        margin: "auto",
      }}
    >
      <div style={styleTop}>
        <TaxiLogo style={{ height: "27px" }} />
        {t("withdraw_account")}
      </div>
      {page === 1 ? (
        <BodyAccountWithdrawProcess roomCompleted={roomCompleted} />
      ) : (
        <BodyAccountWithdrawProcess2nd />
      )}
      <div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          columnGap: "8px",
          marginTop: "16px",
        }}
      >
        {isLogin ? (
          page === 1 ? (
            <>
              <Button
                type="gray"
                css={{
                  padding: "9px 24px 10px",
                  borderRadius: "8px",
                  ...theme.font14,
                }}
                onClick={onClose}
              >
                취소
              </Button>
              <Button
                type={isEligible ? "purple_inset" : "purple"}
                css={{
                  padding: "9px 24px 10px",
                  borderRadius: "8px",
                  backgroundColor: isEligible
                    ? theme.purple
                    : theme.purple_disabled,
                  ...theme.font14_bold,
                }}
                onClick={() => (isEligible ? setPage(2) : {})}
              >
                다음
              </Button>
            </>
          ) : (
            <>
              <Button
                type="gray"
                css={{
                  padding: "9px 24px 10px",
                  borderRadius: "8px",
                  ...theme.font14,
                }}
                onClick={() => setPage(1)}
              >
                이전
              </Button>
              <Button
                type="purple_inset"
                css={{
                  padding: "9px 24px 10px",
                  borderRadius: "8px",
                  backgroundColor: "hsl(0, 80%, 60%)",
                  ...theme.font14_bold,
                }}
                onClick={onWithdraw}
              >
                탈퇴
              </Button>
            </>
          )
        ) : page === 1 ? (
          <>
            <Button
              type="gray"
              css={{
                padding: "9px 24px 10px",
                borderRadius: "8px",
                ...theme.font14,
              }}
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type="purple_inset"
              css={{
                padding: "9px 24px 10px",
                borderRadius: "8px",
                ...theme.font14_bold,
              }}
              onClick={() => setPage(2)}
            >
              다음
            </Button>
          </>
        ) : (
          <>
            <Button
              type="gray"
              css={{
                padding: "9px 24px 10px",
                borderRadius: "8px",
                ...theme.font14,
              }}
              onClick={() => setPage(1)}
            >
              이전
            </Button>
            <Button
              type="purple_inset"
              css={{
                padding: "9px 24px 10px",
                borderRadius: "8px",
                ...theme.font14_bold,
              }}
              onClick={onClose}
            >
              완료
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalAccountWithdrawProcess;
