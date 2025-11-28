import { GameItem } from "@/types/game";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import Title from "@/components/Title";

import ItemListSection from "./ItemListSection";

import theme from "@/tools/theme";

const Store = () => {
  const items: GameItem[] = [
    {
      _id: "1",
      name: "하락 방지권",
      imageUrl: "https://placehold.co/150",
      price: 500,
      description: "강화 시 하락을 방지합니다.",
      itemType: "preventFail",
    },
    {
      _id: "2",
      name: "파괴 방지권",
      imageUrl: "https://placehold.co/150",
      price: 700,
      description: "강화 시 파괴를 방지합니다.",
      itemType: "preventBurst",
    },
    {
      _id: "3",
      name: "7레벨 워프권",
      imageUrl: "https://placehold.co/150",
      price: 1500,
      description: "7레벨로 바로 이동합니다.",
      itemType: "makeLevel7",
    },
    {
      _id: "4",
      name: "10레벨 워프권",
      imageUrl: "https://placehold.co/150",
      price: 2500,
      description: "10레벨로 바로 이동합니다.",
      itemType: "makeLevel10",
    },
    {
      _id: "5",
      name: "12레벨 워프권",
      imageUrl: "https://placehold.co/150",
      price: 4000,
      description: "12레벨로 바로 이동합니다.",
      itemType: "makeLevel12",
    },
  ];

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
        <ItemListSection items={items} />
      </AdaptiveDiv>
      <Footer type="game" />
    </>
  );
};

export default Store;
