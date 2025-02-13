import { memo } from "react";

import type { EventItem } from "@/types/event2025spring";

import Empty from "@/components/Empty";
import EventItemContainer from "@/components/Event/EventItemContainer";

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
        <EventItemContainer
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
