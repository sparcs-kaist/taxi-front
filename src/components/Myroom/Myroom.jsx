import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useR2state } from "hooks/useReactiveState";
import { useRecoilValue } from "recoil";
import myRoomAtom from "recoil/myRoom";
import usePageFromSearchParams from "hooks/usePageFromSearchParams";
import R1Myroom from "./R1Myroom";
import R2Myroom from "./R2Myroom";

const PAGE_MAX_ROOMS = 20;
export const MAX_PARTICIPATION = 5;

const Myroom = () => {
  const history = useHistory();
  const { roomId } = useParams();
  const reactiveState = useR2state();
  const myRoom = useRecoilValue(myRoomAtom);
  const [donePageInfo, setDonePageInfo] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const { page, isValid: isValidPage } = usePageFromSearchParams();

  if (reactiveState == 3 && roomId) {
    history.replace(`/chatting/${roomId}`);
  }

  useEffect(() => {
    if (!myRoom?.done) return;
    setDonePageInfo({
      totalPages: Math.ceil(myRoom.done.length / PAGE_MAX_ROOMS),
      currentPage: isValidPage ? page : 1,
    });
  }, [JSON.stringify(myRoom), page, isValidPage]);

  return reactiveState === 3 ? (
    <R1Myroom
      roomId={roomId}
      ongoing={myRoom?.ongoing}
      done={myRoom?.done}
      donePageInfo={donePageInfo}
    />
  ) : (
    <R2Myroom
      roomId={roomId}
      ongoing={myRoom?.ongoing}
      done={myRoom?.done}
      donePageInfo={donePageInfo}
    />
  );
};

export default Myroom;
