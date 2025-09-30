import { useState } from "react";
import { useHistory } from "react-router-dom";

import type { EventItem, RandomBoxResult } from "@/types/event2024fall";

import { useFetchRecoilState } from "@/hooks/useFetchRecoilState";

import {
  ModalEvent2025SpringItem,
  ModalEvent2025SpringRandomBox,
} from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as CreditIcon } from "@/static/events/2025springCredit.svg";

type EventItemComponentProps = {
  value: EventItem;
  fetchItems?: () => void;
  clickable?: boolean;
  showDescription?: boolean;
};

const EventItemContainer = ({
  value,
  fetchItems,
  clickable,
  showDescription,
}: EventItemComponentProps) => {
  const fetchEvent2025SpringInfo = useFetchRecoilState("event2025SpringInfo");
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [randomBoxResult, setRandomBoxResult] =
    useState<Nullable<RandomBoxResult>>(null);
  const onClickHandler = () => {
    if (value.itemType !== 3) {
      history.push(`/event/2025spring-store/item/${value._id}`);
    } else {
      // setRewardItem(value);
      setIsOpen(true);
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
        setRandomboxResult={setRandomBoxResult}
        isOpen={isOpen}
        onChangeIsOpen={setIsOpen}
      />
      {value.itemType === 3 && (
        <ModalEvent2025SpringRandomBox
          isOpen={!!randomBoxResult}
          onChangeIsOpen={() => {
            setRandomBoxResult(null);
            fetchEvent2025SpringInfo();
          }}
          randomBoxResult={randomBoxResult || undefined}
        />
      )}
    </WhiteContainer>
  );
};

export default EventItemContainer;
