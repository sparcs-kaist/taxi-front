import { memo } from "react";

import useDateToken from "@/hooks/useDateToken";
import useQuery from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import Title from "@/components/Title";

import ItemListSection from "./ItemListSection";
import Leaderboard from "./Leaderboard";
import NPCSection from "./NPCSection";
import PublicNoticeContainer from "./PublicNoticeContainer";

import theme from "@/tools/theme";

type Event2025SpringStoreProps = {
  itemId?: string;
};

const Event2025SpringStore = ({ itemId }: Event2025SpringStoreProps) => {
  const [itemListToken, fetchItemList] = useDateToken();
  const { items } = useQuery.get("/events/2025spring/items", {}, [
    itemListToken,
  ])[1] || { items: [] };

  return itemId ? (
    <Leaderboard itemId={itemId} />
  ) : (
    <>
      <HeaderWithLeftNav
        value="store"
        options={[
          {
            value: "store",
            label: "응모권 교환소",
            to: "/event/2025spring-store",
          },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2025spring-history",
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
        <ItemListSection items={items} fetchItems={fetchItemList} />
      </AdaptiveDiv>
      <Footer type="event-2025spring" />
    </>
  );
};

export default memo(Event2025SpringStore);
