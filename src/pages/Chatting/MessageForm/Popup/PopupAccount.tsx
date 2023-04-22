import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AccountSelector from "components/AccountSelector";
import Button from "components/Button";
import DottedLine from "components/DottedLine";
import Modal from "components/Modal";

import loginInfoAtom from "atoms/loginInfo";
import { useRecoilValue } from "recoil";

import regExpTest from "tools/regExpTest";
import theme from "tools/theme";

import WalletIcon from "@mui/icons-material/Wallet";

type SendAccoundModalProps = {
  popup: boolean;
  onClickClose: () => void;
  onClickOk: (account: string) => void;
};

const PopupAccount = (props: SendAccoundModalProps) => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const [accountNumber, setAccountNumber] = useState(loginInfo?.account || "");

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };
  const styleText = {
    ...theme.font14,
    color: theme.gray_text,
  };

  const handleClickOk = () => {
    if (regExpTest.account(accountNumber)) {
      props.onClickOk(accountNumber);
    }
  };

  useEffect(() => {
    if (!props.popup) {
      setAccountNumber(loginInfo?.account || "");
    }
  }, [props.popup, loginInfo?.account]);

  return (
    <Modal
      isOpen={props.popup}
      onChangeIsOpen={props.onClickClose}
      onEnter={handleClickOk}
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
          <WalletIcon style={styleIcon} />
          계좌 보내기
        </div>
        <div style={styleText}>
          계좌를 변경하고 싶으신 경우 <Link to="/mypage">마이 페이지</Link>의
          “수정하기” 메뉴를 이용해주세요.
        </div>
        <DottedLine />
        <AccountSelector
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
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
          disabled={!regExpTest.account(accountNumber)}
        >
          전송
        </Button>
      </div>
    </Modal>
  );
};

export default PopupAccount;
