import { useCallback, useState } from "react";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import BodyRandomBox from "components/Event/BodyRandomBox";
import Modal from "components/Modal";

import "./ModalEvent2023FallRandomBox.css";
import "./ModalEvent2023FallRandomBoxBackground.css";

import theme from "tools/theme";

import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";

const Background = () => (
  <div css={{ position: "absolute", top: "20%", left: 0, bottom: 0, right: 0 }}>
    <div className="c2023fallevent-before"></div>
    <div className="c2023fallevent-after"></div>
  </div>
);

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
