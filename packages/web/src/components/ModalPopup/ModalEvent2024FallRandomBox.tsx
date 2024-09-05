import { memo, useCallback, useEffect, useState } from "react";

import type { EventItem } from "@/types/event2024fall";

import { useDelay, useDelayBoolean } from "@/hooks/useDelay";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import BodyRandomBox from "@/components/Event/BodyRandomBox";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import "./ModalEvent2024FallRandomBoxBackground.css";

import theme from "@/tools/theme";

import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";

const Background = () => (
  <div css={{ position: "absolute", top: "20%", left: 0, bottom: 0, right: 0 }}>
    <div className="c2024fallevent-before"></div>
    <div className="c2024fallevent-after"></div>
  </div>
);

type ModalEvent2024FallRandomBoxProps = {
  item?: EventItem;
} & Parameters<typeof Modal>[0];

const ModalEvent2024FallRandomBox = ({
  item,
  ...modalProps
}: ModalEvent2024FallRandomBoxProps) => {
  const [isBoxOpend, setIsBoxOpend] = useState<boolean>(false);
  const isDisplayRandomBox = !useDelayBoolean(!modalProps.isOpen, 500);
  const isDisplayItemName = useDelay<boolean>(isBoxOpend, !isBoxOpend, 6000);
  const onClickOk = useCallback(() => setIsBoxOpend(true), []);

  const onChangeIsOpen = useCallback(
    (isOpen: boolean) => {
      modalProps?.onChangeIsOpen?.(isOpen);
    },
    [item, modalProps]
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
        또는 <b>열기</b> 버튼을 눌러 상자 안 상품을 확인해세요!
      </div>
      <DottedLine />
      {isDisplayRandomBox ? (
        <BodyRandomBox
          itemImageUrl={item?.imageUrl}
          isBoxOpend={isBoxOpend}
          onClickBox={onClickOk}
        />
      ) : (
        <div css={{ textAlign: "center" }}>
          <Loading />
        </div>
      )}
      {isDisplayItemName && (
        <div css={styleText}>
          축하합니다! 랜덤박스에서{" "}
          <b>
            {'"'}
            {item?.name || ""}
            {'"'}
          </b>
          을(를) 획득하였습니다
        </div>
      )}
      <Button
        type="purple_inset"
        css={{
          padding: "10px 0 9px",
          borderRadius: "8px",
          ...theme.font14_bold,
        }}
        disabled={isDisplayItemName ? false : isBoxOpend}
        onClick={isDisplayItemName ? () => onChangeIsOpen(false) : onClickOk}
      >
        {isDisplayItemName ? "확인" : "박스 열기"}
      </Button>
    </Modal>
  );
};

export default memo(ModalEvent2024FallRandomBox);
