import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Modal from "@/components/Modal";

import theme from "@/tools/theme";

import coinGif from "@/static/events/2024springCoin.gif";

// [추가] 강화 확률 데이터 정의
interface LevelUpProbInfoType {
  success: number;
  maintain: number;
  fail: number;
  burst?: number;
}

// 총 19단계 (0강 -> 1강 시도부터 18강 -> 19강 시도까지)
const levelUpProb: LevelUpProbInfoType[] = [
  { success: 100, maintain: 0, fail: 0, burst: 0 },
  { success: 100, maintain: 0, fail: 0, burst: 0 },
  { success: 95, maintain: 5, fail: 0, burst: 0 },
  { success: 90, maintain: 10, fail: 0, burst: 0 },
  { success: 85, maintain: 15, fail: 0, burst: 0 },
  { success: 80, maintain: 20, fail: 0, burst: 0 },
  { success: 70, maintain: 25, fail: 5, burst: 0 },
  { success: 65, maintain: 30, fail: 5, burst: 0 },
  { success: 55, maintain: 35, fail: 10, burst: 0 },
  { success: 50, maintain: 40, fail: 10, burst: 0 },
  { success: 40, maintain: 40, fail: 20, burst: 0 },
  { success: 35, maintain: 45, fail: 20, burst: 0 },
  { success: 30, maintain: 40, fail: 30, burst: 0 },
  { success: 25, maintain: 45, fail: 30, burst: 0 },
  { success: 15, maintain: 45, fail: 40, burst: 0 },
  { success: 10, maintain: 40, fail: 40, burst: 10 },
  { success: 8, maintain: 32, fail: 40, burst: 20 },
  { success: 5, maintain: 25, fail: 40, burst: 30 },
  { success: 3, maintain: 22, fail: 35, burst: 40 },
  { success: 2, maintain: 13, fail: 35, burst: 50 },
];

interface EnhanceConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cost: number;
  currentMoney: number;
  level: number;
  usedItems: string[]; // [추가] 사용된 아이템 목록
}

