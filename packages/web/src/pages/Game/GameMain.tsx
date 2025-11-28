import { memo, useState } from "react";

// useCallback 제거
import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import ItemUseResultModal from "@/components/ModalPopup/ModalGameItemResult";
import ItemUseModal from "@/components/ModalPopup/ModalGameItemUse";
// [중요] 파일명과 경로가 정확한지 꼭 확인하세요!
import EnhanceResultModal from "@/components/ModalPopup/ModalGameenforce";
import EnhanceConfirmModal from "@/components/ModalPopup/ModalGameenforceconfirm";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const GameMain = () => {
  // 1. 강화 관련 상태
  const [isEnhanceConfirmOpen, setIsEnhanceConfirmOpen] = useState(false);
  const [isEnhanceModalOpen, setIsEnhanceModalOpen] = useState(false);
  const [isEnhanceSuccess, setIsEnhanceSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // [수정] 테스트를 위해 초기 자금을 비용보다 많게 설정 (500원)
  const [currentMoney, setCurrentMoney] = useState(500);
  const [enhanceCost] = useState(100);

  // 2. 아이템 관련 상태
  const [isItemInventoryOpen, setIsItemInventoryOpen] = useState(false);
  const [isItemResultOpen, setIsItemResultOpen] = useState(false);
  const [usedItemName, setUsedItemName] = useState("");

  // -----------------------------------------------------------------------
  // 핸들러
  // -----------------------------------------------------------------------

  // 실제 강화 실행 (확인 모달에서 '강화하기' 누른 후 실행됨)
  const handleEnhance = () => {
    // 1. 안전장치
    if (currentMoney < enhanceCost) return;

    // 2. 확인 모달 닫기 & 돈 차감
    setIsEnhanceConfirmOpen(false);
    setCurrentMoney((prev) => prev - enhanceCost);

    // 3. 로딩 시작 (강화 연출 시작)
    setIsLoading(true);

    // 4. [핵심] 1.5초 딜레이 후 결과 판정
    setTimeout(() => {
      const isSuccess = Math.random() < 0.5;
      setIsEnhanceSuccess(isSuccess);

      // 로딩 끝내고 결과 모달 열기
      setIsLoading(false);
      setIsEnhanceModalOpen(true);
    }, 1000);
  };

  const handleItemUseComplete = (itemName: string) => {
    setUsedItemName(itemName);
    setIsItemInventoryOpen(false);
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
          <div
            style={{
              ...theme.font16_bold,
              textAlign: "center",
              width: "100%",
            }}
          >
            +3강: 완전 멋있는 택시
          </div>

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
              }}
            />
          </div>

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
              // [Check] 여기서 클릭 시 isEnhanceConfirmOpen이 true가 되는지 확인
              onClick={() => {
                console.log("강화 버튼 클릭됨");
                setIsEnhanceConfirmOpen(true);
              }}
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

      {/* 모달 컴포넌트들 
        Tip: 모달들이 AdaptiveDiv 바깥에 있는 것은 맞습니다.
      */}

      <EnhanceConfirmModal
        isOpen={isEnhanceConfirmOpen}
        onClose={() => setIsEnhanceConfirmOpen(false)}
        onConfirm={handleEnhance} // 여기서 바로 함수 호출
        cost={enhanceCost}
        currentMoney={currentMoney}
      />

      {/* [NEW] 2. 로딩 모달 (딜레이 동안 보여줄 화면) */}
      <Modal isOpen={isLoading} padding="40px 20px">
        <div style={{ textAlign: "center", color: theme.purple }}>
          {/* 여기에 '망치질하는 GIF'나 '스피너'를 넣으면 더 좋습니다 */}
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔨</div>
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>
            강화중입니다...
          </div>
        </div>
      </Modal>

      {/* 3. 강화 결과 모달 */}
      <EnhanceResultModal
        isOpen={isEnhanceModalOpen}
        onClose={() => setIsEnhanceModalOpen(false)}
        isSuccess={isEnhanceSuccess}
      />

      <ItemUseModal
        isOpen={isItemInventoryOpen}
        onClose={() => setIsItemInventoryOpen(false)}
        onUse={handleItemUseComplete}
      />

      <ItemUseResultModal
        isOpen={isItemResultOpen}
        onClose={() => setIsItemResultOpen(false)}
        itemName={usedItemName}
      />
    </>
  );
};

export default memo(GameMain);
