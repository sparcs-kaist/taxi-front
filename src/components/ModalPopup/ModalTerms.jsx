import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { useFetchRecoilState } from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import { useOnClickLogout } from "components/Link/LinkLogout";
import Modal from "components/Modal";

import BodyTerms from "./Body/BodyTerms";

import alertAtom from "atoms/alert";
import loginInfoAtom from "atoms/loginInfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

import theme from "tools/theme";

import { ReactComponent as TaxiLogo } from "static/assets/TaxiLogo.svg";

const Agree = (props) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const fetchLoginInfo = useFetchRecoilState("loginInfo");

  const onAgree = async () => {
    await axios({
      url: "/users/agreeOnTermsOfService",
      method: "post",
      onError: () => setAlert("약관 동의에 실패하였습니다."),
    });
    fetchLoginInfo();
    props.onAgree();
  };
  const styleBottom = {
    display: "flex",
    justifyContent: "flex-end",
    columnGap: "8px",
    marginTop: "16px",
  };
  if (props.didAgree === undefined) return null;
  return (
    <div style={styleBottom}>
      {props.didAgree ? (
        "이미 동의하셨습니다."
      ) : (
        <>
          <Button
            type="gray"
            padding="9px 24px 10px"
            radius={8}
            font={theme.font14}
            onClick={props.onClose}
          >
            취소
          </Button>
          <Button
            type="purple_inset"
            padding="9px 24px 10px"
            radius={8}
            font={theme.font14_bold}
            onClick={onAgree}
          >
            동의
          </Button>
        </>
      )}
    </div>
  );
};
Agree.propTypes = {
  didAgree: PropTypes.any,
  onClose: PropTypes.func,
  onAgree: PropTypes.func,
};

const ModalTerms = (props) => {
  const { t } = useTranslation("mypage");
  const onClickLogout = useOnClickLogout();
  const loginInfo = useRecoilValue(loginInfoAtom);
  const didAgree = loginInfo?.agreeOnTermsOfService ?? false;

  const onClose = async () => {
    if (didAgree === null) return;
    if (didAgree === true) {
      props.onChangeIsOpen(false);
      return;
    }
    onClickLogout();
  };

  const styleTop = {
    display: "flex",
    alignItems: "center",
    margin: "8px 0 16px 8px",
    ...theme.font16_bold,
    columnGap: "8px",
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onChangeIsOpen={onClose}
      width={theme.modal_width_large}
      padding="16px"
    >
      <div style={styleTop}>
        <TaxiLogo alt="taxi-logo" style={{ height: "27px" }} />
        {t("terms")}
      </div>
      <BodyTerms />
      <div data-cy="agreement-bottom">
        <Agree
          didAgree={didAgree}
          onClose={onClose}
          onAgree={() => props.onChangeIsOpen(false)}
        />
      </div>
    </Modal>
  );
};
ModalTerms.propTypes = {
  isOpen: PropTypes.bool,
  onChangeIsOpen: PropTypes.func,
};
ModalTerms.defaultProps = {
  onChangeIsOpen: () => {},
};

export default ModalTerms;
