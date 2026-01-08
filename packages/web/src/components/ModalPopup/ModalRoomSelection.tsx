import { useEffect, useMemo, useRef, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

// 추가: 토글 API 호출용
import Modal from "@/components/Modal";
import Navigation from "@/components/Navigation";

import BodyRoomSelection, {
  BodyRoomSelectionProps,
} from "./Body/BodyRoomSelection";
import { BodyRoomShare } from "./ModalRoomShare";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

// 추가

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

  const axios = useAxios(); // 추가
  const setAlert = useSetRecoilState(alertAtom); // 추가
  const loginInfo = useValueRecoilState("loginInfo"); // 로그인된 내 정보

  useEffect(() => {
    if (_roomInfo) setRoomInfo(_roomInfo);
  }, [_roomInfo]);

  const handleToggleCarrier = () => {
    if (!roomInfo) return;
    axios({
      url: "/rooms/carrier/toggle",
      method: "post",
      data: { roomId: roomInfo._id }, // 필요한 경우 roomId 전송
      onSuccess: () => {
        // 성공 시 로컬 state 즉시 업데이트 (낙관적 업데이트)
        setRoomInfo((prev: any) => {
          if (!prev) return null;
          return {
            ...prev,
            part: prev.part.map((user: any) =>
              user._id === loginInfo?.oid
                ? { ...user, hasCarrier: !user.hasCarrier } // 내 상태 반전
                : user
            ),
          };
        });
      },
      onError: () => setAlert("캐리어 상태 변경에 실패했습니다."),
    });
  };

  const pages = useMemo(
    () =>
      roomInfo && [
        {
          key: "info",
          name: "방 정보",
          body: (
            <BodyRoomSelection
              roomInfo={roomInfo}
              // carrierList={carrierList} // 삭제: roomInfo에 포함됨
              onToggleCarrier={handleToggleCarrier} // 추가: 토글 함수 전달
            />
          ),
        },
        {
          key: "share",
          name: "공유하기",
          body: <BodyRoomShare roomInfo={roomInfo} height={bodyHeight} />,
        },
      ],
    [roomInfo, bodyHeight, loginInfo] // 의존성 추가
  );

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

          {/* HeightFixWrapper에도 동일한 props를 넘겨야 높이 계산이 정확함 */}
          <HeightFixWrapper onChangeHeight={setBodyHeight}>
            <BodyRoomSelection
              roomInfo={roomInfo}
              onToggleCarrier={handleToggleCarrier}
            />
          </HeightFixWrapper>
        </>
      )}
    </Modal>
  );
};

export default ModalRoomSelection;
