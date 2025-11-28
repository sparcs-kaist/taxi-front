import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

// 더미 데이터
const MOCK_ITEMS = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  name: `아이템 ${i + 1}`,
  count: Math.floor(Math.random() * 5) + 1,
  description: "택시 성능을 잠시 향상시킵니다.",
}));

interface ItemUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  // [New] 부모에게 사용 완료를 알리는 콜백 함수
  onUse: (itemName: string) => void;
}

const ItemUseModal = ({ isOpen, onClose, onUse }: ItemUseModalProps) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const styleTitle = {
    ...theme.font18,
    fontWeight: "bold",
    textAlign: "center" as const,
    marginBottom: "16px",
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    width: "100%",
    maxHeight: "300px",
    overflowY: "auto" as const,
    padding: "4px",
  };

  const itemCardStyle = (isSelected: boolean) => ({
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: isSelected ? "#F3E5F5" : "#FAFAFA",
    border: isSelected ? `1px solid ${theme.purple}` : "1px solid #E0E0E0",
    cursor: "pointer",
    transition: "all 0.1s",
  });

  const handleUseItem = () => {
    if (selectedItemId === null) return;

    const selectedItem = MOCK_ITEMS.find((item) => item.id === selectedItemId);
    if (selectedItem) {
      // 1. 부모에게 사용 알림
      onUse(selectedItem.name);
      // 2. 현재 모달 닫기
      onClose();
      // 3. 선택 상태 초기화
      setSelectedItemId(null);
    }
  };

  useEffect(() => {
    if (!isOpen) setSelectedItemId(null);
  }, [isOpen]);

  return (
    <Modal
      padding="24px 20px 20px"
      isOpen={isOpen}
      onChangeIsOpen={(open) => {
        if (!open) onClose();
      }}
    >
      <div css={styleTitle}>보유 아이템</div>

      <WhiteContainer
        css={{
          padding: "16px",
          marginBottom: "20px",
          backgroundColor: "#fff",
          boxShadow: "none",
          border: "1px solid #eee",
        }}
      >
        <div style={gridContainerStyle}>
          {MOCK_ITEMS.map((item) => (
            <div
              key={item.id}
              style={itemCardStyle(selectedItemId === item.id)}
              // [변경] 클릭 시: 현재 선택된 아이템과 같으면 null(취소), 아니면 해당 ID 선택
              onClick={() => {
                setSelectedItemId((prev) =>
                  prev === item.id ? null : item.id
                );
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#ddd",
                  borderRadius: "50%",
                  marginBottom: "8px",
                }}
              />
              <div style={{ ...theme.font14_bold, marginBottom: "4px" }}>
                {item.name}
              </div>
              <div style={{ ...theme.font12, color: theme.gray_text }}>
                x{item.count}
              </div>
            </div>
          ))}
        </div>
      </WhiteContainer>

      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          type="gray"
          onClick={onClose}
          css={{ flex: 1, padding: "12px 0", borderRadius: "8px" }}
        >
          닫기
        </Button>
        <Button
          type="purple"
          onClick={handleUseItem}
          disabled={selectedItemId === null}
          css={{
            flex: 1,
            padding: "12px 0",
            borderRadius: "8px",
            ...theme.font14_bold,
            opacity: selectedItemId === null ? 0.5 : 1,
          }}
        >
          사용하기
        </Button>
      </div>
    </Modal>
  );
};

export default ItemUseModal;
