import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Modal from "@/components/Modal";

import theme from "@/tools/theme";

import coinGif from "@/static/events/2024springCoin.gif";

interface EnhanceConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // 실제 강화를 실행하는 함수
  cost: number; // 강화 비용
  currentMoney: number; // (선택사항) 현재 보유 금액 - 부족하면 버튼 비활성화 등의 처리에 사용 가능
}

export const EnhanceConfirmModal = (
  { isOpen, onClose, onConfirm, cost, currentMoney }: EnhanceConfirmModalProps
) => {
  const isNotEnoughMoney = currentMoney < cost; // 돈이 부족한지 체크

  const styleTitle = {
    ...theme.font18,
    textAlign: "center" as const,
    fontWeight: "bold",
    marginBottom: "20px",
    color: theme.black,
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
    color: "#FF5252", // 돈 부족하면 빨간색
  };

  const styleMoneyValue = {
    ...theme.font16,
    fontWeight: "bold",
    color: theme.purple, // 돈 부족하면 빨간색
  };

  const styleButtonGroup = {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  };

  return (
    <Modal
      padding="24px 20px 20px"
      z-Index={1500}
      isOpen={isOpen}
      onChangeIsOpen={(open) => {
        if (!open) onClose();
      }}
    >
      {/* 타이틀 */}
      <div css={styleTitle}>택시를 강화하시겠습니까?</div>

      {/* 현재 비용 영역 */}
      <div css={styleCostContainer}>
        <span css={styleLabel}>현재 재화</span>
        <div
          style={{
            display: "flex",
            alignItems: "center", // 이미지와 텍스트 높이 맞춤
            gap: "6px", // 이미지와 텍스트 사이 간격
            backgroundColor: "rgba(255, 255, 255, 0.5)", // (선택사항) 가독성을 위한 연한 배경
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
            alignItems: "center", // 이미지와 텍스트 높이 맞춤
            gap: "6px", // 이미지와 텍스트 사이 간격
            backgroundColor: "rgba(255, 255, 255, 0.5)", // (선택사항) 가독성을 위한 연한 배경
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
            alignItems: "center", // 이미지와 텍스트 높이 맞춤
            gap: "6px", // 이미지와 텍스트 사이 간격
            backgroundColor: "rgba(255, 255, 255, 0.5)", // (선택사항) 가독성을 위한 연한 배경
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

      {/* 버튼 그룹 (취소 / 강화) */}
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
          disabled={isNotEnoughMoney} // 돈 없으면 클릭 불가
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
