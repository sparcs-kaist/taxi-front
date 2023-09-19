import { css, keyframes } from "@emotion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import Modal from "components/Modal";

import "./ModalEvent2023FallRandomBox.css";
import "./ModalEvent2023FallRandomBoxBackground.css";

import theme from "tools/theme";

import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import { ReactComponent as BackPlane } from "static/events/2023fallRandomboxBack.svg";
import { ReactComponent as FrontPlane } from "static/events/2023fallRandomboxFront.svg";
import { ReactComponent as FrontPlaneLight } from "static/events/2023fallRandomboxFrontLight.svg";
import { ReactComponent as LeftPlane } from "static/events/2023fallRandomboxLeft.svg";
import { ReactComponent as RightPlane } from "static/events/2023fallRandomboxRight.svg";
import { ReactComponent as RightPlaneLight } from "static/events/2023fallRandomboxRightLight.svg";
import { ReactComponent as TopPlane } from "static/events/2023fallRandomboxTop.svg";

const Background = () => (
  <div css={{ position: "absolute", top: "20%", left: 0, bottom: 0, right: 0 }}>
    <div className="c2023fallevent-before"></div>
    <div className="c2023fallevent-after"></div>
  </div>
);

type BodyRandomBoxProps = {
  isBoxOpend: boolean;
  onClickBox?: () => void;
};

const BodyRandomBox = ({ isBoxOpend, onClickBox }: BodyRandomBoxProps) => {
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
          width: "1rem",
          aspectRatio: 1,
          margin: `${boxSize / 2 + 20}px auto 0`,
          transform: `scale(${(boxSize / 16) * 0.8})`,
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
            {/* <RightPlaneLight css={stylePlane} />
            <RightPlane css={[stylePlane, stylePlaneFlash]} /> */}
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

type ModalEvent2023FallRandomBoxProps = Parameters<typeof Modal>[0] & {};

const ModalEvent2023FallRandomBox = ({
  ...modalProps
}: ModalEvent2023FallRandomBoxProps) => {
  const [isBoxOpend, setIsBoxOpend] = useState<boolean>(false);
  const onClickOk = useCallback(() => setIsBoxOpend(true), []);

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };
  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };

  return (
    <Modal
      css={{ padding: "16px 12px 12px", overflow: "hidden" }}
      onEnter={onClickOk}
      backgroundChildren={isBoxOpend ? <Background /> : undefined}
      {...modalProps}
    >
      <div css={styleTitle}>
        <LocalAtmRoundedIcon style={styleIcon} />
        랜덤박스 열기
      </div>
      <div css={styleText}>
        랜덤박스를 획득했다. <b>상자</b> 또는 <b>열기</b> 버튼을 눌러 상자 안
        상품을 확인해보자.
      </div>
      <DottedLine />
      <BodyRandomBox isBoxOpend={isBoxOpend} onClickBox={onClickOk} />
      <Button
        type="purple_inset"
        css={{
          padding: "10px 0 9px",
          borderRadius: "8px",
          ...theme.font14_bold,
        }}
        disabled={isBoxOpend}
        onClick={onClickOk}
      >
        박스 열기
      </Button>
    </Modal>
  );
};

export default ModalEvent2023FallRandomBox;
