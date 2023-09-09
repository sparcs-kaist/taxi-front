import AdaptiveDiv from "components/AdaptiveDiv";
import CreditAmountStatusContainer from "components/Event/CreditAmountStatusContainer";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";

import NPCSection from "./NPCSection";

import theme from "tools/theme";

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
        <div css={{ marginTop: "-15px" }} />
        <Title isHeader>응모권</Title>
        <Title isHeader>아이템</Title>
        <div css={{ height: "3000px" }} />
      </AdaptiveDiv>
    </>
  );
};

export default Event2023FallStore;
