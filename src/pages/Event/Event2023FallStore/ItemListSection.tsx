import { useState } from "react";

import type { EventItem } from "types/event2023fall";

import { ModalEvent2023FallItem } from "components/ModalPopup";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import { ReactComponent as CreditIcon } from "static/events/2023fallCredit.svg";

type EventItemComponentProps = {
  value: EventItem;
  fetchItems?: () => void;
};

const EventItemContainer = ({ value, fetchItems }: EventItemComponentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <WhiteContainer
      css={{
        width: "calc(50% - 8px)",
        flexBasis: "calc(50% - 8px)",
        boxSizing: "border-box",
        minWidth: "100px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        gap: "8px",
        ...theme.font14,
        ...theme.cursor(),
      }}
      onClick={() => setIsOpen(true)}
    >
      <img
        css={{
          width: "100%",
          borderRadius: "12px",
          aspectRatio: "1/1",
        }}
        src={value.imageUrl}
        alt={value.name}
      />
      <div css={theme.font14_bold}>{value.name}</div>
      <div
        css={{
          display: "flex",
          gap: "4px",
        }}
      >
        <CreditIcon style={{ width: "27px", height: "16px" }} />
        <div>{value.price}</div>
      </div>
      <ModalEvent2023FallItem
        itemInfo={value}
        fetchItems={fetchItems}
        isOpen={isOpen}
        onChangeIsOpen={setIsOpen}
      />
    </WhiteContainer>
  );
};

type ItemListSectionProps = {
  items: Array<EventItem>;
  fetchItems?: () => void;
};

const ItemListSection = ({ items, fetchItems }: ItemListSectionProps) => {
  return (
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
        />
      ))}
    </div>
  );
};

export default ItemListSection;
