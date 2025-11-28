import { memo } from "react";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";

const GameMain = () => {
  return (
    <>
      <HeaderWithLeftNav
        value="main"
        options={[
          {
            value: "main",
            label: "메인",
            to: "/game/main",
          },
          {
            value: "store",
            label: "상점",
            to: "/game/store",
          },
          {
            value: "money",
            label: "돈 벌기",
            to: "/game/money",
          },
        ]}
      />
      <AdaptiveDiv
        type="center"
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        TAXI
      </AdaptiveDiv>
      <Footer type="game" />
    </>
  );
};

export default memo(GameMain);
