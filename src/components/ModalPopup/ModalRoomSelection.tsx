import { useEffect, useMemo, useRef, useState } from "react";

import Modal from "components/Modal";
import Navigation from "components/Navigation";

import BodyRoomSelection, {
  BodyRoomSelectionProps,
} from "./Body/BodyRoomSelection";
import { BodyRoomShare } from "./ModalRoomShare";

import theme from "tools/theme";

type HeightFixWrapperProps = {
  children: React.ReactNode;
  onChangeHeight?: (height: number) => void;
};
type ModalRoomSelectionProps = {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
  roomInfo: Nullable<BodyRoomSelectionProps["roomInfo"]>; // FIXME
};

const HeightFixWrapper = ({
  children,
  onChangeHeight,
}: HeightFixWrapperProps) => {
  const body = useRef<HTMLDivElement>(null);

  // resize observer
  useEffect(() => {
    if (!body.current) return;
    const observer = new ResizeObserver(() => {
      if (!body.current) return;
      if (onChangeHeight) onChangeHeight(body.current.offsetHeight);
      console.log(body.current.offsetHeight);
    });
    observer.observe(body.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div css={{ height: "0px", overflow: "hidden" }}>
      <div ref={body}>{children}</div>
    </div>
  );
};

const ModalRoomSelection = ({
  isOpen,
  onChangeIsOpen,
  roomInfo: _roomInfo,
}: ModalRoomSelectionProps) => {
  const [roomInfo, setRoomInfo] = useState(_roomInfo);
  const [bodyHeight, setBodyHeight] = useState(0);
  const pages = useMemo(
    () =>
      roomInfo && [
        {
          key: "info",
          name: "방 정보",
          body: <BodyRoomSelection roomInfo={roomInfo} />,
        },
        {
          key: "share",
          name: "공유하기",
          body: <BodyRoomShare roomInfo={roomInfo} height={bodyHeight} />,
        },
      ],
    [roomInfo, bodyHeight]
  );

  useEffect(() => {
    if (_roomInfo) setRoomInfo(_roomInfo);
  }, [_roomInfo]);

  const styleTitle = {
    ...theme.font18,
    padding: "10px 8px 12px",
  };

  return (
    <Modal isOpen={isOpen} onChangeIsOpen={onChangeIsOpen} padding="10px">
      {roomInfo && (
        <>
          <div css={styleTitle}>{roomInfo.name}</div>
          <Navigation pages={pages} />
          <HeightFixWrapper onChangeHeight={setBodyHeight}>
            <BodyRoomSelection roomInfo={roomInfo} />
          </HeightFixWrapper>
        </>
      )}
    </Modal>
  );
};

export default ModalRoomSelection;
