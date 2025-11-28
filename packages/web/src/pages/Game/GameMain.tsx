import { memo, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import ItemUseResultModal from "@/components/ModalPopup/ModalGameItemResult";
import ItemUseModal from "@/components/ModalPopup/ModalGameItemUse";
import EnhanceResultModal from "@/components/ModalPopup/ModalGameenforce";
import WhiteContainer from "@/components/WhiteContainer";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useReinforcement, useGetMiniGameInfo } from "@/hooks/game/useMiniGame";
import { useFetchRecoilState } from "@/hooks/useFetchRecoilState";

import theme from "@/tools/theme";

const GameMain = () => {
  // 1. 강화 관련 상태
  const [isEnhanceModalOpen, setIsEnhanceModalOpen] = useState(false);
  const [isEnhanceSuccess, setIsEnhanceSuccess] = useState(false);
  const [newLevel, setNewLevel] = useState<number | null>(null);

  // 2. 아이템 인벤토리 모달 상태
  const [isItemInventoryOpen, setIsItemInventoryOpen] = useState(false);

  // 3. 아이템 사용 결과 모달 상태
  const [isItemResultOpen, setIsItemResultOpen] = useState(false);
  const [usedItemName, setUsedItemName] = useState("");

  // API hooks
  const reinforcement = useReinforcement();
  const getMiniGameInfo = useGetMiniGameInfo();
  const fetchGameInfo = useFetchRecoilState("gameInfo");
  const gameInfo = useValueRecoilState("gameInfo");
  const currentLevel = gameInfo?.level ?? 1;

  // Fetch miniGame info on mount
  useEffect(() => {
    getMiniGameInfo(
      (data) => {
        const miniGameStatus = data.miniGameStatus || data.newMiniGameStatus;
        if (miniGameStatus) {
          fetchGameInfo();
        }
      },
      (error) => {
        console.error("Failed to fetch miniGame info:", error);
      }
    );
  }, [getMiniGameInfo, fetchGameInfo]);

  // -----------------------------------------------------------------------
  // 핸들러 함수들
  // -----------------------------------------------------------------------

  // 강화하기 버튼 클릭
  const handleEnhance = useCallback(() => {
    reinforcement(
      (data) => {
        // Determine success based on level change
        const success = data.level > currentLevel;
        setIsEnhanceSuccess(success);
        setNewLevel(data.level);
        setIsEnhanceModalOpen(true);
        // Refresh game info to update credit amount and level
        fetchGameInfo();
        // Also refresh miniGame info to get updated creditAmount
        getMiniGameInfo(
          (data) => {
            const miniGameStatus = data.miniGameStatus || data.newMiniGameStatus;
            if (miniGameStatus) {
              // Update will be reflected in parent component
            }
          },
          () => {}
        );
      },
      (error: AxiosError | any) => {
        console.error("Reinforcement failed:", error);
        // Show error message to user
        if (error?.response?.data?.error) {
          alert(error.response.data.error);
        } else {
          alert("강화에 실패했습니다. 다시 시도해주세요.");
        }
      }
    );
  }, [reinforcement, currentLevel, fetchGameInfo, getMiniGameInfo]);

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
            +{currentLevel - 1}강: 완전 멋있는 택시
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
        onClose={() => {
          setIsEnhanceModalOpen(false);
          setNewLevel(null);
        }}
        isSuccess={isEnhanceSuccess}
        newLevel={newLevel}
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
