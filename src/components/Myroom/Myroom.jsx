import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import qs from "qs";

import { useR2state } from "hooks/useReactiveState";
import useTaxiAPI from "hooks/useTaxiAPI";
import R1Myroom from "./R1Myroom";
import R2Myroom from "./R2Myroom";

const PAGE_MAX_ROOMS = 20;

const Myroom = () => {
  const history = useHistory();
  const location = useLocation();
  const { roomId } = useParams();
  const reactiveState = useR2state();
  const [roomListToken, setRoomListToken] = useState(Date.now().toString());
  const [, roomList] = useTaxiAPI.get("/rooms/v2/searchByUser", {}, [
    roomListToken,
  ]);
  const [donePageInfo, setDonePageInfo] = useState({
    totalPages: 1,
    currentPage: 1,
  });

  if (reactiveState == 3 && roomId) {
    history.replace(`/chatting/${roomId}`);
  }

  useEffect(() => {
    if (!roomList) return;
    const q = qs.parse(location.search.slice(1));
    const currentPage = Number(q.page);

    setDonePageInfo({
      totalPages: Math.ceil(roomList.done.length / PAGE_MAX_ROOMS),
      currentPage: Number.isNaN(currentPage) ? 1 : currentPage,
    });
  }, [roomList, location]);

  return reactiveState === 3 ? (
    <R1Myroom
      roomId={roomId}
      ongoing={roomList?.ongoing}
      done={roomList?.done}
      recallEvent={() => setRoomListToken(Date.now().toString())}
      donePageInfo={donePageInfo}
    />
  ) : (
    <R2Myroom
      roomId={roomId}
      ongoing={roomList?.ongoing}
      done={roomList?.done}
      recallEvent={() => setRoomListToken(Date.now().toString())}
      donePageInfo={donePageInfo}
    />
  );
};

export default Myroom;
