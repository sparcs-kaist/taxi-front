import { useCallback, useEffect, useMemo } from "react";

import type { EventItem } from "types/event2023fall";

import { useFetchRecoilState } from "hooks/useFetchRecoilState";
import useQuery from "hooks/useTaxiAPI";

import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";

import ItemListSection from "./ItemListSection";
import NPCSection from "./NPCSection";

const Event2023FallStore = () => {
  const [, itemList] = useQuery.get("/events/2023fall/items/list");
  const fetchEventInfo = useFetchRecoilState("event2023FallInfo");
  const getItemFilteredList = useCallback(
    (type) =>
      itemList?.items.filter((item: EventItem) => item.itemType === type),
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
        <ItemListSection itemList={itemOneList} />
        <Title isHeader>아이템</Title>
        <ItemListSection itemList={itemZeroList} />
      </AdaptiveDiv>
    </>
  );
};

export default Event2023FallStore;
