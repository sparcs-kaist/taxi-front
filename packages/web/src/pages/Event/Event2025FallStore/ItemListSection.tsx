import { memo } from "react";

import type { EventItem } from "@/types/event2025fall";

import Empty from "@/components/Empty";
import EventOnlyItemContainer from "@/components/Event/EventOnlyItemContainer";

type ItemListSectionProps = {
  items: Array<EventItem>;
  fetchItems?: () => void;
};

const ItemListSection = ({ items, fetchItems }: ItemListSectionProps) => {
  return items.length > 0 ? (
    <div
      css={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {items.map((item: EventItem) => (
        <EventOnlyItemContainer
          key={item._id}
          value={item}
          fetchItems={fetchItems}
          clickable
        />
      ))}
    </div>
  ) : (
    <Empty type="mobile">판매하고 있는 아이템이 없습니다.</Empty>
  );
};

export default memo(ItemListSection);
