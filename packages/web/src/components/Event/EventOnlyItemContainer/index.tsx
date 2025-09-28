import { useState } from "react";
import { useHistory } from "react-router-dom";

import type { EventItem } from "@/types/event2024fall";

import { ModalEvent2025FallItem } from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as TicketIcon } from "@/static/events/2023fallTicket2.svg";

type EventOnlyItemComponentProps = {
  value: EventItem;
  fetchItems?: () => void;
  clickable?: boolean;
  showDescription?: boolean;
};

const EventOnlyItemContainer = ({
  value,
  fetchItems,
  clickable,
  showDescription,
}: EventOnlyItemComponentProps) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickHandler = () => {
    history.push(`/event/2025fall-store/item/${value._id}`);
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
        <TicketIcon
          css={{ width: "27px", height: "27px", marginTop: "-6px" }}
        />
        <div
          css={{
            ...theme.font14,
          }}
        >
          {value.price}
        </div>
      </div>
      <ModalEvent2025FallItem
        itemInfo={value}
        fetchItems={fetchItems}
        isOpen={isOpen}
        onChangeIsOpen={setIsOpen}
      />
    </WhiteContainer>
  );
};

export default EventOnlyItemContainer;