export const EnhanceConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  cost,
  currentMoney,
  level,
  usedItems,
}: EnhanceConfirmModalProps) => {
  const isNotEnoughMoney = currentMoney < cost;

  // [로직 수정] 확률 계산 함수
  const calculateProb = () => {
    // 1. 기본 확률 가져오기
    const safeIndex = Math.min(level, levelUpProb.length - 1);
    // 객체 깊은 복사를 통해 원본 데이터 보호
    const baseProb = { ...levelUpProb[safeIndex] };

    // 2. 아이템 효과 적용 (순서 중요: Burst -> Fail -> Maintain)

    // (1) 파괴 방지권 (preventBurst): Burst 확률을 Fail로 이동
    if (
      usedItems.includes("preventBurst") &&
      baseProb.burst &&
      baseProb.burst > 0
    ) {
      baseProb.fail += baseProb.burst;
      baseProb.burst = 0;
    }

    // (2) 파손(하락) 방지권 (preventFail): Fail 확률을 Maintain으로 이동
    if (usedItems.includes("preventFail") && baseProb.fail > 0) {
      baseProb.maintain += baseProb.fail;
      baseProb.fail = 0;
    }

    return baseProb;
  };

  const currentProb = calculateProb();

  const styleTitle = {
    ...theme.font18,
    textAlign: "center" as const,
    fontWeight: "bold",
    marginBottom: "16px",
    color: theme.black,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const styleCostContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#F9F9F9",
    borderRadius: "8px",
    marginBottom: "7px",
    border: `1px solid #eee`,
  };

  const styleLabel = {
    ...theme.font14,
    color: theme.gray_text,
  };

  const styleCostValue = {
    ...theme.font16,
    fontWeight: "bold",
    color: "#FF5252",
  };

  const styleMoneyValue = {
    ...theme.font16,
    fontWeight: "bold",
    color: theme.purple,
  };

  const styleButtonGroup = {
    display: "flex",
    gap: "10px",
    marginTop: "16px",
  };

  // 확률 표시용 스타일
  const styleProbContainer = {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    border: `1px solid ${theme.purple}`,
    borderRadius: "8px",
    padding: "12px 0",
    marginBottom: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  };

  const styleProbItem = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "4px",
    flex: 1,
  };

  const styleProbLabel = {
    fontSize: "12px",
    color: theme.gray_text,
    marginBottom: "2px",
  };

  const styleProbValue = (color: string) => ({
    fontSize: "16px",
    fontWeight: "bold" as const,
    color: color,
  });

  const VerticalDivider = () => (
    <div style={{ width: "1px", height: "30px", backgroundColor: "#eee" }} />
  );

  return (
    <Modal
      padding="24px 20px 20px"
      z-Index={10000}
      isOpen={isOpen}
      onChangeIsOpen={(open) => {
        if (!open) onClose();
      }}
    >
      {/* 타이틀 + 망치 아이콘 */}
      <div css={styleTitle}>
        <span style={{ fontSize: "24px" }}>🔨</span>
        <span>강화 하시겠습니까?</span>
      </div>

      {/* 확률 표시 영역 */}
      <div css={styleProbContainer}>
        {/* 성공 */}
        <div css={styleProbItem}>
          <span css={styleProbLabel}>성공</span>
          <span css={styleProbValue(theme.purple)}>{currentProb.success}%</span>
        </div>

        {/* 유지 */}
        {currentProb.maintain > 0 && (
          <>
            <VerticalDivider />
            <div css={styleProbItem}>
              <span css={styleProbLabel}>유지</span>
              <span css={styleProbValue(theme.gray_text)}>
                {currentProb.maintain}%
              </span>
            </div>
          </>
        )}

        {/* 하락 */}
        {currentProb.fail > 0 && (
          <>
            <VerticalDivider />
            <div css={styleProbItem}>
              <span css={styleProbLabel}>파손</span>
              <span css={styleProbValue("#FF9800")}>{currentProb.fail}%</span>
            </div>
          </>
        )}

        {/* 파괴 */}
        {currentProb.burst && currentProb.burst > 0 ? (
          <>
            <VerticalDivider />
            <div css={styleProbItem}>
              <span css={styleProbLabel}>파괴</span>
              <span css={styleProbValue("#FF5252")}>{currentProb.burst}%</span>
            </div>
          </>
        ) : null}
      </div>

      {/* 현재 비용 영역 */}
      <div css={styleCostContainer}>
        <span css={styleLabel}>현재 코인</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "4px 4px",
            borderRadius: "12px",
          }}
        >
          <img
            src={coinGif}
            alt="coin"
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
          <span css={styleMoneyValue}>{currentMoney.toLocaleString()} 원</span>
        </div>
      </div>

      {/* 비용 표시 영역 */}
      <div css={styleCostContainer}>
        <span css={styleLabel}>강화 비용</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "4px 4px",
            borderRadius: "12px",
          }}
        >
          <span css={styleCostValue}>-</span>
          <img
            src={coinGif}
            alt="coin"
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
          <span css={styleCostValue}>{cost.toLocaleString()} 원</span>
        </div>
      </div>

      <DottedLine direction="row" margin="0 2px" />

      {/* 나중 비용 표시 영역 */}
      <div css={{ ...styleCostContainer, marginTop: "7px" }}>
        <span css={styleLabel}>남는 비용</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "4px 4px",
            borderRadius: "12px",
          }}
        >
          <img
            src={coinGif}
            alt="coin"
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
          <span css={styleMoneyValue}>
            {(currentMoney - cost).toLocaleString()} 원
          </span>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div css={styleButtonGroup}>
        <Button
          type="gray"
          onClick={onClose}
          css={{
            flex: 1,
            padding: "12px 0",
            borderRadius: "8px",
            ...theme.font16_bold,
          }}
        >
          취소
        </Button>
        <Button
          type="purple"
          onClick={onConfirm}
          disabled={isNotEnoughMoney}
          css={{
            flex: 1,
            padding: "12px 0",
            borderRadius: "8px",
            ...theme.font16_bold,
          }}
        >
          강화하기
        </Button>
      </div>
    </Modal>
  );
};

export default EnhanceConfirmModal;
