import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useR2state } from "hooks/useReactiveState";
import useTaxiAPI from "hooks/useTaxiAPI";
import usePageFromSearchParams from "hooks/usePageFromSearchParams";
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
  const [donePageInfo, setDonePageInfo] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const { page, isValid: isValidPage } = usePageFromSearchParams();

  if (reactiveState == 3 && roomId) {
    history.replace(`/chatting/${roomId}`);
  }

  useEffect(() => {
    if (!roomList) return;

    setDonePageInfo({
      totalPages: Math.ceil(roomList.done.length / PAGE_MAX_ROOMS),
      currentPage: isValidPage ? page : 1,
    });
  }, [roomList, page, isValidPage]);

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
