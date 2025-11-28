import { useState } from "react";

import { GameItem } from "@/types/game";

// [추가] Recoil 훅 임포트
import { useFetchRecoilState } from "@/hooks/useFetchRecoilState";

import ModalGameItem from "@/components/ModalPopup/ModalGameItem";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import coinGif from "@/static/events/2024springCoin.gif";

type GameItemComponentProps = {
  value: GameItem;
  clickable?: boolean;
  showDescription?: boolean;
};

const GameItemContainer = ({
  value,
  clickable,
  showDescription,
}: GameItemComponentProps) => {
  // [수정] 주석 해제 및 훅 사용
  const fetchGameInfo = useFetchRecoilState("gameInfo");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickHandler = () => {
    setIsOpen(true);
  };

  // [추가] 모달 상태 변경 핸들러
  const handleModalChange = (open: boolean) => {
    setIsOpen(open);

    // 모달이 닫힐 때(false) 데이터 새로고침 실행
    if (!open) {
      fetchGameInfo();
    }
  };

  return (
    <WhiteContainer
      css={{
        width: "calc(50% - 8px)",
        flexBasis: "calc(50% - 8px)",
        boxSizing: "border-box",
        minWidth: "100px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        gap: "8px",
        ...theme.font14,
        ...theme.cursor(!clickable),
      }}
      onClick={clickable ? onClickHandler : undefined}
    >
      <div
        css={{
          width: "100%",
          borderRadius: "6px",
          aspectRatio: "1/1",
          objectFit: "cover",
          position: "relative",
          overflow: "hidden",
          background: theme.purple_light,
        }}
      >
        <img
          css={{
            width: "100%",
            height: "100%",
          }}
          src={value.imageUrl}
          alt={value.name}
        />
      </div>
      <div
        css={{
          ...theme.font14_bold,
        }}
      >
        {value.name}
      </div>
      {showDescription && (
        <div
          css={{
            ...theme.font12,
          }}
        >
          {value.description}
        </div>
      )}
      <div
        css={{
          display: "flex",
          gap: "4px",
        }}
      >
        <img
          src={coinGif}
          alt="coin"
          style={{ width: "16px", height: "16px", objectFit: "contain" }}
        />
        <div
          css={{
            ...theme.font14,
          }}
        >
          {value.price}
        </div>
      </div>

      {/* [수정] onChangeIsOpen에 커스텀 핸들러 연결 */}
      <ModalGameItem
        itemInfo={value}
        isOpen={isOpen}
        onChangeIsOpen={handleModalChange}
      />
    </WhiteContainer>
  );
};

export default GameItemContainer;
