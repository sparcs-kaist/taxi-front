import Modal from "components/common/modal/Modal";
import Button from "components/common/Button";
import theme from "styles/theme";
import PopupContainer from "components/Chatting/Header/Popup/PopupContainer";
import DottedLine from "components/common/DottedLine";

type SendAccoundModalProps = {
  popup: boolean;
  onClickClose: () => void;
  onClickOk: () => void;
};

const SendAccountModal = (props: SendAccoundModalProps) => {
  return (
    <PopupContainer>
      <div>계좌 보내기</div>
      <div>본인의 계좌 정보를 채팅창에 전송할 수 있습니다.</div>
      <DottedLine />
      <div></div>
    </PopupContainer>
  );
};

export default SendAccountModal;
