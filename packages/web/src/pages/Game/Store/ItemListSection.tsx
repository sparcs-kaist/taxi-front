import { memo } from "react";

import { GameItem } from "@/types/game";

import Empty from "@/components/Empty";
import GameItemContainer from "@/components/Game/GameItemContainer";

type ItemListSectionProps = {
  items: GameItem[];
};

const ItemListSection = ({ items }: ItemListSectionProps) => {
  return items.length > 0 ? (
    <div
      css={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {items.map((item: GameItem) => (
        <GameItemContainer key={item._id} value={item} clickable />
      ))}
    </div>
  ) : (
    <Empty type="mobile">판매하고 있는 아이템이 없습니다.</Empty>
  );
};

export default memo(ItemListSection);
