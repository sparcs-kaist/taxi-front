import { memo, useCallback, useEffect, useState } from "react";

import type { RandomBoxResult } from "@/types/event2025spring";

import { useDelay, useDelayBoolean } from "@/hooks/useDelay";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import BodyRandomBox from "@/components/Event/BodyRandomBox";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import "./ModalEvent2024FallRandomBoxBackground.css";

import theme from "@/tools/theme";

import JackpotFailImage from "@/static/events/2024fallJackpotFail.png";
import JackpotSuccessImage from "@/static/events/2025springJackpotSuccess.svg";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";

const Background = () => (
  <div css={{ position: "absolute", top: "20%", left: 0, bottom: 0, right: 0 }}>
    <div className="c2024fallevent-before"></div>
    <div className="c2024fallevent-after"></div>
  </div>
);

type ModalEvent2025SpringRandomBoxProps = {
  randomBoxResult?: RandomBoxResult;
} & Parameters<typeof Modal>[0];

const ModalEvent2025SpringRandomBox = ({
  randomBoxResult,
  ...modalProps
}: ModalEvent2025SpringRandomBoxProps) => {
  const [isBoxOpend, setIsBoxOpend] = useState<boolean>(false);
  const isDisplayRandomBox = !useDelayBoolean(!modalProps.isOpen, 500);
  const isDisplayResult = useDelay<boolean>(isBoxOpend, !isBoxOpend, 6000);
  const onClickOk = useCallback(() => setIsBoxOpend(true), []);

  const onChangeIsOpen = useCallback(
    (isOpen: boolean) => {
      modalProps?.onChangeIsOpen?.(isOpen);
    },
    [randomBoxResult, modalProps]
  );

  useEffect(() => {
    if (!modalProps.isOpen) setIsBoxOpend(false);
  }, [modalProps.isOpen]);

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
      {...modalProps}
      css={{ padding: "16px 12px 12px", overflow: "hidden" }}
      backgroundChildren={isBoxOpend ? <Background /> : undefined}
      onEnter={onClickOk}
      onChangeIsOpen={onChangeIsOpen}
    >
      <div css={styleTitle}>
        <HelpCenterRoundedIcon style={styleIcon} />
        랜덤박스 열기
      </div>
      <div css={styleText}>
        <b css={{ color: theme.purple }}>랜덤박스를 획득했어요.</b> <b>상자</b>{" "}
        또는 <b>열기</b> 버튼을 눌러 상자 안 상품을 확인하세요!
      </div>
      <DottedLine />
      {isDisplayRandomBox ? (
        <BodyRandomBox
          itemImageUrl={
            randomBoxResult?.isJackpot ? JackpotSuccessImage : JackpotFailImage
          }
          isBoxOpend={isBoxOpend}
          onClickBox={onClickOk}
        />
      ) : (
        <div css={{ textAlign: "center" }}>
          <Loading />
        </div>
      )}
      {isDisplayResult && (
        <div css={styleText}>
          {randomBoxResult?.isJackpot ? (
            <>
              축하합니다!{" "}
              <b>
                {'"'}
                {randomBoxResult?.amount || ""}
                {'"'}
              </b>
              개를 베팅하여 대박을 터뜨렸습니다
            </>
          ) : (
            <>
              저런..!{" "}
              <b>
                {'"'}
                {randomBoxResult?.amount || ""}
                {'"'}
              </b>
              개를 베팅하였지만 쪽박을 찼습니다
            </>
          )}
        </div>
      )}
      <Button
        type="purple_inset"
        css={{
          padding: "10px 0 9px",
          borderRadius: "8px",
          ...theme.font14_bold,
        }}
        disabled={isDisplayResult ? false : isBoxOpend}
        onClick={isDisplayResult ? () => onChangeIsOpen(false) : onClickOk}
      >
        {isDisplayResult ? "확인" : "박스 열기"}
      </Button>
    </Modal>
  );
};

export default memo(ModalEvent2025SpringRandomBox);
