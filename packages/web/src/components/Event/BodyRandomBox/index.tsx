import { css, keyframes } from "@emotion/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import "./index.css";

import theme from "@/tools/theme";

import BackPlaneImage from "@/static/events/2023fallRandomboxBack.png";
import FrontPlaneImage from "@/static/events/2023fallRandomboxFront.png";
import FrontPlaneLightImage from "@/static/events/2023fallRandomboxFrontLight.png";
import { ReactComponent as TopPlane } from "@/static/events/2023fallRandomboxTop.svg";

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
  const stylePlaneFront = {
    position: "absolute" as const,
    top: "-32px",
    left: "-84px",
    width: "670px",
  };
  const stylePlaneBack = {
    position: "absolute" as const,
    top: "-120px",
    left: "-80px",
    width: "664px",
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
  const styleItem = {
    position: "absolute" as const,
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
  };

  return (
    <div ref={bodyRef} css={{ height: `${boxSize * 1.3}px` }}>
      <div
        css={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          aspectRatio: 1,
          margin: `0 auto`,
          ...theme.cursor(isBoxOpend),
          transform: `scale(${
            (boxSize / 500) * 0.8
          }) translateX(-160px) translateY(-70px)`,
        }}
        onClick={onClickBox}
      >
        <img src={BackPlaneImage} alt="" css={stylePlaneBack} />
        <div
          className={[
            "c2023fallevent-randombox",
            ...(isBoxOpend ? ["c2023fallevent-randombox-open"] : []),
          ].join(" ")}
        >
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-top">
            <TopPlane css={stylePlane} />
          </div>
          {isBoxOpend && (
            <div className="c2023fallevent-emoji">
              {itemImageUrl && (
                <img src={itemImageUrl} alt="item" css={styleItem} />
              )}
            </div>
          )}
        </div>
        <img src={FrontPlaneImage} alt="" css={stylePlaneFront} />
        <img
          src={FrontPlaneLightImage}
          alt=""
          css={[stylePlaneFront, stylePlaneFlash]}
        />
      </div>
    </div>
  );
};

export default memo(BodyRandomBox);
