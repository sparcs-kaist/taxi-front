<<<<<<< HEAD
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
=======
import { memo, useState } from "react";

// useCallback 제거
import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
import ItemUseResultModal from "@/components/ModalPopup/ModalGameItemResult";
import ItemUseModal from "@/components/ModalPopup/ModalGameItemUse";
// [중요] 파일명과 경로가 정확한지 꼭 확인하세요!
import EnhanceResultModal from "@/components/ModalPopup/ModalGameenforce";
import EnhanceConfirmModal from "@/components/ModalPopup/ModalGameenforceconfirm";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const GameMain = () => {
<<<<<<< HEAD
  // -----------------------------------------------------------------------
  // 1. 상태 관리 (State)
  // -----------------------------------------------------------------------

  // 게임 데이터 (서버/Recoil 동기화용)
  const [level, setLevel] = useState(0);
  const [amount, setAmount] = useState(0);

  const minigameInfo = useValueRecoilState("gameInfo");
  const fetchMinigameInfo = useFetchRecoilState("gameInfo");

  // 강화 관련 모달 상태
=======
  // 1. 강화 관련 상태
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
  const [isEnhanceConfirmOpen, setIsEnhanceConfirmOpen] = useState(false);
  const [isEnhanceModalOpen, setIsEnhanceModalOpen] = useState(false);
  const [isEnhanceSuccess, setIsEnhanceSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩(망치질) 상태

<<<<<<< HEAD
  // 아이템 관련 모달 상태
=======
  const [isLoading, setIsLoading] = useState(false);
  // [수정] 테스트를 위해 초기 자금을 비용보다 많게 설정 (500원)
  const [currentMoney, setCurrentMoney] = useState(500);
  const [enhanceCost] = useState(100);

  // 2. 아이템 관련 상태
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
  const [isItemInventoryOpen, setIsItemInventoryOpen] = useState(false);
  const [isItemResultOpen, setIsItemResultOpen] = useState(false);
  const [usedItemName, setUsedItemName] = useState("");

  // 강화 비용 (고정값 혹은 변수)
  const ENHANCE_COST = 1000;

  // -----------------------------------------------------------------------
<<<<<<< HEAD
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
=======
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

>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
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
<<<<<<< HEAD
          {/* 타이틀 & 레벨 표시 */}
=======
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
          <div
            style={{
              ...theme.font16_bold,
              textAlign: "center",
              width: "100%",
            }}
          >
            현재 상태: +{level}강
          </div>

<<<<<<< HEAD
          {/* 택시 이미지 영역 */}
=======
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
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

<<<<<<< HEAD
          {/* 버튼 영역 */}
=======
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
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
<<<<<<< HEAD
              onClick={() => setIsEnhanceConfirmOpen(true)}
=======
              // [Check] 여기서 클릭 시 isEnhanceConfirmOpen이 true가 되는지 확인
              onClick={() => {
                console.log("강화 버튼 클릭됨");
                setIsEnhanceConfirmOpen(true);
              }}
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
          </div>
        </div>
      </Modal>

<<<<<<< HEAD
      {/* 3. 강화 결과(Result) 모달 */}
=======
      {/* 3. 강화 결과 모달 */}
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
      <EnhanceResultModal
        isOpen={isEnhanceModalOpen}
        onClose={() => setIsEnhanceModalOpen(false)}
        isSuccess={isEnhanceSuccess}
      />

<<<<<<< HEAD
      {/* 4. 아이템 인벤토리 모달 */}
=======
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
      <ItemUseModal
        isOpen={isItemInventoryOpen}
        onClose={() => setIsItemInventoryOpen(false)}
        onUse={handleItemUseComplete}
      />

<<<<<<< HEAD
      {/* 5. 아이템 사용 결과 모달 */}
=======
>>>>>>> 0b10c507622b0dbbe92ac6e6d1c530e2f3cf2372
      <ItemUseResultModal
        isOpen={isItemResultOpen}
        onClose={() => setIsItemResultOpen(false)}
        itemName={usedItemName}
      />
    </>
  );
};

export default memo(GameMain);
