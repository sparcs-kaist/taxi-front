import useDateToken from "@/hooks/useDateToken";
import useQuery from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import Title from "@/components/Title";

import ItemListSection from "./ItemListSection";

import theme from "@/tools/theme";

const Store = () => {
  const [itemListToken, fetchItemList] = useDateToken();
  const { items } = useQuery.get("/events/2025spring/items", {}, [
    itemListToken,
  ])[1] || { items: [] };

  return (
    <>
      <AdaptiveDiv type="center">
        <div
          css={{
            position: "sticky",
            top: "75px",
            marginTop: "-60px",
            zIndex: theme.zIndex_nav - 1,
          }}
        ></div>
        <div css={{ marginTop: "40px" }} />
        <Title icon="shop" isHeader>
          아이템 상점
        </Title>
        <ItemListSection items={items} fetchItems={fetchItemList} />
      </AdaptiveDiv>
      <Footer type="game" />
    </>
  );
};

export default Store;
