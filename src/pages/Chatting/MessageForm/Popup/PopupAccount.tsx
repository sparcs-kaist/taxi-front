import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import Modal from "components/Modal";
import Button from "components/Button";
import theme from "tools/theme";
import DottedLine from "components/DottedLine";
import AccountSelector from "components/AccountSelector";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import { Link } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
import regExpTest from "tools/regExpTest";

type SendAccoundModalProps = {
  popup: boolean;
  onClickClose: () => void;
  onClickOk: (account: string) => void;
};

const PopupAccount = (props: SendAccoundModalProps) => {
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const [accountNumber, setAccountNumber] = useState(
    loginInfoDetail?.account || ""
  );

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

  useEffect(() => {
    if (!props.popup) {
      setAccountNumber(loginInfoDetail?.account || "");
    }
  }, [props.popup]);

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
          disabled={!regExpTest.accountNumber(accountNumber)}
        >
          전송
        </Button>
      </div>
    </Modal>
  );
};

export default PopupAccount;
