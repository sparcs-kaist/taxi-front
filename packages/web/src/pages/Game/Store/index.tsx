import { GameItem } from "@/types/game";

import AdaptiveDiv from "@/components/AdaptiveDiv";

import ItemListSection from "./ItemListSection";

import theme from "@/tools/theme";

import reinforce7 from "@/static/game/reinforce7.png";
import reinforce10 from "@/static/game/reinforce10.png";
import reinforce12 from "@/static/game/reinforce12.png";

const Store = () => {
  const items: GameItem[] = [
    {
      _id: "1",
      name: "파손 방지권",
      imageUrl: "",
      price: 5000,
      description: "강화 시 하락을 방지합니다.",
      itemType: "preventFail",
    },
    {
      _id: "2",
      name: "파괴 방지권",
      imageUrl: "",
      price: 7000,
      description: "강화 시 파괴를 방지합니다.",
      itemType: "preventBurst",
    },
    {
      _id: "3",
      name: "7레벨 워프권",
      imageUrl: reinforce7,
      price: 2500,
      description: "7레벨로 바로 이동합니다.",
      itemType: "makeLevel7",
    },
    {
      _id: "4",
      name: "10레벨 워프권",
      imageUrl: reinforce10,
      price: 5000,
      description: "10레벨로 바로 이동합니다.",
      itemType: "makeLevel10",
    },
    {
      _id: "5",
      name: "12레벨 워프권",
      imageUrl: reinforce12,
      price: 10000,
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
        <ItemListSection items={items} />
      </AdaptiveDiv>
    </>
  );
};

export default Store;
