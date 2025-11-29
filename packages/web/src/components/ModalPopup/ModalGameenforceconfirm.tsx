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
  { success: 100, maintain: 0, fail: 0 }, // 0 -> 1 (Level 0일 때)
  { success: 95, maintain: 5, fail: 0 }, // 1 -> 2
  { success: 90, maintain: 10, fail: 0 }, // 2 -> 3
  { success: 85, maintain: 15, fail: 0 },
  { success: 75, maintain: 20, fail: 5 },
  { success: 70, maintain: 25, fail: 5 },
  { success: 60, maintain: 30, fail: 10 },
  { success: 50, maintain: 40, fail: 10 },
  { success: 45, maintain: 35, fail: 20 },
  { success: 35, maintain: 45, fail: 20 },
  { success: 30, maintain: 40, fail: 30 },
  { success: 25, maintain: 45, fail: 30 },
  { success: 15, maintain: 40, fail: 40 },
  { success: 15, maintain: 45, fail: 40 },
  { success: 10, maintain: 40, fail: 49, burst: 1 },
  { success: 8, maintain: 41, fail: 49, burst: 2 },
  { success: 5, maintain: 39, fail: 53, burst: 3 },
  { success: 3, maintain: 40, fail: 53, burst: 4 },
  { success: 2, maintain: 36, fail: 57, burst: 5 }, // 18 -> 19
];

interface EnhanceConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cost: number;
  currentMoney: number;
  level: number; // 현재 레벨 (0부터 시작)
}

export const EnhanceConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  cost,
  currentMoney,
  level,
}: EnhanceConfirmModalProps) => {
  const isNotEnoughMoney = currentMoney < cost;

  // [로직 수정]
  // 0강일 때 levelUpProb[0]을 가져옵니다.
  // 배열 길이를 넘어가는 경우(만렙 등) 에러 방지를 위해 Math.min 사용
  const safeIndex = Math.min(level, levelUpProb.length - 1);
  const currentProb = levelUpProb[safeIndex];

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
    flex: 1, // 균등 분할
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
      z-Index={10000} // [수정] z-Index -> zIndex (네비게이션 위로 올라오도록)
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

      {/* [추가] 확률 표시 영역 */}
      <div css={styleProbContainer}>
        {/* 성공 */}
        <div css={styleProbItem}>
          <span css={styleProbLabel}>성공</span>
          <span css={styleProbValue(theme.purple)}>{currentProb.success}%</span>
        </div>

        {/* 유지 (확률 있을 때만 표시) */}
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

        {/* 하락 (확률 있을 때만 표시) */}
        {currentProb.fail > 0 && (
          <>
            <VerticalDivider />
            <div css={styleProbItem}>
              <span css={styleProbLabel}>하락</span>
              <span css={styleProbValue("#FF9800")}>{currentProb.fail}%</span>
            </div>
          </>
        )}

        {/* 파괴 (확률 있을 때만 표시 - 빨간색 경고) */}
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
        <span css={styleLabel}>현재 재화</span>
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
