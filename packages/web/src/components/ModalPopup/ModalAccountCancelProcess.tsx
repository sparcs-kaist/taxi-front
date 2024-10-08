import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Modal from "@/components/Modal";

import Button from "../Button";
import { useOnClickLogout } from "../Link/LinkLogout";
import BodyAccountCancelProcess from "./Body/BodyAccountCancelProcess";
import BodyAccountCancelProcess2nd from "./Body/BodyAccountCancelProcess2nd";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

import { ReactComponent as TaxiLogo } from "@/static/assets/sparcsLogos/TaxiLogo.svg";

type PopupAccountCancelProcessProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

const ModalAccountCancelProcess = ({
  isOpen,
  onChangeIsOpen = () => {},
}: PopupAccountCancelProcessProps) => {
  const axios = useAxios();
  const { t } = useTranslation("mypage");
  const setAlert = useSetRecoilState(alertAtom);
  const onClickLogout = useOnClickLogout();

  const { id: userId } = useValueRecoilState("loginInfo") || {};
  const myRooms = useValueRecoilState("myRooms");
  const myOngoingRoom = myRooms?.ongoing.slice() ?? [];
  const roomCompleted = myOngoingRoom.length === 0;

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

  const onCancel = async () => {
    const response = await axios({
      url: "/users/withdraw",
      method: "post",
      data: { userId },
      onSuccess: () => {
        setAlert("회원 탈퇴가 완료되었습니다.");
        onClickLogout();
      },
      onError: () => setAlert("회원 탈퇴에 실패하였습니다."),
    });
    if (response.status === 200) onClickLogout();
  };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      width={theme.modal_width_large}
      padding="16px"
    >
      <div style={styleTop}>
        <TaxiLogo style={{ height: "27px" }} />
        {t("cancel_account")}
      </div>
      {page === 1 ? (
        <BodyAccountCancelProcess roomCompleted={roomCompleted} />
      ) : (
        <BodyAccountCancelProcess2nd />
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
                  backgroundColor: "hsl(0, 80%, 60%)",
                  ...theme.font14_bold,
                }}
                onClick={onCancel}
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

export default ModalAccountCancelProcess;
