import { memo } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

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
      <Footer type="full" />
    </>
  );
};

export default memo(GameMain);
