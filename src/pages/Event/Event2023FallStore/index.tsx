import AdaptiveDiv from "components/AdaptiveDiv";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";

import NPCSection from "./NPCSection";

const Event2023FallStore = () => {
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
        <Title isHeader>아이템</Title>
        <div css={{ height: "3000px" }} />
      </AdaptiveDiv>
    </>
  );
};

export default Event2023FallStore;
