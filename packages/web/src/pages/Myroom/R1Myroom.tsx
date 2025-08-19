import { keyframes } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Empty from "@/components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "@/components/Pagination";
import AnimatedRoom from "@/components/Room/AnimatedRoom";
import Title from "@/components/Title";

import { sortRoomsByUnreadCount } from "./utils";

// 부드러운 이동 애니메이션
const smoothMove = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0.8;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

/**
 * @todo
 * - R2Myroom도 props가 같기 때문에 이 타입은 Myroom에서 export한 후 import해서 쓰기
 * - 전역으로 DB 스키마 타입 추가하기 (현재는 ongoing, done을 Array<any>로 정의)
 */
type R1MyroomProps = {
  roomId: string;
  ongoing: Array<any>;
  done: Array<any>;
  donePageInfo: { totalPages: number; currentPage: number };
};

const R1Myroom = ({
  roomId,
  ongoing = [],
  done = [],
  donePageInfo,
}: R1MyroomProps) => {
  const [prevRoomOrder, setPrevRoomOrder] = useState<string[]>([]);
  const [animatingRooms, setAnimatingRooms] = useState<Set<string>>(new Set());

  // 현재 정렬된 방 목록
  const sortedRooms = useMemo(() => sortRoomsByUnreadCount(ongoing), [ongoing]);
  const currentRoomOrder = useMemo(
    () => sortedRooms.map((room) => room._id),
    [sortedRooms]
  );

  // 순서가 변경된 방들을 감지하고 애니메이션 적용
  useEffect(() => {
    let timer = null;

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

      timer = setTimeout(() => {
        setAnimatingRooms(new Set());
      }, 500);

      setPrevRoomOrder(currentRoomOrder);
    } else {
      setPrevRoomOrder(currentRoomOrder);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentRoomOrder]);

  return (
    <AdaptiveDiv type="center">
      <Title icon="current" isHeader>
        참여 중인 방
      </Title>
      {ongoing?.length === 0 ? (
        <Empty type="mobile">참여 중인 방이 없습니다</Empty>
      ) : (
        sortedRooms.map((item, index) => {
          const shouldAnimate = animatingRooms.has(item._id);
          return (
            <div
              key={item._id}
              css={
                shouldAnimate
                  ? {
                      animation: `${smoothMove} 0.3s ease-out`,
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: "both",
                    }
                  : {}
              }
            >
              <Link
                to={`/myroom/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <AnimatedRoom
                  data={item}
                  selected={roomId === item._id}
                  theme="white"
                  marginBottom="15px"
                  type={item.type}
                  unreadCount={item.unreadCount}
                  hasImportantMessage={item.hasImportantMessage}
                />
              </Link>
            </div>
          );
        })
      )}
      <Title icon="past" isHeader>
        과거 참여 방
      </Title>
      {done?.length === 0 ? (
        <Empty type="mobile">과거 참여했던 방이 없습니다</Empty>
      ) : (
        <>
          {done
            ?.slice(
              PAGE_MAX_ITEMS * (donePageInfo.currentPage - 1),
              PAGE_MAX_ITEMS * donePageInfo.currentPage
            )
            .map((item) => (
              <Link
                key={item._id}
                to={`/myroom/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <AnimatedRoom
                  data={item}
                  selected={roomId === item._id}
                  theme="white"
                  marginTop="15px"
                  type={item.type}
                  unreadCount={item.unreadCount}
                  hasImportantMessage={item.hasImportantMessage}
                />
              </Link>
            ))}
          <Pagination
            totalPages={donePageInfo.totalPages}
            currentPage={donePageInfo.currentPage}
            isMobile
          />
        </>
      )}
    </AdaptiveDiv>
  );
};

export default R1Myroom;
