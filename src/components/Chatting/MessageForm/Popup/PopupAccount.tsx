import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Modal from "components/common/modal/Modal";
import Button from "components/common/Button";
import theme from "styles/theme";
import PopupContainer from "components/Chatting/MessageForm/Popup/PopupAccountContainer";
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
  console.log("popupAccount");
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
    console.log("click ok");
    props.onClickOk(accountNumber);
  };

  return (
    <PopupContainer
      onClickClose={props.onClickClose}
      onClickOk={handleClickOk}
      nameOk="전송"
      OkDisabled={!regexAccountNumber.test(accountNumber)}
      popup={props.popup}
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
    </PopupContainer>
  );
};

export default PopupAccount;
