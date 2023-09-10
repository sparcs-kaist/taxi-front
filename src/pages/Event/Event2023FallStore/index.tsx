import { useCallback, useEffect, useMemo, useState } from "react";

import { useFetchRecoilState } from "hooks/useFetchRecoilState";
import useQuery from "hooks/useTaxiAPI";

import AdaptiveDiv from "components/AdaptiveDiv";
import type { EventItemProps } from "components/Event/EventItem";
import EventItem from "components/Event/EventItem";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import ModalEventItem from "components/ModalPopup/ModalEventItem";
import Title from "components/Title";

import NPCSection from "./NPCSection";

const EventItemList = ({
  itemList,
  setItemInfo,
  setIsOpenEventItem,
}: {
  itemList: EventItemProps[];
  setItemInfo: (item: EventItemProps) => void;
  setIsOpenEventItem: (isOpen: boolean) => void;
}) => {
  return (
    <div
      css={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {itemList?.map((item: EventItemProps) => (
        <EventItem
          key={item._id}
          value={item}
          onClick={() => {
            setItemInfo(item);
            setIsOpenEventItem(true);
          }}
        />
      ))}
    </div>
  );
};

const Event2023FallStore = () => {
  const [, itemList] = useQuery.get("/events/2023fall/items/list");
  const [itemInfo, setItemInfo] = useState<EventItemProps>();
  const [isOpenEventItem, setIsOpenEventItem] = useState<boolean>(false);
  const fetchEventInfo = useFetchRecoilState("event2023FallInfo");
  const getItemFilteredList = useCallback(
    (type) =>
      itemList?.items.filter((item: EventItemProps) => item.itemType === type),
    [itemList]
  );
  const itemZeroList = useMemo(
    () => getItemFilteredList(0),
    [getItemFilteredList]
  );
  const itemOneList = useMemo(
    () => getItemFilteredList(1),
    [getItemFilteredList]
  );

  useEffect(() => {
    fetchEventInfo();
  }, []);

  return (
    <>
      <HeaderWithLeftNav
        value="store"
        options={[
          { value: "store", label: "달토끼 상점", to: "/event/2023fall-store" },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2023fall-history",
          },
        ]}
      />
      <NPCSection />
      <div css={{ marginTop: "-15px" }} />
      <AdaptiveDiv type="center">
        <Title isHeader>응모권</Title>
        <EventItemList
          itemList={itemOneList}
          setItemInfo={setItemInfo}
          setIsOpenEventItem={setIsOpenEventItem}
        />

        <Title isHeader>아이템</Title>
        <EventItemList
          itemList={itemZeroList}
          setItemInfo={setItemInfo}
          setIsOpenEventItem={setIsOpenEventItem}
        />
      </AdaptiveDiv>
      {itemInfo && (
        <ModalEventItem
          itemInfo={itemInfo}
          isOpen={isOpenEventItem}
          onChangeIsOpen={setIsOpenEventItem}
        />
      )}
    </>
  );
};

export default Event2023FallStore;
