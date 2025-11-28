import { useEffect, useMemo, useRef, useState } from "react";

import useCarrier from "@/hooks/useCarrier";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import Modal from "@/components/Modal";
import Navigation from "@/components/Navigation";

// ✨ 방금 만든 훅!
import BodyRoomSelection, {
  BodyRoomSelectionProps,
} from "./Body/BodyRoomSelection";
import { BodyRoomShare } from "./ModalRoomShare";

import theme from "@/tools/theme";

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
  const { carrierList, fetchCarrierStatus, toggleCarrier } = useCarrier();
  const loginInfo = useValueRecoilState("loginInfo"); // 로그인된 내 정보

  useEffect(() => {
    if (_roomInfo?._id && isOpen) {
      fetchCarrierStatus(_roomInfo._id);
    }
  }, [_roomInfo, isOpen, fetchCarrierStatus]);

  useEffect(() => {
    if (_roomInfo) setRoomInfo(_roomInfo);
  }, [_roomInfo]);

  // 내 캐리어 상태 찾기
  const myCarrierStatus = useMemo(() => {
    return (
      carrierList.find((c) => c.userId === loginInfo?.oid)?.hasCarrier || false
    );
  }, [carrierList, loginInfo]);

  // 내가 이 방의 참여자인지 확인 (참여자만 토글 가능)
  const isParticipant = useMemo(() => {
    return _roomInfo?.part?.some((p: any) => p._id === loginInfo?.oid);
  }, [_roomInfo, loginInfo]);

  const pages = useMemo(
    () =>
      roomInfo && [
        {
          key: "info",
          name: "방 정보",
          body: (
            <BodyRoomSelection roomInfo={roomInfo} carrierList={carrierList} />
          ),
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
    padding: "10px 32px 12px 8px",
  };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      css={{ padding: "10px" }}
    >
      {roomInfo && (
        <>
          <div css={styleTitle}>{roomInfo.name}</div>
          
          {pages && <Navigation pages={pages} />}
          <HeightFixWrapper onChangeHeight={setBodyHeight}>
            <BodyRoomSelection roomInfo={roomInfo} />
          </HeightFixWrapper>
        </>
      )}
    </Modal>
  );
};

export default ModalRoomSelection;
