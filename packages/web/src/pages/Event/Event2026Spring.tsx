import { memo } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";

import theme from "@/tools/theme";

// SVG Export from Figma
import { ReactComponent as MainSVG } from "@/static/events/2026springMain.svg";

const Event2026Spring = () => {
  return (
    <>
      <HeaderWithBackButton>
        <div css={{ color: theme.purple, ...theme.font18 }}>이벤트 안내</div>
      </HeaderWithBackButton>

      {/* 
        The "headless" SVG from Figma. The header and button are now real components.
        We will render it so it takes the full width and seamlessly connects.
      */}
      <div
        css={{
          width: "100%",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme.purple_background,
          position: "relative",
        }}
      >
        <AdaptiveDiv
          type="center"
          css={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <MainSVG
            css={{
              width: "100%",
              height: "auto",
              display: "block",
              marginTop: "-40px",
            }}
          />

          <div
            css={{
              position: "absolute",
              bottom: "62%",
              left: "10.66%",
              right: "10.66%",
            }}
          >
            <Link
              to="/event/2026spring-missions"
              css={{ textDecoration: "none", display: "block" }}
            >
              <Button
                type="purple_inset"
                css={{
                  width: "100%",
                  padding: "16px 0",
                  borderRadius: "12px",
                  ...theme.font16_bold,
                }}
              >
                퀘스트 보러가기
              </Button>
            </Link>
          </div>

          <div
            css={{
              position: "absolute",
              bottom: "45.5%",
              left: "10.66%",
              right: "10.66%",
            }}
          >
            <Link
              to="/game/money"
              css={{ textDecoration: "none", display: "block" }}
            >
              <Button
                type="purple_inset"
                css={{
                  width: "100%",
                  padding: "16px 0",
                  borderRadius: "12px",
                  ...theme.font16_bold,
                }}
              >
                미니게임 하러가기
              </Button>
            </Link>
          </div>

          <div
            css={{
              position: "absolute",
              bottom: "30.1%",
              left: "10.66%",
              right: "10.66%",
            }}
          >
            <Link
              to="/game/main"
              css={{ textDecoration: "none", display: "block" }}
            >
              <Button
                type="purple_inset"
                css={{
                  width: "100%",
                  padding: "16px 0",
                  borderRadius: "12px",
                  ...theme.font16_bold,
                }}
              >
                강화 하러가기
              </Button>
            </Link>
          </div>
        </AdaptiveDiv>
      </div>

      <Footer type="event-2026spring" />
    </>
  );
};

export default memo(Event2026Spring);
