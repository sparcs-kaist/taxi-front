import { useCallback, useMemo } from "react";

import type { EventItem } from "types/event2023fall";

import useDateToken from "hooks/useDateToken";
import useQuery from "hooks/useTaxiAPI";

import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";

import ItemListSection from "./ItemListSection";
import NPCSection from "./NPCSection";

const Event2023FallStore = () => {
  const [itemListToken, fetchItemList] = useDateToken();
  const { items } = useQuery.get("/events/2023fall/items/list", {}, [
    itemListToken,
  ])[1] || { items: [] };
  const getItemFilteredList = useCallback(
    (type) => items.filter((item: EventItem) => item.itemType === type),
    [items]
  );
  const [itemTypeZeros, itemTypeOnes] = useMemo(
    () => [getItemFilteredList(0), getItemFilteredList(1)],
    [getItemFilteredList]
  );

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
        <ItemListSection items={itemTypeZeros} fetchItems={fetchItemList} />
        <Title isHeader>아이템</Title>
        <ItemListSection items={itemTypeOnes} fetchItems={fetchItemList} />
      </AdaptiveDiv>
    </>
  );
};

export default Event2023FallStore;
