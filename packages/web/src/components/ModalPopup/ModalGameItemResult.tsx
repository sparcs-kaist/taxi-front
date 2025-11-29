import Button from "@/components/Button";
import Modal from "@/components/Modal";

import theme from "@/tools/theme";

interface ItemUseResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
}

const ItemUseResultModal = ({
  isOpen,
  onClose,
  itemName,
}: ItemUseResultModalProps) => {
  const styleTitle = {
    ...theme.font18,
    fontWeight: "bold",
    textAlign: "center" as const,
    marginBottom: "16px",
    color: theme.purple, // 성공 색상
  };

  const styleText = {
    ...theme.font14,
    color: theme.gray_text,
    textAlign: "center" as const,
    marginBottom: "24px",
    lineHeight: "1.5",
  };

  return (
    <Modal
      padding="24px 20px 20px"
      isOpen={isOpen}
      onChangeIsOpen={(open) => {
        if (!open) onClose();
      }}
      // zIndex를 높여서 기존 모달 위에 뜨도록 설정 (필요시 Modal 컴포넌트 내부 구현 확인)
    >
      <div css={styleTitle}>✨ 아이템 사용 완료!</div>

      <div css={styleText}>
        <b css={{ color: theme.black }}>{itemName}</b>을(를)
        <br />
        성공적으로 사용했습니다.
      </div>

      <Button
        type="purple"
        onClick={onClose}
        css={{
          width: "100%",
          padding: "12px 0",
          borderRadius: "8px",
          ...theme.font14_bold,
        }}
      >
        확인
      </Button>
    </Modal>
  );
};

export default ItemUseResultModal;
