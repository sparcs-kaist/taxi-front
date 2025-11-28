import { memo, useCallback, useState } from "react";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import ItemUseResultModal from "@/components/ModalPopup/ModalGameItemResult";
import ItemUseModal from "@/components/ModalPopup/ModalGameItemUse";
import EnhanceResultModal from "@/components/ModalPopup/ModalGameenforce";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const GameMain = () => {
  // 1. 강화 관련 상태
  const [isEnhanceModalOpen, setIsEnhanceModalOpen] = useState(false);
  const [isEnhanceSuccess, setIsEnhanceSuccess] = useState(false);

  // 2. 아이템 인벤토리 모달 상태
  const [isItemInventoryOpen, setIsItemInventoryOpen] = useState(false);

  // 3. 아이템 사용 결과 모달 상태
  const [isItemResultOpen, setIsItemResultOpen] = useState(false);
  const [usedItemName, setUsedItemName] = useState("");

  // -----------------------------------------------------------------------
  // 핸들러 함수들
  // -----------------------------------------------------------------------

  // 강화하기 버튼 클릭
  const handleEnhance = useCallback(() => {
    // TODO: 실제 서버 통신 로직이 들어갈 곳
    // 현재는 50% 확률로 성공/실패 시뮬레이션
    const randomResult = Math.random() < 0.5;

    setIsEnhanceSuccess(randomResult);
    setIsEnhanceModalOpen(true);
  }, []);

  // 아이템 사용 완료 (ItemUseModal에서 호출됨)
  const handleItemUseComplete = (itemName: string) => {
    setUsedItemName(itemName);

    // 1. 인벤토리 모달 닫기
    setIsItemInventoryOpen(false);

    // 2. 결과 모달 열기 (자연스러운 전환을 위해 약간의 딜레이를 줄 수도 있음)
    // setTimeout(() => setIsItemResultOpen(true), 100);
    setIsItemResultOpen(true);
  };

  // -----------------------------------------------------------------------
  // 렌더링
  // -----------------------------------------------------------------------
  return (
    <>
      <AdaptiveDiv
        type="center"
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <WhiteContainer
          css={{
            marginTop: "16px",
            marginBottom: "32px",
            padding: "24px",
            width: "90%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          {/* 1. 타이틀 영역 */}
          <div
            style={{
              ...theme.font16_bold,
              textAlign: "center",
              width: "100%",
            }}
          >
            +3강: 완전 멋있는 택시
          </div>

          {/* 2. 택시 이미지 영역 */}
          <div
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: theme.gray_background || "#f5f5f5",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src="/assets/images/taxi-placeholder.png"
              alt="My Taxi"
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

          {/* 3. 액션 버튼 영역 (가로 배치) */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Button
              type="purple"
              onClick={handleEnhance}
              css={{
                flex: 1,
                padding: "12px 0",
                borderRadius: "8px",
                ...theme.font16_bold,
              }}
            >
              강화하기
            </Button>

            <Button
              type="white"
              onClick={() => setIsItemInventoryOpen(true)}
              css={{
                flex: 1,
                padding: "12px 0",
                borderRadius: "8px",
                ...theme.font16_bold,
              }}
            >
              아이템 사용
            </Button>
          </div>
        </WhiteContainer>
      </AdaptiveDiv>

      {/* ------------------------------------------------------------------
          모달 컴포넌트 렌더링 영역
      ------------------------------------------------------------------ */}

      {/* 1. 강화 결과 모달 */}
      <EnhanceResultModal
        isOpen={isEnhanceModalOpen}
        onClose={() => setIsEnhanceModalOpen(false)}
        isSuccess={isEnhanceSuccess}
      />

      {/* 2. 아이템 선택(인벤토리) 모달 */}
      <ItemUseModal
        isOpen={isItemInventoryOpen}
        onClose={() => setIsItemInventoryOpen(false)}
        onUse={handleItemUseComplete} // 사용 시 부모 핸들러 호출하여 스위칭
      />

      {/* 3. 아이템 사용 결과 모달 */}
      <ItemUseResultModal
        isOpen={isItemResultOpen}
        onClose={() => setIsItemResultOpen(false)}
        itemName={usedItemName}
      />
    </>
  );
};

export default memo(GameMain);
