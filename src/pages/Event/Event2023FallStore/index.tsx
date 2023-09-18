import { memo, useCallback, useMemo } from "react";

import type { EventItem } from "types/event2023fall";

import useDateToken from "hooks/useDateToken";
import { useValueRecoilState } from "hooks/useFetchRecoilState";
import useQuery from "hooks/useTaxiAPI";

import AdaptiveDiv from "components/AdaptiveDiv";
import CreditAmountStatusContainer from "components/Event/CreditAmountStatusContainer";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";

import ItemListSection from "./ItemListSection";
import NPCSection from "./NPCSection";
import PublicNoticeContainer from "./PublicNoticeContainer";

import theme from "tools/theme";

const Event2023FallStore = () => {
  const [itemListToken, fetchItemList] = useDateToken();
  const { items } = useQuery.get("/events/2023fall/items/list", {}, [
    itemListToken,
  ])[1] || { items: [] };
  const getItemFilteredList = useCallback(
    (types) => items.filter((item: EventItem) => types.includes(item.itemType)),
    [items]
  );
  const [itemTypeZeros, itemTypeOnes] = useMemo(
    () => [getItemFilteredList([0]), getItemFilteredList([1, 2])],
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
          {
            value: "leaderboard",
            label: "리더보드",
            to: "/event/2023fall-leaderboard",
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
        <Title icon="ticket" isHeader>
          응모권
        </Title>
        <ItemListSection items={itemTypeOnes} fetchItems={fetchItemList} />
        <Title icon="shop" isHeader>
          아이템
        </Title>
        <ItemListSection items={itemTypeZeros} fetchItems={fetchItemList} />
      </AdaptiveDiv>
    </>
  );
};

export default memo(Event2023FallStore);
