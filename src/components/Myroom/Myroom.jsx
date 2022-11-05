import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { useR2state } from "hooks/useReactiveState";
import { useRecoilValue } from "recoil";
import myRoomAtom from "recoil/myRoom";
import usePageFromSearchParams from "hooks/usePageFromSearchParams";
import R1Myroom from "./R1Myroom";
import R2Myroom from "./R2Myroom";

import { PAGE_MAX_ITEMS } from "components/common/pagination/Pagination";
export const MAX_PARTICIPATION = 5;

const Myroom = () => {
  const history = useHistory();
  const { roomId } = useParams();
  const reactiveState = useR2state();
  const myRoom = useRecoilValue(myRoomAtom);
  const totalPages = Math.ceil((myRoom?.done?.length ?? 0) / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);

  if (reactiveState == 3 && roomId) {
    history.replace(`/chatting/${roomId}`);
  }

  return reactiveState === 3 ? (
    <R1Myroom
      roomId={roomId}
      ongoing={myRoom?.ongoing}
      done={myRoom?.done}
      donePageInfo={{ totalPages, currentPage }}
    />
  ) : (
    <R2Myroom
      roomId={roomId}
      ongoing={myRoom?.ongoing}
      done={myRoom?.done}
      donePageInfo={{ totalPages, currentPage }}
    />
  );
};

export default Myroom;
