import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import usePageFromSearchParams from "@/hooks/usePageFromSearchParams";
import useRoomListAnimationState from "@/hooks/useRoomListAnimationState";

import Empty from "@/components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "@/components/Pagination";
import Room from "@/components/Room";
import AnimatedRoom from "@/components/Room/AnimatedRoom";

import { smoothMove } from "@/tools/animations";

type RoomListProps = {
  rooms: Nullable<Array<any>>;
  initialLoad: boolean;
};

const RoomList = (props: RoomListProps) => {
  const totalPages = Math.ceil((props.rooms ?? []).length / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);
  const { localRooms } = useRoomListAnimationState(props.rooms);

  const [prevRoomOrder, setPrevRoomOrder] = useState<string[]>([]);
  const [animatingRooms, setAnimatingRooms] = useState<Set<string>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 현재 방 목록의 순서
  const currentRoomOrder = useMemo(
    () => localRooms?.map((room) => room._id) || [],
    [localRooms]
  );

  // 순서가 변경된 방들을 감지하고 애니메이션 적용
  useEffect(() => {
    const isOrderChanged =
      prevRoomOrder.length !== currentRoomOrder.length ||
      prevRoomOrder.some((roomId, index) => roomId !== currentRoomOrder[index]);

    if (!isOrderChanged) return;

    if (prevRoomOrder.length === 0) {
      setPrevRoomOrder(currentRoomOrder);
      return;
    }

    const changedRooms = new Set<string>();
    currentRoomOrder.forEach((roomId, index) => {
      if (prevRoomOrder[index] !== roomId) {
        changedRooms.add(roomId);
      }
    });

    if (changedRooms.size > 0) {
      setAnimatingRooms(changedRooms);

      // 이전 타이머가 있다면 취소
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setAnimatingRooms(new Set());
        timerRef.current = null;
      }, 500);

      setPrevRoomOrder(currentRoomOrder);
    } else {
      setPrevRoomOrder(currentRoomOrder);
    }
  }, [currentRoomOrder, prevRoomOrder]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      {localRooms?.length ? (
        <>
          {localRooms
            ?.slice(
              PAGE_MAX_ITEMS * (currentPage - 1),
              PAGE_MAX_ITEMS * currentPage
            )
            .map((room, index) => {
              const shouldAnimate = animatingRooms.has(room._id);
              return (
                <div
                  key={room._id}
                  css={
                    shouldAnimate
                      ? {
                          animation: `${smoothMove} 0.35s cubic-bezier(0.2, 0.6, 0.2, 1)`,
                          animationDelay: `${index * 0.04}s`,
                          animationFillMode: "both",
                          transformOrigin: "center",
                        }
                      : {}
                  }
                >
                  <Link
                    to={`/home/${room._id}?page=${currentPage}`}
                    replace
                    style={{ textDecoration: "none" }}
                  >
                    {props.initialLoad ? (
                      <AnimatedRoom
                        data={room}
                        marginBottom="15px"
                        type={room.type}
                      />
                    ) : (
                      <Room data={room} marginBottom="15px" />
                    )}
                  </Link>
                </div>
              );
            })}
          {localRooms.length > PAGE_MAX_ITEMS && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              isMobile
            />
          )}
        </>
      ) : (
        <Empty type="mobile" css={{ marginBottom: "15px" }}>
          해당 요일에 개설된 방이 없습니다
        </Empty>
      )}
    </>
  );
};

export default RoomList;
