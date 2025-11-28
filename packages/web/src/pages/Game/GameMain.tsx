import { memo, useEffect, useState } from "react";

// Recoil Hooks
import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";

// Components
import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
// Modals
// 파일 경로와 이름이 실제 프로젝트와 일치하는지 확인해주세요.
import ItemUseResultModal from "@/components/ModalPopup/ModalGameItemResult";
import ItemUseModal from "@/components/ModalPopup/ModalGameItemUse";
import EnhanceResultModal from "@/components/ModalPopup/ModalGameenforce";
import EnhanceConfirmModal from "@/components/ModalPopup/ModalGameenforceconfirm";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const GameMain = () => {
  // -----------------------------------------------------------------------
  // 1. 상태 관리 (State)
  // -----------------------------------------------------------------------

  // 게임 데이터 (서버/Recoil 동기화용)
  const [level, setLevel] = useState(0);
  const [amount, setAmount] = useState(0);

  const minigameInfo = useValueRecoilState("gameInfo");
  const fetchMinigameInfo = useFetchRecoilState("gameInfo");

  // 강화 관련 모달 상태
  const [isEnhanceConfirmOpen, setIsEnhanceConfirmOpen] = useState(false);
  const [isEnhanceModalOpen, setIsEnhanceModalOpen] = useState(false);
  const [isEnhanceSuccess, setIsEnhanceSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩(망치질) 상태

  // 아이템 관련 모달 상태
  const [isItemInventoryOpen, setIsItemInventoryOpen] = useState(false);
  const [isItemResultOpen, setIsItemResultOpen] = useState(false);
  const [usedItemName, setUsedItemName] = useState("");

  // 강화 비용 (고정값 혹은 변수)
  const ENHANCE_COST = 1000;

  // -----------------------------------------------------------------------
  // 2. useEffect (데이터 동기화 & 429 에러 방지)
  // -----------------------------------------------------------------------

  // [수정 1] 컴포넌트 마운트 시 '딱 한 번'만 서버 데이터 요청
  useEffect(() => {
    fetchMinigameInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // [수정 2] Recoil 데이터가 변경되었을 때만 로컬 state 업데이트
  useEffect(() => {
    if (minigameInfo) {
      setLevel(minigameInfo.level || 0);
      setAmount(minigameInfo.creditAmount || 0);
    }
  }, []);

  // -----------------------------------------------------------------------
  // 3. 핸들러 함수 (Logic)
  // -----------------------------------------------------------------------

  // 실제 강화 실행 (확인 모달 -> '강화하기' 클릭 시)
  const handleEnhance = () => {
    // 1. 안전장치: 돈 부족 체크
    if (amount < ENHANCE_COST) {
      alert("돈이 부족합니다!"); // 혹은 별도 토스트 메시지
      setIsEnhanceConfirmOpen(false);
      return;
    }

    // 2. UI 업데이트: 확인 모달 닫기 & 돈 차감 (낙관적 업데이트)
    setIsEnhanceConfirmOpen(false);
    setAmount((prev) => prev - ENHANCE_COST);

    // 3. 로딩 시작 (망치질 연출)
    setIsLoading(true);

    // 4. 1초 딜레이 후 결과 판정
    setTimeout(() => {
      // 성공/실패 확률 계산 (50%)
      const isSuccess = Math.random() < 0.5;
      setIsEnhanceSuccess(isSuccess);

      // 성공했다면 레벨도 바로 올려주기 (UI 반응성 향상)
      if (isSuccess) {
        setLevel((prev) => prev + 1);
      }

      // 로딩 끝내고 결과 모달 열기
      setIsLoading(false);
      setIsEnhanceModalOpen(true);

      // (선택사항) 서버에 최신 데이터 저장/동기화 요청이 필요하다면 여기서 수행
      // updateServerData(...);
    }, 1000);
  };

  // 아이템 사용 완료 핸들러
  const handleItemUseComplete = (itemName: string) => {
    setUsedItemName(itemName);
    setIsItemInventoryOpen(false);
    setIsItemResultOpen(true);
  };

  // -----------------------------------------------------------------------
  // 4. 렌더링 (UI)
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
          {/* 타이틀 & 레벨 표시 */}
          <div
            style={{
              ...theme.font16_bold,
              textAlign: "center",
              width: "100%",
            }}
          >
            현재 상태: +{level}강
          </div>

          {/* 택시 이미지 영역 */}
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
              position: "relative",
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

          {/* 버튼 영역 */}
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
              onClick={() => setIsEnhanceConfirmOpen(true)}
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
          모달 컴포넌트 렌더링
      ------------------------------------------------------------------ */}

      {/* 1. 강화 확인(Confirm) 모달 */}
      <EnhanceConfirmModal
        isOpen={isEnhanceConfirmOpen}
        onClose={() => setIsEnhanceConfirmOpen(false)}
        onConfirm={handleEnhance}
        cost={ENHANCE_COST}
        currentMoney={amount}
      />

      {/* 2. 로딩(Loading) 모달 */}
      <Modal isOpen={isLoading} padding="40px 20px">
        <div style={{ textAlign: "center", color: theme.purple }}>
          <div
            style={{
              fontSize: "40px",
              marginBottom: "16px",
              animation: "bounce 1s infinite",
            }}
          >
            🔨
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: theme.black || "#333",
            }}
          >
            열심히 강화하는 중...
          </div>
        </div>
      </Modal>

      {/* 3. 강화 결과(Result) 모달 */}
      <EnhanceResultModal
        isOpen={isEnhanceModalOpen}
        onClose={() => setIsEnhanceModalOpen(false)}
        isSuccess={isEnhanceSuccess}
      />

      {/* 4. 아이템 인벤토리 모달 */}
      <ItemUseModal
        isOpen={isItemInventoryOpen}
        onClose={() => setIsItemInventoryOpen(false)}
        onUse={handleItemUseComplete}
      />

      {/* 5. 아이템 사용 결과 모달 */}
      <ItemUseResultModal
        isOpen={isItemResultOpen}
        onClose={() => setIsItemResultOpen(false)}
        itemName={usedItemName}
      />
    </>
  );
};

export default memo(GameMain);
