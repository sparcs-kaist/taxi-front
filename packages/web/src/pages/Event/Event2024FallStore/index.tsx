import { memo, useCallback, useMemo } from "react";

import type { EventItem } from "@/types/event2024fall";

import useDateToken from "@/hooks/useDateToken";
import useQuery from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import Title from "@/components/Title";

import ItemListSection from "./ItemListSection";
import NPCSection from "./NPCSection";
import PublicNoticeContainer from "./PublicNoticeContainer";

import theme from "@/tools/theme";

const Event2024FallStore = () => {
  const [itemListToken, fetchItemList] = useDateToken();
  const { items } = useQuery.get("/events/2024fall/items", {}, [
    itemListToken,
  ])[1] || { items: [] };
  const getItemFilteredList = useCallback(
    (types: number[]) =>
      items.filter(
        (item: EventItem) => types.includes(item.itemType) && !item.isDisabled
      ),
    [items]
  );
  const [itemTypeZeros, _] = useMemo(
    () => [getItemFilteredList([0, 3]), getItemFilteredList([1, 2])],
    [getItemFilteredList]
  );

  return (
    <>
      <HeaderWithLeftNav
        value="store"
        options={[
          { value: "store", label: "뽑기장", to: "/event/2024fall-store" },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2024fall-history",
          },
        ]}
      />
      <NPCSection />
      <AdaptiveDiv type="center">
        <div
          css={{
            position: "sticky",
            top: "75px",
            marginTop: "-60px",
            zIndex: theme.zIndex_nav - 1,
          }}
        >
          <CreditAmountStatusContainer />
        </div>
        <PublicNoticeContainer />
        <div css={{ marginTop: "-15px" }} />
        <Title icon="shop" isHeader>
          경품 응모권
        </Title>
        <ItemListSection items={itemTypeZeros} fetchItems={fetchItemList} />
      </AdaptiveDiv>
      <Footer type="event-2024fall" />
    </>
  );
};
// ToDo : 2023fall 문구 및 footer

export default memo(Event2024FallStore);
