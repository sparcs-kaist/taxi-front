import { useCallback, useState } from "react";

import Modal from "components/Modal";

import "./Modal2023FallEventRandomBox.css";

import theme from "tools/theme";

import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";

const BodyRandomBox = () => {
  const [isBoxOpend, setIsBoxOpend] = useState<boolean>(false);
  const onClick = useCallback(() => setIsBoxOpend(true), []);

  return (
    <div css={{ width: "100px", height: "100px" }}>
      <div
        className={[
          "c2023fallevent-randombox",
          ...(isBoxOpend ? ["c2023fallevent-randombox-open"] : []),
        ].join(" ")}
        onClick={onClick}
      >
        <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-front">
          <span>SPARCS</span>
          <span className="or-text">RANDOM</span>
          <span>BOX</span>
        </div>
        <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-back"></div>
        <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-left"></div>
        <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-right">
          🚕
        </div>
        <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-top"></div>
        <div className="c2023fallevent-randombox-side c2023fallevent-randombox-side-bottom"></div>
        <div className="emoji">🎟</div>
      </div>
    </div>
  );
};

type Modal2023FallEventRandomBoxProps = Parameters<typeof Modal>[0] & {};

const Modal2023FallEventRandomBox = ({
  ...modalProps
}: Modal2023FallEventRandomBoxProps) => {
  const onClickOk = () => {};

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

  return (
    <Modal padding="16px 12px 12px" onEnter={onClickOk} {...modalProps}>
      <div css={styleTitle}>
        <LocalAtmRoundedIcon style={styleIcon} />
        랜덤박스 열기
      </div>
      <BodyRandomBox />
    </Modal>
  );
};

export default Modal2023FallEventRandomBox;
