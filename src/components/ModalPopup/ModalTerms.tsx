import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import { useOnClickLogout } from "components/Link/LinkLogout";
import Modal from "components/Modal";

import BodyTerms from "./Body/BodyTerms";
import BodyTermsPrivacy from "./Body/BodyTermsPrivacy";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "tools/theme";

import { ReactComponent as TaxiLogo } from "static/assets/TaxiLogo.svg";

type ModalTermsProps = {
  isOpen: boolean;
  onChangeIsOpen?: (isOpen: boolean) => void;
};

const ModalTerms = ({ isOpen, onChangeIsOpen = () => {} }: ModalTermsProps) => {
  const axios = useAxios();
  const { t } = useTranslation("mypage");
  const onClickLogout = useOnClickLogout();
  const setAlert = useSetRecoilState(alertAtom);

  const [page, setPage] = useState<1 | 2>(1);

  const loginInfo = useValueRecoilState("loginInfo");
  const fetchLoginInfo = useFetchRecoilState("loginInfo");
  const isLogin = !!loginInfo?.id; // 로그인 여부
  const isAgree = !!loginInfo?.agreeOnTermsOfService; // 이용약관 동의 여부

  useEffect(() => {
    if (isOpen) setPage(1);
  }, [isOpen]);
  useEffect(() => {
    if (isAgree) onClose();
  }, [isAgree]);

  const onAgree = async () => {
    await axios({
      url: "/users/agreeOnTermsOfService",
      method: "post",
      onError: () => setAlert("약관 동의에 실패하였습니다."),
    });
    fetchLoginInfo();
  };
  const onClose = () => {
    if (isLogin && !isAgree) {
      onClickLogout();
    }
    onChangeIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onClose}
      width={theme.modal_width_large}
      padding="16px"
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          margin: "8px 0 16px 8px",
          ...theme.font16_bold,
          columnGap: "8px",
        }}
      >
        <TaxiLogo style={{ height: "27px" }} />
        {t(page === 1 ? "terms" : "terms_privacy")}
      </div>
      {page === 1 ? <BodyTerms /> : <BodyTermsPrivacy />}
      <div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          columnGap: "8px",
          marginTop: "16px",
        }}
      >
        {isLogin && !isAgree ? (
          page === 1 ? (
            <>
              <Button
                type="gray"
                padding="9px 24px 10px"
                radius={8}
                font={theme.font14}
                onClick={onClose}
              >
                취소
              </Button>
              <Button
                type="purple_inset"
                padding="9px 24px 10px"
                radius={8}
                font={theme.font14_bold}
                onClick={() => setPage(2)}
              >
                동의 및 다음
              </Button>
            </>
          ) : (
            <>
              <Button
                type="gray"
                padding="9px 24px 10px"
                radius={8}
                font={theme.font14}
                onClick={() => setPage(1)}
              >
                이전
              </Button>
              <Button
                type="purple_inset"
                padding="9px 24px 10px"
                radius={8}
                font={theme.font14_bold}
                onClick={onAgree}
              >
                동의 및 서비스 이용
              </Button>
            </>
          )
        ) : page === 1 ? (
          <>
            <Button
              type="gray"
              padding="9px 24px 10px"
              radius={8}
              font={theme.font14}
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type="purple_inset"
              padding="9px 24px 10px"
              radius={8}
              font={theme.font14_bold}
              onClick={() => setPage(2)}
            >
              다음
            </Button>
          </>
        ) : (
          <>
            <Button
              type="gray"
              padding="9px 24px 10px"
              radius={8}
              font={theme.font14}
              onClick={() => setPage(1)}
            >
              이전
            </Button>
            <Button
              type="purple_inset"
              padding="9px 24px 10px"
              radius={8}
              font={theme.font14_bold}
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

export default ModalTerms;
