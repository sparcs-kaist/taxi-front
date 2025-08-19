import { keyframes } from "@emotion/react";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Chat from "@/components/Chat";
import DottedLine from "@/components/DottedLine";
import Empty from "@/components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "@/components/Pagination";
import Room from "@/components/Room";
import AnimatedRoom from "@/components/Room/AnimatedRoom";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import { sortRoomsByUnreadCount } from "./utils";

import theme from "@/tools/theme";

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

const LinkRoom = (props) => {
  const history = useHistory();

  return props.currentId === props.id ? (
    <div onClick={() => history.goBack()}>{props.children}</div>
  ) : (
    <Link
      to={(location) => ({
        ...location,
        pathname: `/myroom/${props.id}`,
      })}
      replace={props.currentId ? true : false}
      style={{ textDecoration: "none" }}
    >
      {props.children}
    </Link>
  );
};

LinkRoom.propTypes = {
  currentId: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
};

const R2Myroom = (props) => {
  const [prevRoomOrder, setPrevRoomOrder] = useState([]);
  const [animatingRooms, setAnimatingRooms] = useState(new Set());

  // 현재 정렬된 방 목록
  const sortedRooms = useMemo(
    () => sortRoomsByUnreadCount(props.ongoing),
    [props.ongoing]
  );
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

    const changedRooms = new Set();
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
    <AdaptiveDiv
      type="butterfly"
      left={
        <>
          <Title icon="myroom" isHeader>
            내 방 보기
          </Title>
          <div css={{ margin: "0 -4px", padding: "0 4px" }}>
            <WhiteContainer css={{ padding: "20px 20px 22px" }}>
              <Title icon="current">참여 중인 방</Title>
              <div css={{ height: "19px" }} />
              <DottedLine direction="row" />
              {props.ongoing.length === 0 ? (
                <Empty type="pc">참여 중인 방이 없습니다</Empty>
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
                      <LinkRoom currentId={props.roomId} id={item._id}>
                        <AnimatedRoom
                          data={item}
                          selected={props.roomId === item._id}
                          theme="purple"
                          marginTop="15px"
                          type={item.type}
                          unreadCount={item.unreadCount}
                          hasImportantMessage={item.hasImportantMessage}
                        />
                      </LinkRoom>
                    </div>
                  );
                })
              )}
            </WhiteContainer>
            <WhiteContainer
              css={{ padding: "20px 20px 22px", margin: "0 0 -17px" }}
            >
              <Title icon="past">과거 참여 방</Title>
              <div css={{ height: "19px" }} />
              <DottedLine direction="row" />
              {props.done.length === 0 ? (
                <Empty type="pc">과거 참여했던 방이 없습니다</Empty>
              ) : (
                <div>
                  {props.done
                    .slice(
                      PAGE_MAX_ITEMS * (props.donePageInfo.currentPage - 1),
                      PAGE_MAX_ITEMS * props.donePageInfo.currentPage
                    )
                    .map((item) => (
                      <LinkRoom
                        key={item._id}
                        currentId={props.roomId}
                        id={item._id}
                      >
                        <AnimatedRoom
                          data={item}
                          selected={props.roomId === item._id}
                          theme="purple"
                          marginTop="15px"
                          type={item.type}
                          unreadCount={item.unreadCount}
                          hasImportantMessage={item.hasImportantMessage}
                        />
                      </LinkRoom>
                    ))}
                  <Pagination
                    totalPages={props.donePageInfo.totalPages}
                    currentPage={props.donePageInfo.currentPage}
                  />
                </div>
              )}
            </WhiteContainer>
          </div>
        </>
      }
      right={
        props.roomId ? (
          <div
            css={{
              position: "fixed",
              width: "min(390px, calc(50% - 27.5px))",
              top: "max(calc(79px - var(--window-scroll-y)), 15px)",
              left: "calc(50% + 7.5px)",
              height:
                "calc(var(--window-inner-height) - max(calc(79px - var(--window-scroll-y)), 15px) - 56px - 15px - env(safe-area-inset-bottom))",
              zIndex: theme.zIndex_nav - 1,
            }}
          >
            <WhiteContainer css={{ padding: "0", height: "100%" }}>
              <Chat roomId={props.roomId} layoutType="sidechat" />
            </WhiteContainer>
          </div>
        ) : null
      }
    />
  );
};

R2Myroom.propTypes = {
  roomId: PropTypes.string,
  ongoing: PropTypes.array,
  done: PropTypes.array,
  recallEvent: PropTypes.func,
  donePageInfo: PropTypes.object,
  donePageClickHandler: PropTypes.func,
  doneNextPageHandler: PropTypes.func,
  donePrevPageHandler: PropTypes.func,
};
R2Myroom.defaultProps = {
  ongoing: [],
  done: [],
};

export default R2Myroom;
