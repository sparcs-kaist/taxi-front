import { memo, useCallback, useEffect, useRef, useState } from "react";

// Recoil Hooks
import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

// Components
import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
// Modals
import ItemUseResultModal from "@/components/ModalPopup/ModalGameItemResult";
import ItemUseModal from "@/components/ModalPopup/ModalGameItemUse";
import EnhanceResultModal, {
  EnhanceResultType,
} from "@/components/ModalPopup/ModalGameenforce";
import EnhanceConfirmModal from "@/components/ModalPopup/ModalGameenforceconfirm";
import WhiteContainer from "@/components/WhiteContainer";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

const GameMain = () => {
  // -----------------------------------------------------------------------
  // 1. 상태 관리 (State)
  // -----------------------------------------------------------------------
  const axios = useAxios();
  const [level, setLevel] = useState(0);
  const [amount, setAmount] = useState(0);
  const setAlert = useSetRecoilState(alertAtom);
  const minigameInfo = useValueRecoilState("gameInfo");
  const fetchMinigameInfo = useFetchRecoilState("gameInfo");
  const reinforceClick = useCallback(
    () =>
      axios({
        url: "/miniGame/miniGames/reinforcement",
        method: "post",
        data: {},
        onSuccess: () => {
          fetchMinigameInfo();
        },
        onError: () => setAlert("강화 시도를 실패하였습니다."),
      }),
    [axios, setAlert]
  );

  // 강화 관련 상태
  const [isEnhanceConfirmOpen, setIsEnhanceConfirmOpen] = useState(false);
  const [isEnhanceModalOpen, setIsEnhanceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩(망치질) 상태

  // 결과 판정용 상태
  const [enhanceResult, setEnhanceResult] = useState<EnhanceResultType>("fail");
  const [prevLevel, setPrevLevel] = useState(0); // 강화 시도 전 레벨 저장 (UI 표시용)
  const prevLevelRef = useRef(0); // 강화 시도 전 레벨 저장 (비교용)

  // 아이템 관련 모달 상태
  const [isItemInventoryOpen, setIsItemInventoryOpen] = useState(false);
  const [isItemResultOpen, setIsItemResultOpen] = useState(false);
  const [usedItemName, setUsedItemName] = useState("");

  // 강화 비용 (1000원으로 설정, 필요 시 변경)
  const ENHANCE_COST = 0;
  // -----------------------------------------------------------------------
  // 2. useEffect (데이터 동기화)
  // -----------------------------------------------------------------------

  // [동기화 & 결과 판정] Recoil 데이터가 변경되면 로컬 state 업데이트 및 결과 확인
  useEffect(() => {
    if (minigameInfo) {
      const newLevel = minigameInfo.level || 0;
      const newAmount = minigameInfo.creditAmount || 0;

      // 로딩 중이었다면(=강화 요청을 보낸 상태라면) 결과를 판정합니다.
      if (isLoading) {
        setIsLoading(false); // 로딩 종료

        // prevLevelRef를 사용하여 정확한 이전 레벨과 비교
        const savedPrevLevel = prevLevelRef.current;
        if (newLevel > savedPrevLevel) {
          setEnhanceResult("success");
        } else if (newLevel === savedPrevLevel) {
          setEnhanceResult("fail");
        } else {
          setEnhanceResult("broken"); // newLevel < savedPrevLevel
        }

        setIsEnhanceModalOpen(true); // 결과 모달 열기
      }

      // 상태 업데이트
      setLevel(newLevel);
      setAmount(newAmount);
    }
  }, [minigameInfo, isLoading]);

  // -----------------------------------------------------------------------
  // 3. 핸들러 함수 (Logic)
  // -----------------------------------------------------------------------

  // 실제 강화 실행 (확인 모달 -> '강화하기' 클릭 시)
  const handleEnhance = () => {
    // 1. 안전장치: 돈 부족 체크
    if (amount < ENHANCE_COST) {
      alert("돈이 부족합니다!");
      setIsEnhanceConfirmOpen(false);
      return;
    }

    // 2. 현재 레벨 저장 (결과 비교용)
    // useRef를 사용하여 즉시 저장 (상태 업데이트 타이밍 문제 방지)
    prevLevelRef.current = level;
    setPrevLevel(level); // UI 표시용으로도 저장

    // 3. UI 업데이트: 확인 모달 닫기 & 로딩 시작
    setIsEnhanceConfirmOpen(false);
    setIsLoading(true);

    // 4. API 호출 (결과는 Recoil Atom이 업데이트되면서 위 useEffect에서 처리됨)
    reinforceClick();
  };

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
          <div
            style={{
              ...theme.font16_bold,
              textAlign: "center",
              width: "100%",
            }}
          >
            현재 상태: +{level}강
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

      {/* 3. 강화 결과(Result) 모달 - 수정됨 */}
      <EnhanceResultModal
        isOpen={isEnhanceModalOpen}
        onClose={() => setIsEnhanceModalOpen(false)}
        result={enhanceResult} // success, fail, broken
        oldLevel={prevLevel}
        newLevel={level}
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
