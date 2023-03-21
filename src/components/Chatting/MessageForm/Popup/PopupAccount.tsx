import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Modal from "components/common/modal/Modal";
import Button from "components/common/Button";
import theme from "styles/theme";
import DottedLine from "components/common/DottedLine";
import AccountSelector from "components/common/AccountSelector";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import { Link } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";

type SendAccoundModalProps = {
  popup: boolean;
  onClickClose: () => void;
  onClickOk: (account: string) => void;
};

const PopupAccount = (props: SendAccoundModalProps) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);
  const regexAccountNumber = new RegExp("^[A-Za-z가-힣]{2,7} [0-9]{10,14}$");

  useEffect(() => {
    if (loginInfoDetail?.account) {
      setAccountNumber(loginInfoDetail?.account);
    }
  }, [loginInfoDetail]);

  const styleTitle = {
    display: "flex",
    alignItems: "center",
  };

  const styleText = {
    ...theme.font14,
    color: theme.gray_text,
  };

  const handleClickOk = () => {
    props.onClickOk(accountNumber);
  };

  return (
    <Modal
      display={props.popup}
      onClickClose={props.onClickClose}
      padding="10px"
    >
      <div
        style={{
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={styleTitle}>
          <WalletIcon />
          계좌 보내기
        </div>
        {loginInfoDetail?.account ? (
          <div style={styleText}>
            본인의 계좌 정보를 채팅창에 전송할 수 있습니다.
          </div>
        ) : (
          <div style={styleText}>
            계좌를 변경하고 싶으신 경우 <Link to="/mypage">마이 페이지</Link>의
            “수정하기” 메뉴를 이용해주세요.
          </div>
        )}
        <DottedLine />
        <AccountSelector
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          disabled={loginInfoDetail?.account ? true : false}
        />
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Button
          type="gray"
          width="calc(50% - 5px)"
          padding="10px 0 9px"
          radius={8}
          font={theme.font14}
          onClick={props.onClickClose}
        >
          돌아가기
        </Button>
        <Button
          type="purple_inset"
          width="calc(50% - 5px)"
          padding="10px 0 9px"
          radius={8}
          font={theme.font14_bold}
          onClick={handleClickOk}
          disabled={!regexAccountNumber.test(accountNumber)}
        >
          전송
        </Button>
      </div>
    </Modal>
  );
};

export default PopupAccount;
