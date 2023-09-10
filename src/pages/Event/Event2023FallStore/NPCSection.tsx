import { useEffect, useState } from "react";

import AdaptiveDiv from "components/AdaptiveDiv";
import CreditAmountStatusContainer from "components/Event/CreditAmountStatusContainer";
import RabbitAnimatedBackground from "components/Event/RabbitAnimatedBackground";

import { randomEvent2023FallStoreSpeechGenerator } from "tools/random";
import theme from "tools/theme";

import { ReactComponent as TextBubble } from "static/events/2023fallStoreTextBubble.svg";

const NPCSection = () => {
  const getBodyWidth = () => {
    const innerWidth = window.innerWidth || 0;
    return Math.min(theme.adaptivediv.center_device_max_width, innerWidth);
  };
  const [width, setWidth] = useState<number>(getBodyWidth());
  const ratio = width / 800;
  const height = ratio * 600;
  // 참고 : RabbitAnimatedBackground 크기 =  800 * 600

  useEffect(() => {
    const resizeEvent = () => setWidth(getBodyWidth());
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  const [text, setText] = useState<string>("");

  const [currentText, setCurrentText] = useState<string>(
    randomEvent2023FallStoreSpeechGenerator()
  );

  useEffect(() => {
    if (text.length === currentText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(randomEvent2023FallStoreSpeechGenerator());
        setText("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setText(currentText.substring(0, text.length + 1));
    }, 100);
    return () => clearTimeout(timeout);
  }, [text, currentText]);

  return (
    <div
      css={{
        position: "relative",
        height: `${height}px`,
        display: "flex",
      }}
    >
      <div
        css={{
          width: `calc(50% - ${width / 2}px)`,
          background: "#1e3c72",
        }}
      />
      <div
        css={{
          width: `${width}px`,
          position: "relative",
          background: "linear-gradient(to right, #1e3c72, #2a5298)",
          overflow: "hidden",
        }}
      >
        <div
          css={{
            width: "800px",
            height: "600px",
            transform: `scale(${ratio})`,
            marginLeft: `${width / 2 - 400}px`,
            marginTop: `${height / 2 - 300}px`,
          }}
        >
          <RabbitAnimatedBackground />
          <div
            css={{
              fontSize: "26px",
              fontWeight: 700,
              lineHeight: "40px",
              position: "absolute",
              bottom: "320px",
              left: "220px",
              maxWidth: "530px",
              background: "white",
              zIndex: 2,
              padding: "30px 30px",
              borderRadius: "20px",
              boxSizing: "border-box",
              opacity: 0.9,
            }}
          >
            {text}
            <TextBubble
              css={{
                position: "absolute",
                bottom: "-20px",
                left: "0px",
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      </div>
      <div
        css={{
          width: `calc(50% - ${width / 2}px)`,
          background: "#2a5298",
        }}
      />
      <div
        css={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          left: 0,
          height: "20px",
          background: `linear-gradient(to top, ${theme.purple_background}, rgba(250, 246, 251, 0))`,
        }}
      />
      <div
        css={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          left: 0,
          height: "40px",
          background: `linear-gradient(to top, ${theme.purple_background}, rgba(250, 246, 251, 0))`,
        }}
      />
      <div
        css={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          left: 0,
          height: "60px",
          background: `linear-gradient(to top, ${theme.purple_background}, rgba(250, 246, 251, 0))`,
        }}
      />
      <div
        css={{
          position: "absolute",
          width: "100%",
          bottom: `min(5px, calc(${height - 70}px - var(--window-scroll-y)))`,
        }}
      >
        <AdaptiveDiv type="center">
          <CreditAmountStatusContainer />
        </AdaptiveDiv>
      </div>
    </div>
  );
};

export default NPCSection;
