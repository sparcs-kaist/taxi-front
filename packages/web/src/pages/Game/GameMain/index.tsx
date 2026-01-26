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

import Ranking from "./ranking";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

import garage from "@/static/assets/games/garage.png";
import taxiBack from "@/static/assets/games/taxi_back.png";
// [Import] 레벨별 택시 이미지
import level0 from "@/static/assets/games/taxi_lv0.png";
import level1 from "@/static/assets/games/taxi_lv1.png";
import level2 from "@/static/assets/games/taxi_lv2.png";
import level3 from "@/static/assets/games/taxi_lv3.png";
import level4 from "@/static/assets/games/taxi_lv4.png";
import level5 from "@/static/assets/games/taxi_lv5.png";
import level6 from "@/static/assets/games/taxi_lv6.png";
import level7 from "@/static/assets/games/taxi_lv7.png";
import level8 from "@/static/assets/games/taxi_lv8.png";
import level9 from "@/static/assets/games/taxi_lv9.png";
import level10 from "@/static/assets/games/taxi_lv10.png";
import level11 from "@/static/assets/games/taxi_lv11.png";
import level12 from "@/static/assets/games/taxi_lv12.png";
import level13 from "@/static/assets/games/taxi_lv13.png";
import level14 from "@/static/assets/games/taxi_lv14.png";
import level15 from "@/static/assets/games/taxi_lv15.png";
import level16 from "@/static/assets/games/taxi_lv16.png";
import level17 from "@/static/assets/games/taxi_lv17.png";
import level18 from "@/static/assets/games/taxi_lv18.png";
import level19 from "@/static/assets/games/taxi_lv19.png";
import level20 from "@/static/assets/games/taxi_lv20.png";

