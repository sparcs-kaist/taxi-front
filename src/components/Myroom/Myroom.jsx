import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useR2state } from "hooks/useReactiveState";
import usePageFromSearchParams from "hooks/usePageFromSearchParams";
import { PAGE_MAX_ITEMS } from "components/common/pagination/Pagination";
import R1Myroom from "./R1Myroom";
import R2Myroom from "./R2Myroom";
import myRoomAtom from "recoil/myRoom";
export const MAX_PARTICIPATION = 5;

const Myroom = () => {
  const history = useHistory();
  const { roomId } = useParams();
  const reactiveState = useR2state();
  const myRoom = useRecoilValue(myRoomAtom);
  const totalPages = Math.ceil((myRoom?.done?.length ?? 0) / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);

  useEffect(() => {
    if (reactiveState == 3 && roomId) {
      history.replace(`/chatting/${roomId}`);
    }
  }, [reactiveState, roomId, history]);

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
