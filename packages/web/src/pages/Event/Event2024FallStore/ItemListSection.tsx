import { memo, useState } from "react";

import type { EventItem } from "@/types/event2024fall";

import Empty from "@/components/Empty";
import {
  ModalEvent2024FallItem,
  ModalEvent2024FallRandomBox,
} from "@/components/ModalPopup";
import { ModalEvent2024FallItemInstagram } from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

// ToDo : 2023fall 이미지
import { ReactComponent as CreditIcon } from "@/static/events/2023fallCredit.svg";
import { ReactComponent as SoldOutIcon } from "@/static/events/2023fallStoreSoldOut.svg";

type EventItemComponentProps = {
  value: EventItem;
  fetchItems?: () => void;
};

const EventItemContainer = ({ value, fetchItems }: EventItemComponentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rewardItem, setRewardItem] = useState<Nullable<EventItem>>(null);
  const [shareItem, setShareItem] = useState<Nullable<EventItem>>(null);
  const isSoldOut = value.stock <= 0;

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
        background: isSoldOut ? theme.gray_background : theme.white,
        ...theme.font14,
        ...theme.cursor(),
      }}
      onClick={() => setIsOpen(true)}
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
        {isSoldOut && (
          <div
            css={{
              background: theme.black_40,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>
      <div
        css={{
          ...theme.font14_bold,
          color: isSoldOut ? theme.gray_text : theme.black,
        }}
      >
        {value.name}
      </div>
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
            color: isSoldOut ? theme.gray_text : theme.black,
          }}
        >
          {value.price}
        </div>
      </div>
      {isSoldOut && (
        <SoldOutIcon
          css={{
            position: "absolute",
            right: "-10px",
            bottom: "-10px",
            width: "100px",
            height: "100px",
            opacity: 0.5,
          }}
        />
      )}
      <ModalEvent2024FallItem
        itemInfo={value}
        fetchItems={fetchItems}
        setRewardItem={setRewardItem}
        setShareItem={setShareItem}
        isOpen={isOpen}
        onChangeIsOpen={setIsOpen}
      />
      {value.itemType === 3 && (
        <ModalEvent2024FallRandomBox
          isOpen={!!rewardItem}
          onChangeIsOpen={() => setRewardItem(null)}
          item={rewardItem || undefined}
          setShareItem={setShareItem}
        />
      )}
      <ModalEvent2024FallItemInstagram
        isOpen={!!shareItem}
        onChangeIsOpen={() => setShareItem(null)}
        item={shareItem || undefined}
      />
    </WhiteContainer>
  );
};

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
        />
      ))}
    </div>
  ) : (
    <Empty type="mobile">판매하고 있는 아이템이 없습니다.</Empty>
  );
};

export default memo(ItemListSection);
