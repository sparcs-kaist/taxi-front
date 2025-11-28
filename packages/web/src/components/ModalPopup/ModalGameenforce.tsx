import Button from "@/components/Button";
import Modal from "@/components/Modal";

import theme from "@/tools/theme";

// -------------------------------------------------------------------------
// [Modified] 강화 결과 모달 컴포넌트
// -------------------------------------------------------------------------
export type EnhanceResultType = "success" | "fail" | "broken" | "burst";

interface EnhanceResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: EnhanceResultType; // 결과 상태 (성공, 실패, 하락, 파괴)
  oldLevel: number; // 이전 레벨
  newLevel: number; // 새로운 레벨
}

const EnhanceResultModal = ({
  isOpen,
  onClose,
  oldLevel,
  result,
  newLevel,
}: EnhanceResultModalProps) => {
  // 결과에 따른 색상 및 텍스트 설정
  const getResultUI = () => {
    switch (result) {
      case "success":
        return { color: theme.purple, title: "🎉 강화 성공!" };
      case "broken":
        return { color: theme.red_text || "#FF5252", title: "💨 택시 손상..." };
      case "burst":
        return { color: theme.red_text || "#FF5252", title: "💥 강화 대실패!" };
      default:
        return { color: theme.gray_text, title: "😭 강화 실패" };
    }
  };

  const { color, title } = getResultUI();

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    color: color,
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
      <div css={styleTitle}>{title}</div>

      {/* 2. 택시 이미지 영역 */}
      <div
        style={{
          width: "100%",
          height: "160px",
          backgroundColor: theme.gray_background || "#f5f5f5",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
          marginBottom: "16px",
        }}
      >
        <img
          src="/assets/images/taxi-placeholder.png"
          alt="Taxi Result"
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            objectFit: "contain",
            // [수정] broken(하락)이거나 burst(파괴)일 때 흑백 처리
            filter:
              result === "broken" || result === "burst"
                ? "grayscale(100%)"
                : "none",
          }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      </div>

      {/* 3. 결과 텍스트 */}
      <div css={styleText}>
        {result === "success" && (
          <>
            축하합니다! <br />
            택시가 <b>+{newLevel}강</b>으로 강화되었습니다.
          </>
        )}
        {result === "fail" && (
          <>
            아쉽네요... <br />
            강화에 실패하여 재화만 소모되었습니다. <br />
            (현재 +{newLevel}강 유지)
          </>
        )}
        {result === "broken" && (
          <>
            강화 실패로 충격을 받아 택시가 손상되었습니다... <br />
            <b>
              +{oldLevel}강 ➔ +{newLevel}강
            </b>
            으로 하락했습니다.
          </>
        )}
        {/* [추가] Burst (파괴/초기화) 문구 */}
        {result === "burst" && (
          <>
            강화 에너지를 견디지 못하고 <br />
            택시가 <b>파괴</b>되었습니다... 😱 <br />
            <br />
            <b>+{oldLevel}강 ➔ 0강 (초기화)</b>
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
