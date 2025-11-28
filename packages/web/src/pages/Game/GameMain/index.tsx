import { memo, useCallback, useEffect, useState } from "react";

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

  const [isLoading, setIsLoading] = useState(false);

  // [수정] 여러 아이템을 담기 위해 배열 상태로 변경
  const [usedItems, setUsedItems] = useState<string[]>([]);

  // [수정] API 호출 함수: 완성된 body 객체를 직접 받도록 변경
  const reinforceClick = useCallback(
    (requestBody: Record<string, boolean>) =>
      axios({
        url: "/miniGame/miniGames/reinforcement",
        method: "post",
        data: requestBody, // { fail: true, burst: true } 등이 들어옴
        onSuccess: () => {
          fetchMinigameInfo();
          setUsedItems([]); // 성공 시 장착된 아이템 모두 소모(초기화)
        },
        onError: () => {
          setAlert("강화 시도를 실패하였습니다.");
          setIsLoading(false);
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

  // 방금 추가한 아이템 이름 (결과 모달 표시용)
  const [lastAddedItem, setLastAddedItem] = useState("");

  // -----------------------------------------------------------------------
  // 2. useEffect (데이터 동기화 & 결과 판정)
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (minigameInfo) {
      const newLevel = minigameInfo.level || 0;
      const newAmount = minigameInfo.creditAmount || 0;

      if (isLoading) {
        setIsLoading(false);

        if (newLevel > prevLevel) {
          setEnhanceResult("success");
        } else if (newLevel === prevLevel) {
          setEnhanceResult("fail");
        } else if (newLevel + 1 < prevLevel) {
          setEnhanceResult("burst");
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
    setIsLoading(true);

    // [핵심 로직] 장착된 아이템 배열을 순회하며 Request Body 생성
    const requestBody: Record<string, boolean> = {};

    if (usedItems.includes("preventFail")) {
      requestBody.fail = true; // 파손 방지
    }
    if (usedItems.includes("preventBurst")) {
      requestBody.burst = true; // 파괴 방지
    }

    // 1초 딜레이 후 API 호출
    setTimeout(() => {
      reinforceClick(requestBody);
    }, 1000);
  };

  const handleItemUseComplete = (itemKey: string) => {
    // [수정] 이미 장착된 아이템인지 확인 후 추가 (중복 방지)
    setUsedItems((prev) => {
      if (prev.includes(itemKey)) return prev;
      return [...prev, itemKey];
    });

    setLastAddedItem(itemKey);
    setIsItemInventoryOpen(false);
    setIsItemResultOpen(true);
  };

  const getDisplayItemName = (key: string) => {
    if (key === "preventFail") return "파손 방지권";
    if (key === "preventBurst") return "파괴 방지권";
    return "";
  };

  // 아이템 취소 핸들러 (선택 사항 UI)
  const handleRemoveItem = (itemToRemove: string) => {
    setUsedItems((prev) => prev.filter((item) => item !== itemToRemove));
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

          {/* [수정] 아이템 장착 상태 표시 (배열 순회) */}
          {usedItems.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {usedItems.map((itemKey) => (
                <div
                  key={itemKey}
                  onClick={() => handleRemoveItem(itemKey)} // 클릭 시 장착 해제 기능
                  style={{
                    ...theme.font14,
                    color: theme.purple,
                    fontWeight: "bold",
                    backgroundColor: "#F3E5F5",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  ✨ {getDisplayItemName(itemKey)}
                  <span style={{ fontSize: "12px", opacity: 0.6 }}>✕</span>
                </div>
              ))}
            </div>
          )}

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

      {/* 모달 컴포넌트들 */}
      <EnhanceConfirmModal
        isOpen={isEnhanceConfirmOpen}
        onClose={() => setIsEnhanceConfirmOpen(false)}
        onConfirm={handleEnhance}
        cost={level * 100}
        currentMoney={amount}
      />

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
        itemName={getDisplayItemName(lastAddedItem)}
      />
    </>
  );
};

export default memo(GameMain);
