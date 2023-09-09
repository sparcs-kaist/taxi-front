import { useCallback, useEffect, useRef, useState } from "react";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import Modal from "components/Modal";

import "./Modal2023FallEventRandomBox.css";

import theme from "tools/theme";

import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";

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

  console.log(boxSize);
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
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-front" />
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-back" />
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-left" />
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-right">
            🚕
          </div>
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-top" />
          <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-bottom" />
          <div className="c2023fallevent-emoji">🎟</div>
        </div>
      </div>
    </div>
  );
};

type Modal2023FallEventRandomBoxProps = Parameters<typeof Modal>[0] & {};

const Modal2023FallEventRandomBox = ({
  ...modalProps
}: Modal2023FallEventRandomBoxProps) => {
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

export default Modal2023FallEventRandomBox;
