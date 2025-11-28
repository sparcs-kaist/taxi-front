import Button from "@/components/Button";
import Modal from "@/components/Modal";

import theme from "@/tools/theme";

// -------------------------------------------------------------------------
// [New] 강화 결과 모달 컴포넌트
// -------------------------------------------------------------------------
interface EnhanceResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean;
}

const EnhanceResultModal = ({
  isOpen,
  onClose,
  isSuccess,
}: EnhanceResultModalProps) => {
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    color: isSuccess ? theme.purple : theme.red_text || "#FF5252",
    fontWeight: "bold",
  };

  const styleText = {
    ...theme.font14,
    color: theme.gray_text,
    textAlign: "center" as const,
    marginBottom: "24px",
    lineHeight: "1.5",
  };

  const styleButton = {
    width: "100%",
    padding: "12px 0",
    borderRadius: "8px",
    ...theme.font14_bold,
  };

  return (
    <Modal
      padding="24px 20px 20px"
      isOpen={isOpen}
      onChangeIsOpen={(open) => {
        if (!open) onClose();
      }}
    >
      {/* 1. 결과 타이틀 */}
      <div css={styleTitle}>
        {isSuccess ? "🎉 강화 성공!" : "💥 강화 실패..."}
      </div>

      {/* 2. 택시 이미지 영역 (추가됨) */}
      <div
        style={{
          width: "100%",
          height: "160px", // 모달 크기를 고려해 200px -> 160px로 조정 (원하시면 200px로 변경 가능)
          backgroundColor: theme.gray_background || "#f5f5f5",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
          marginBottom: "16px", // 텍스트와의 간격
        }}
      >
        <img
          // 나중에 성공/실패에 따라 다른 이미지를 보여주려면 여기서 src를 분기처리 할 수 있습니다.
          src="/assets/images/taxi-placeholder.png"
          alt="Taxi Result"
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            objectFit: "contain",
          }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
            (e.target as HTMLElement).parentElement!.innerText =
              "🚖 Taxi Image";
          }}
        />
      </div>

      {/* 3. 결과 텍스트 */}
      <div css={styleText}>
        {isSuccess ? (
          <>
            축하합니다! <br />
            택시가 더욱 강력해졌습니다. (+1강)
          </>
        ) : (
          <>
            아쉽네요... <br />
            강화에 실패하여 재화만 소모되었습니다.
          </>
        )}
      </div>

      <Button type="purple" onClick={onClose} css={styleButton}>
        확인
      </Button>
    </Modal>
  );
};

export default EnhanceResultModal;
