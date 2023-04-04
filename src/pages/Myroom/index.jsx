import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import usePageFromSearchParams from "hooks/usePageFromSearchParams";
import { useR2state } from "hooks/useReactiveState";

import { PAGE_MAX_ITEMS } from "components/Pagination";

import R1Myroom from "./R1Myroom";
import R2Myroom from "./R2Myroom";

import myRoomAtom from "atoms/myRoom";
import { useRecoilValue } from "recoil";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import RLayout from "components/RLayout";
import SuggestLogin from "components/SuggestLogin";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

export const MAX_PARTICIPATION = 5;

const Myroom = () => {
  const history = useHistory();
  const { roomId } = useParams();
  const reactiveState = useR2state();
  const myRoom = useRecoilValue(myRoomAtom);
  const totalPages = Math.ceil((myRoom?.done?.length ?? 0) / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);
  const isLogin = !!useRecoilValue(loginInfoDetailAtom)?.id;

  useEffect(() => {
    if (reactiveState == 3 && roomId) {
      history.replace(`/chatting/${roomId}`);
    }
  }, [reactiveState, roomId, history]);

  return !isLogin ? (
    <>
      <Title icon="add" header marginAuto>
        참여 중인 방
      </Title>
      <WhiteContainer marginAuto>
        <SuggestLogin />
      </WhiteContainer>
    </>
  ) : reactiveState === 3 ? (
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
