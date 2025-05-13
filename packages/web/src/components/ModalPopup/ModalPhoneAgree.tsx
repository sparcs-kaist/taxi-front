import Button from "@/components/Button";
import Modal from "@/components/Modal";

import theme from "@/tools/theme";

type ConfirmPhoneModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmPhoneModal({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmPhoneModalProps) {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 10px 12px",
    letterSpacing: "0.5px",
  };

  const styleText = {
    ...theme.font14,
    color: theme.black,
    margin: "12px 8px",
    padding: "12px 10px",
  };

  const styleButtonGroup = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 16px",
    marginTop: "20px",
    marginBottom: "10px",
  };

  const styleButton = {
    flex: 1,
    margin: "0 4px",
    padding: "10px 0",
    borderRadius: "8px",
    ...theme.font14_bold,
  } as const;

  return (
    <Modal isOpen={isOpen} padding="30px 0px" onEnter={onConfirm}>
      <div css={styleTitle}>전화번호 사용 동의</div>
      <div css={styleText}>
        {" "}
        <p css={{ padding: "10px 0" }}>
          전화번호를 등록하시겠습니까? 전화번호 등록 시, Taxi만의 멋진 배지를
          드립니다! 배지는 사용자 정보 설정에서 비활성화 하실 수 있습니다.
        </p>{" "}
        <p css={{ color: theme.red_text }}>
          전화번호는 향후 서비스 신고 대응 및 본인 확인을 위해 사용될 수
          있습니다. 또한, 입력하신 연락처는 이후 수정이 불가능하니 정확히
          작성해주시기 바랍니다.
        </p>
      </div>
      <div css={styleButtonGroup}>
        <Button type="gray" css={styleButton} onClick={onCancel}>
          아니오
        </Button>
        <Button type="purple_inset" css={styleButton} onClick={onConfirm}>
          네
        </Button>
      </div>
    </Modal>
  );
}
