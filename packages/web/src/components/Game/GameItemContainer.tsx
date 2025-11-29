import { useState } from "react";

// [수정] 상대 경로로 변경
import { GameItem } from "@/types/game";

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
  const fetchGameInfo = useFetchRecoilState("gameInfo");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickHandler = () => {
    setIsOpen(true);
  };

  const handleModalChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      fetchGameInfo();
    }
  };

  // [추가] 아이템 타입에 따라 이모지 또는 이미지 렌더링
  const renderItemImage = () => {
    if (value.itemType === "preventFail") {
      return <div style={{ fontSize: "50px", lineHeight: 1 }}>🛡️</div>;
    }
    if (value.itemType === "preventBurst") {
      return <div style={{ fontSize: "50px", lineHeight: 1 }}>💥</div>;
    }
    return (
      <img
        css={{
          width: "100%",
          height: "100%",
          objectFit: "contain", // 비율 유지
        }}
        src={value.imageUrl}
        alt={value.name}
      />
    );
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
        alignItems: "center", // 중앙 정렬
        gap: "8px",
        ...theme.font14,
        ...theme.cursor(!clickable),
        height: "100%", // 높이 꽉 채우기
      }}
      onClick={clickable ? onClickHandler : undefined}
    >
      <div
        css={{
          width: "100%",
          borderRadius: "6px",
          aspectRatio: "1/1",
          position: "relative",
          overflow: "hidden",
          background: ["preventFail", "preventBurst"].includes(value.itemType)
            ? "#F5F5F5" // 이모지 배경: 회색
            : "transparent", // 이미지 배경: 투명
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderItemImage()}
      </div>

      <div
        css={{
          ...theme.font14_bold,
          textAlign: "center",
          wordBreak: "keep-all",
        }}
      >
        {value.name}
      </div>

      {showDescription && (
        <div
          css={{
            ...theme.font12,
            color: theme.gray_text,
            textAlign: "center",
            lineHeight: "1.4",
          }}
        >
          {value.description}
        </div>
      )}

      <div
        css={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
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
            fontWeight: "bold",
            color: theme.purple,
          }}
        >
          {value.price.toLocaleString()}
        </div>
      </div>

      <ModalGameItem
        itemInfo={value}
        isOpen={isOpen}
        onChangeIsOpen={handleModalChange}
      />
    </WhiteContainer>
  );
};

export default GameItemContainer;
