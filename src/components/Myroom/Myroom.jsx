import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useR2state } from "hooks/useReactiveState";
import useTaxiAPI from "hooks/useTaxiAPI";
import R1Myroom from "./R1Myroom";
import R2Myroom from "./R2Myroom";

const PAGE_MAX_ROOMS = 20;

const Myroom = () => {
  const history = useHistory();
  const { roomId } = useParams();
  const reactiveState = useR2state();
  const [roomListToken, setRoomListToken] = useState(Date.now().toString());
  const [, roomList] = useTaxiAPI.get("/rooms/v2/searchByUser", {}, [
    roomListToken,
  ]);
  const [ongoingPageInfo, setOngoingPageInfo] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const [donePageInfo, setDonePageInfo] = useState({
    totalPages: 1,
    currentPage: 1,
  });

  if (reactiveState == 3 && roomId) {
    history.replace(`/chatting/${roomId}`);
  }

  const ongoingPageClickHandler = (page) => {
    setOngoingPageInfo({ ...ongoingPageInfo, currentPage: page });
  };
  const donePageClickHandler = (page) => {
    setDonePageInfo({ ...donePageInfo, currentPage: page });
  };

  const ongoingPrevPageHandler = () => {
    if (ongoingPageInfo.currentPage <= 1) return;
    setOngoingPageInfo({
      ...ongoingPageInfo,
      currentPage: ongoingPageInfo.currentPage - 1,
    });
  };
  const donePrevPageHandler = () => {
    if (donePageInfo.currentPage <= 1) return;
    setDonePageInfo({
      ...donePageInfo,
      currentPage: donePageInfo.currentPage - 1,
    });
  };

  const ongoingNextPageHandler = () => {
    if (ongoingPageInfo.currentPage >= ongoingPageInfo.totalPages) return;
    setOngoingPageInfo({
      ...ongoingPageInfo,
      currentPage: ongoingPageInfo.currentPage + 1,
    });
  };
  const doneNextPageHandler = () => {
    if (donePageInfo.currentPage >= donePageInfo.totalPages) return;
    setDonePageInfo({
      ...donePageInfo,
      currentPage: donePageInfo.currentPage + 1,
    });
  };

  useEffect(() => {
    if (!roomList) return;
    setOngoingPageInfo({
      totalPages: Math.ceil(roomList.ongoing.length / PAGE_MAX_ROOMS),
      currentPage: 1,
    });
    setDonePageInfo({
      totalPages: Math.ceil(roomList.done.length / PAGE_MAX_ROOMS),
      currentPage: 1,
    });
  }, [roomList]);

  return reactiveState === 3 ? (
    <R1Myroom
      roomId={roomId}
      ongoing={roomList?.ongoing}
      done={roomList?.done}
      recallEvent={() => setRoomListToken(Date.now().toString())}
      ongoingPageInfo={ongoingPageInfo}
      donePageInfo={donePageInfo}
      ongoingPageClickHandler={ongoingPageClickHandler}
      donePageClickHandler={donePageClickHandler}
      ongoingNextPageHandler={ongoingNextPageHandler}
      doneNextPageHandler={doneNextPageHandler}
      ongoingPrevPageHandler={ongoingPrevPageHandler}
      donePrevPageHandler={donePrevPageHandler}
    />
  ) : (
    <R2Myroom
      roomId={roomId}
      ongoing={roomList?.ongoing}
      done={roomList?.done}
      recallEvent={() => setRoomListToken(Date.now().toString())}
      ongoingPageInfo={ongoingPageInfo}
      donePageInfo={donePageInfo}
      ongoingPageClickHandler={ongoingPageClickHandler}
      donePageClickHandler={donePageClickHandler}
      ongoingNextPageHandler={ongoingNextPageHandler}
      doneNextPageHandler={doneNextPageHandler}
      ongoingPrevPageHandler={ongoingPrevPageHandler}
      donePrevPageHandler={donePrevPageHandler}
    />
  );
};

export default Myroom;