// [함수] 레벨에 맞는 이미지 객체 반환
export const getTaxiImage = (level: number) => {
  if (level === 0) return level0;
  if (level === 1) return level1;
  if (level === 2) return level2;
  if (level === 3) return level3;
  if (level === 4) return level4;
  if (level === 5) return level5;
  if (level === 6) return level6;
  if (level === 7) return level7;
  if (level === 8) return level8;
  if (level === 9) return level9;
  if (level === 10) return level10;
  if (level === 11) return level11;
  if (level === 12) return level12;
  if (level === 13) return level13;
  if (level === 14) return level14;
  if (level === 15) return level15;
  if (level === 16) return level16;
  if (level === 17) return level17;
  if (level === 18) return level18;
  if (level === 19) return level19;
  if (level >= 20) return level20;
  return level0; // 기본값
};

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

  const [usedItems, setUsedItems] = useState<string[]>([]);

  const reinforceClick = useCallback(
    (requestBody: Record<string, boolean>) =>
      axios({
        url: "/miniGame/miniGames/reinforcement",
        method: "post",
        data: requestBody,
        onSuccess: () => {
          fetchMinigameInfo();
          setUsedItems([]); // 성공 시 아이템 소모
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

  const [enhanceResult, setEnhanceResult] = useState<EnhanceResultType>("fail");
  const [prevLevel, setPrevLevel] = useState(0);

  const [isItemInventoryOpen, setIsItemInventoryOpen] = useState(false);
  const [isItemResultOpen, setIsItemResultOpen] = useState(false);

  const [lastAddedItem, setLastAddedItem] = useState("");

  // -----------------------------------------------------------------------
  // 2. useEffect
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (minigameInfo) {
      const newLevel = minigameInfo.level || 0;
      const newAmount = minigameInfo.creditAmount || 0;

      if (isLoading) {
        // 3초 딜레이 후 결과 반영
        setTimeout(() => {
          if (newLevel > prevLevel) {
            setEnhanceResult("success");
          } else if (newLevel === prevLevel) {
            setEnhanceResult("fail");
          } else if (newLevel + 1 < prevLevel) {
            setEnhanceResult("burst");
          } else {
            setEnhanceResult("broken");
          }

          setLevel(newLevel);
          setAmount(newAmount);

          setIsLoading(false);
          setIsEnhanceModalOpen(true);
        }, 1500);
      } else {
        if (!isLoading && !isEnhanceModalOpen) {
          setLevel(newLevel);
          setAmount(newAmount);
        }
      }

      if (!isLoading) {
        setLevel(newLevel);
        setAmount(newAmount);
      }
    }
  }, [minigameInfo]);

  // -----------------------------------------------------------------------
  // 3. Logic
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

    const requestBody: Record<string, boolean> = {};

    if (usedItems.includes("preventFail")) {
      requestBody.fail = true;
    }
    if (usedItems.includes("preventBurst")) {
      requestBody.burst = true;
    }

    setTimeout(() => {
      reinforceClick(requestBody);
    }, 500);
  };

  const handleItemUseComplete = (itemKey: string) => {
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

  const handleRemoveItem = (itemToRemove: string) => {
    setUsedItems((prev) => prev.filter((item) => item !== itemToRemove));
  };

  // -----------------------------------------------------------------------
  // 4. UI
  // -----------------------------------------------------------------------
  return (
    <>
      <AdaptiveDiv
        type="center"
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
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
              height: "250px",
              backgroundImage: `url(${level === 0 ? garage : taxiBack})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
              position: "relative",
            }}
          >
            {level !== 0 && (
              <img
                src={getTaxiImage(level)}
                alt="My Taxi"
                style={{
                  maxWidth: level >= 1 && level <= 11 ? "45%" : "50%",
                  maxHeight: level >= 1 && level <= 11 ? "45%" : "50%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            )}
          </div>

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
                  onClick={() => handleRemoveItem(itemKey)}
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
        <Ranking refreshTrigger={level} />
      </AdaptiveDiv>

      <EnhanceConfirmModal
        isOpen={isEnhanceConfirmOpen}
        onClose={() => setIsEnhanceConfirmOpen(false)}
        onConfirm={handleEnhance}
        cost={level * 100}
        currentMoney={amount}
        level={level}
        usedItems={usedItems} // [추가] 사용된 아이템 전달
      />

      <Modal isOpen={isLoading} padding="40px 20px" z-Index={10000}>
        <style>
          {`
            @keyframes hammerSwing {
              0% { transform: rotate(-45deg); }
              15% { transform: rotate(0deg); }   /* 들어올림 */
              25% { transform: rotate(-45deg); } /* 타격 (Impact Point) */
              50% { transform: rotate(0deg); }   /* 복귀 */
              100% { transform: rotate(-45deg); }
            }
            @keyframes taxiShake {
              0%, 24% { transform: scale(1) translateX(0); }
              25% { transform: scale(0.95) translateY(2px); } 
              30% { transform: scale(1.05) translateX(-2px); } 
              35% { transform: scale(1) translateX(2px); }
              100% { transform: scale(1); }
            }
            @keyframes sparkEffect {
              0%, 24% { opacity: 0; transform: scale(0.5); }
              25% { opacity: 1; transform: scale(1.5); }
              45% { opacity: 0; transform: scale(2); }
              100% { opacity: 0; }
            }
          `}
        </style>

        <div
          style={{
            textAlign: "center",
            color: theme.purple,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "100px",
              marginBottom: "16px",
            }}
          >
            {/* 1. 타격 이펙트 */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "40%",
                fontSize: "40px",
                zIndex: 10,
                animation: "sparkEffect 0.8s infinite linear",
              }}
            >
              💥
            </div>

            {/* 2. 망치 */}
            <div
              style={{
                position: "absolute",
                top: "0px",
                right: "-5px",
                fontSize: "30px",
                zIndex: 5,
                transformOrigin: "bottom right",
                animation: "hammerSwing 0.8s infinite ease-in-out",
              }}
            >
              🔨
            </div>

            {/* 3. 택시 */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "20px",
                width: "80px",
                height: "60px",
                display: "flex",
                alignItems: "flex-end",
                animation: "taxiShake 0.8s infinite ease-in-out",
              }}
            >
              <img
                src={getTaxiImage(level)}
                alt="target"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              color: theme.black || "#333",
            }}
          >
            강화 시도 중...
          </div>
          <div
            style={{
              fontSize: "14px",
              color: theme.gray_text,
              marginTop: "4px",
            }}
          >
            제발 성공해라... 🙏
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
