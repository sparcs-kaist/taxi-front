import { memo } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import WhiteContainer from "@/components/WhiteContainer";
import Footer from "@/components/Footer";
import theme from "@/tools/theme";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import AdaptiveDiv from "@/components/AdaptiveDiv";

const Game = () => {
    return (
        <>
          <HeaderWithBackButton>
            <div css={{ color: theme.purple, ...theme.font18 }}>게임 메인 페이지</div>
          </HeaderWithBackButton>
          <AdaptiveDiv
        type="center"
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >TAXI</AdaptiveDiv>
          <Footer type="full" />
        </>
      );
    };

    export default memo(Game);