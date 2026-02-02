import { useEffect, useState } from "react";

// [Import] Recoil Hook
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import WhiteContainer from "@/components/WhiteContainer";

// 만약 useValueGameInfo가 별도로 정의된 훅이라면 아래 주석을 풀고 사용하세요.
// import { useValueGameInfo } from "@/hooks/useFetchRecoilState/useFetchGameInfo";
import theme from "@/tools/theme";

import shieldDamage from "@/static/assets/games/shield_damage.png";
import shieldDestruction from "@/static/assets/games/shield_destruction.png";

// [Type Definition] 제공해주신 타입 정의
type GameInfoType = {
  level: number;
  creditAmount: number;
  preventFail: number; // 실패 방지권 개수
  preventBurst: number; // 파괴 방지권 개수
} | null;

interface ItemUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUse: (itemKey: string) => void; // itemName -> itemKey (식별자)로 변경
}

// 아이템 메타 데이터 (표시용 이름, 설명 등)
const ITEM_META = {
  preventFail: {
    name: "파손 방지권",
    desc: "강화 실패 시 등급 하락 방지",
  },
  preventBurst: {
    name: "파괴 방지권",
    desc: "강화 실패 시 택시 파괴 방지",
  },
};

const ItemUseModal = ({ isOpen, onClose, onUse }: ItemUseModalProps) => {
  // [Recoil] 게임 정보 가져오기
  const gameInfo = useValueRecoilState("gameInfo") as GameInfoType;

  // 선택된 아이템의 Key (preventFail | preventBurst)
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);

  // 현재 보유한 아이템 리스트로 변환
  const items = [
    {
      key: "preventFail",
      name: ITEM_META.preventFail.name,
      count: gameInfo?.preventFail || 0,
    },
    {
      key: "preventBurst",
      name: ITEM_META.preventBurst.name,
      count: gameInfo?.preventBurst || 0,
    },
  ];

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

  // 카드 스타일 함수
  const itemCardStyle = (isSelected: boolean, count: number) => ({
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "12px",
    borderRadius: "8px",
    // 선택됨: 보라색 배경, 없음: 회색 배경, 기본: 흰색
    backgroundColor: isSelected
      ? "#F3E5F5"
      : count === 0
        ? "#f5f5f5"
        : "#FAFAFA",
    border: isSelected ? `1px solid ${theme.purple}` : "1px solid #E0E0E0",
    cursor: count > 0 ? "pointer" : "default", // 개수 없으면 클릭 불가
    opacity: count > 0 ? 1 : 0.5, // 개수 없으면 흐리게
    transition: "all 0.1s",
  });

  const handleUseItem = () => {
    if (!selectedItemKey) return;

    // 1. 부모에게 사용 알림 (선택된 키 전달)
    onUse(selectedItemKey);
    // 2. 모달 닫기
    onClose();
    // 3. 선택 초기화
    setSelectedItemKey(null);
  };

  useEffect(() => {
    if (!isOpen) setSelectedItemKey(null);
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
          {items.map((item) => (
            <div
              key={item.key}
              style={itemCardStyle(selectedItemKey === item.key, item.count)}
              onClick={() => {
                // 개수가 0개면 선택 불가
                if (item.count === 0) return;

                // 클릭 토글 로직
                setSelectedItemKey((prev) =>
                  prev === item.key ? null : item.key
                );
              }}
            >
              {/* 아이콘 영역 (이미지가 있다면 img 태그로 교체) */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor:
                    item.key === "preventFail" ? "#E3F2FD" : "#FFEBEE", // 아이템별 색상 구분 예시
                  borderRadius: "50%",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                <img
                  src={
                    item.key === "preventFail"
                      ? shieldDamage
                      : shieldDestruction
                  }
                  alt={item.name}
                  style={{
                    width: "32px",
                    height: "32px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div style={{ ...theme.font14_bold, marginBottom: "4px" }}>
                {item.name}
              </div>
              <div style={{ ...theme.font12, color: theme.gray_text }}>
                보유: {item.count}개
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
          disabled={selectedItemKey === null}
          css={{
            flex: 1,
            padding: "12px 0",
            borderRadius: "8px",
            ...theme.font14_bold,
            opacity: selectedItemKey === null ? 0.5 : 1,
          }}
        >
          사용하기
        </Button>
      </div>
    </Modal>
  );
};

export default ItemUseModal;
