import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import usePageFromSearchParams from "hooks/usePageFromSearchParams";
import { useR2state } from "hooks/useReactiveState";

import { PAGE_MAX_ITEMS } from "components/Pagination";
import SuggestLogin from "components/SuggestLogin";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import R1Myroom from "./R1Myroom";
import R2Myroom from "./R2Myroom";

import loginInfoAtom from "atoms/loginInfo";
import myRoomsAtom from "atoms/myRooms";
import { useRecoilValue } from "recoil";

export const MAX_PARTICIPATION = 5;

const Myroom = () => {
  const history = useHistory();
  const { roomId } = useParams();
  const reactiveState = useR2state();
  const myRooms = useRecoilValue(myRoomsAtom);
  const totalPages = Math.ceil((myRooms?.done?.length ?? 0) / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);
  const isLogin = !!useRecoilValue(loginInfoAtom)?.id;

  useEffect(() => {
    if (reactiveState == 3 && roomId) {
      history.replace(`/chatting/${roomId}`);
    }
  }, [reactiveState, roomId, history]);

  return !isLogin ? (
    <>
      <Title icon="myroom" header marginAuto>
        내 방 보기
      </Title>
      <WhiteContainer marginAuto>
        <SuggestLogin />
      </WhiteContainer>
    </>
  ) : reactiveState === 3 ? (
    <R1Myroom
      roomId={roomId}
      ongoing={myRooms?.ongoing}
      done={myRooms?.done}
      donePageInfo={{ totalPages, currentPage }}
    />
  ) : (
    <R2Myroom
      roomId={roomId}
      ongoing={myRooms?.ongoing}
      done={myRooms?.done}
      donePageInfo={{ totalPages, currentPage }}
    />
  );
};

export default Myroom;
