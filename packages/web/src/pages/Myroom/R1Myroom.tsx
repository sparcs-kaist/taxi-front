import { keyframes } from "@emotion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Empty from "@/components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "@/components/Pagination";
import AnimatedRoom from "@/components/Room/AnimatedRoom";
import Title from "@/components/Title";

import { sortRoomsByUnreadCount } from "./utils";

// 위치 변경 애니메이션 - 더 부드럽고 직관적인 슬라이드 효과
const smoothMove = keyframes`
  0% {
    transform: translateY(-20px) scale(0.95);
    opacity: 0.7;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: translateY(-5px) scale(1.02);
    opacity: 0.9;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 현재 정렬된 방 목록
  const sortedRooms = useMemo(() => sortRoomsByUnreadCount(ongoing), [ongoing]);
  const currentRoomOrder = useMemo(
    () => sortedRooms.map((room) => room._id),
    [sortedRooms]
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
                      animation: `${smoothMove} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                      animationDelay: `${index * 0.08}s`,
                      animationFillMode: "both",
                      transformOrigin: "center",
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
