import { useState } from "react";
import { useHistory } from "react-router-dom";

import type { EventItem } from "@/types/event2024fall";

import { useFetchRecoilState } from "@/hooks/useFetchRecoilState";

import {
  ModalEvent2025SpringItem,
} from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as CreditIcon } from "@/static/events/2025springCredit.svg";

type GameItemComponentProps = {
  value: EventItem;
  fetchItems?: () => void;
  clickable?: boolean;
  showDescription?: boolean;
};

const GameItemContainer = ({
  value,
  fetchItems,
  clickable,
  showDescription,
}: GameItemComponentProps) => {
  const fetchGameInfo = useFetchRecoilState("gameInfo");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickHandler = () => {
    // TODO: onclick
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
        // background: isSoldOut ? theme.gray_background : theme.white,
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
        <CreditIcon css={{ width: "27px", height: "16px" }} />
        <div
          css={{
            ...theme.font14,
          }}
        >
          {value.price}
        </div>
      </div>
      <ModalEvent2025SpringItem
        itemInfo={value}
        fetchItems={fetchItems}
        isOpen={isOpen}
        onChangeIsOpen={setIsOpen}
      />
    </WhiteContainer>
  );
};

export default GameItemContainer;
