import { css, keyframes } from "@emotion/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import "./index.css";

import { ReactComponent as BackPlane } from "static/events/2023fallRandomboxBack.svg";
import { ReactComponent as FrontPlane } from "static/events/2023fallRandomboxFront.svg";
import { ReactComponent as FrontPlaneLight } from "static/events/2023fallRandomboxFrontLight.svg";
import { ReactComponent as LeftPlane } from "static/events/2023fallRandomboxLeft.svg";
import { ReactComponent as RightPlane } from "static/events/2023fallRandomboxRight.svg";
import { ReactComponent as RightPlaneLight } from "static/events/2023fallRandomboxRightLight.svg";
import { ReactComponent as TopPlane } from "static/events/2023fallRandomboxTop.svg";

type BodyRandomBoxProps = {
  isBoxOpend: boolean;
  onClickBox?: () => void;
  itemImageUrl?: string;
};

const BodyRandomBox = ({
  isBoxOpend,
  onClickBox,
  itemImageUrl,
}: BodyRandomBoxProps) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const getBodyWidth = useCallback(() => bodyRef.current?.clientWidth || 0, []);
  const [bodyWidth, setBodyWidth] = useState<number>(getBodyWidth());
  const boxSize = bodyWidth * 0.6;

  useEffect(() => {
    const resizeEvent = () => setBodyWidth(getBodyWidth());
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  const stylePlane = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };
  const stylePlaneLRInversion = {
    transform: "scaleX(-1)",
  };
  const stylePlaneFlash = css`
    animation: ${keyframes`
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
    `} 2s linear infinite;
  `;

  return (
    <div ref={bodyRef} css={{ height: `${boxSize * 1.3}px` }}>
      <div
        css={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          aspectRatio: 1,
          margin: `0 auto`,
          transform: `scale(${
            (boxSize / 500) * 0.8
          }) translateX(-160px) translateY(-70px)`,
        }}
      >
        <div
          className={[
            "c2023fallevent-randombox",
            ...(isBoxOpend ? ["c2023fallevent-randombox-open"] : []),
          ].join(" ")}
          onClick={onClickBox}
        >
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-front">
            <FrontPlane css={stylePlane} />
            <FrontPlaneLight css={[stylePlane, stylePlaneFlash]} />
          </div>
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-back">
            <BackPlane css={{ ...stylePlane, ...stylePlaneLRInversion }} />
          </div>
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-left">
            <LeftPlane css={{ ...stylePlane, ...stylePlaneLRInversion }} />
          </div>
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-right">
            <RightPlane css={stylePlane} />
            <RightPlaneLight css={[stylePlane, stylePlaneFlash]} />
          </div>
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-top">
            <TopPlane css={stylePlane} />
          </div>
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-bottom" />
          <div className="c2023fallevent-emoji">🎟</div>
        </div>
      </div>
    </div>
  );
};

export default memo(BodyRandomBox);
