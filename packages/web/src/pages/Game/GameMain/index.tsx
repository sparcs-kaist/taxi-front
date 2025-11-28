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

  // 강화 관련 상태 (순환 참조 방지를 위해 위로 올림)
  const [isLoading, setIsLoading] = useState(false);

  const reinforceClick = useCallback(
    () =>
      axios({
        url: "/miniGame/miniGames/reinforcement",
        method: "post",
        data: {},
        onSuccess: () => {
          fetchMinigameInfo();
        },
        onError: () => {
          setAlert("강화 시도를 실패하였습니다.");
          setIsLoading(false); // [수정] 에러 시에도 로딩 종료
        },
      }),
    [axios, fetchMinigameInfo, setAlert]
  );

  const [isEnhanceConfirmOpen, setIsEnhanceConfirmOpen] = useState(false);
  const [isEnhanceModalOpen, setIsEnhanceModalOpen] = useState(false);

  // 결과 판정용 상태
  const [enhanceResult, setEnhanceResult] = useState<EnhanceResultType>("fail");
  const [prevLevel, setPrevLevel] = useState(0);

  const [isItemInventoryOpen, setIsItemInventoryOpen] = useState(false);
  const [isItemResultOpen, setIsItemResultOpen] = useState(false);
  const [usedItemName, setUsedItemName] = useState("");

  // -----------------------------------------------------------------------
  // 2. useEffect (데이터 동기화 & 결과 판정)
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (minigameInfo) {
      const newLevel = minigameInfo.level || 0;
      const newAmount = minigameInfo.creditAmount || 0;

      // [핵심 수정] isLoading이 true일 때만 결과를 판정합니다.
      // 의존성 배열에서 isLoading을 뺐으므로, 이 코드는 '데이터가 변했을 때'만 실행됩니다.
      if (isLoading) {
        setIsLoading(false); // 로딩 종료

        if (newLevel > prevLevel) {
          setEnhanceResult("success");
        } else if (newLevel === prevLevel) {
          setEnhanceResult("fail");
        } else {
          setEnhanceResult("broken");
        }

        setIsEnhanceModalOpen(true);
      }

      setLevel(newLevel);
      setAmount(newAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minigameInfo]);
  // ▲ [중요] isLoading, prevLevel을 의존성에서 제거해야
  // "강화하기 버튼 클릭 -> 로딩 상태 변경 -> 바로 결과 모달 뜸(버그)" 현상을 막을 수 있습니다.

  // -----------------------------------------------------------------------
  // 3. 핸들러 함수 (Logic)
  // -----------------------------------------------------------------------

  const handleEnhance = () => {
    if (amount < level * 100) {
      alert("돈이 부족합니다!");
      setIsEnhanceConfirmOpen(false);
      return;
    }

    setPrevLevel(level);
    setIsEnhanceConfirmOpen(false);
    setIsLoading(true); // 망치질 시작

    // [1초 딜레이] 망치질 1초 보여주고 -> API 호출
    setTimeout(() => {
      reinforceClick();
    }, 1000);
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

      {/* 강화 확인 모달 */}
      <EnhanceConfirmModal
        isOpen={isEnhanceConfirmOpen}
        onClose={() => setIsEnhanceConfirmOpen(false)}
        onConfirm={handleEnhance}
        cost={level * 100}
        currentMoney={amount}
      />

      {/* 로딩(망치질) 모달 */}
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

      {/* 강화 결과 모달 */}
      <EnhanceResultModal
        isOpen={isEnhanceModalOpen}
        onClose={() => setIsEnhanceModalOpen(false)}
        result={enhanceResult}
        oldLevel={prevLevel}
        newLevel={level}
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
