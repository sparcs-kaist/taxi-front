// import { useState } from "react";
import { useHistory } from "react-router-dom";

import type { EventItem } from "@/types/event2024fall";

// import {
//   ModalEvent2024FallItem,
//   ModalEvent2024FallRandomBox,
// } from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

// ToDo : 2023fall 이미지
import { ReactComponent as CreditIcon } from "@/static/events/2023fallCredit.svg";

type EventItemComponentProps = {
  value: EventItem;
  fetchItems?: () => void;
  clickable?: boolean;
};

const EventItemContainer = ({
  value,
  fetchItems,
  clickable,
}: EventItemComponentProps) => {
  const history = useHistory();
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [rewardItem, setRewardItem] = useState<Nullable<EventItem>>(null);
  const onClickHandler = () => {
    if (value.itemType === 3) {
      // setIsOpen(true);
    } else {
      history.push(`/event/2024fall-store/item/${value._id}`);
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
          // color: isSoldOut ? theme.gray_text : theme.black,
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
            // color: isSoldOut ? theme.gray_text : theme.black,
          }}
        >
          {value.price}
        </div>
      </div>
      {/* <ModalEvent2024FallItem
        itemInfo={value}
        fetchItems={fetchItems}
        setRewardItem={setRewardItem}
        isOpen={isOpen}
        onChangeIsOpen={setIsOpen}
      />
      {value.itemType === 3 && (
        <ModalEvent2024FallRandomBox
          isOpen={!!rewardItem}
          onChangeIsOpen={() => setRewardItem(null)}
          item={rewardItem || undefined}
        />
      )} */}
    </WhiteContainer>
  );
};

export default EventItemContainer;
