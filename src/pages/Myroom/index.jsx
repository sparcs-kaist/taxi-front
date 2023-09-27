import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import useButterflyState from "hooks/useButterflyState";
import { useIsLogin, useValueRecoilState } from "hooks/useFetchRecoilState";
import usePageFromSearchParams from "hooks/usePageFromSearchParams";

import AdaptiveDiv from "components/AdaptiveDiv";
import { PAGE_MAX_ITEMS } from "components/Pagination";
import Title from "components/Title";
import WhiteContainerSuggestLogin from "components/WhiteContainer/WhiteContainerSuggestLogin";

import R1Myroom from "./R1Myroom";
import R2Myroom from "./R2Myroom";

export const MAX_PARTICIPATION = 5;

const Myroom = () => {
  const history = useHistory();
  const { roomId } = useParams();
  const butterflyState = useButterflyState();
  const myRooms = useValueRecoilState("myRooms");
  const totalPages = Math.ceil((myRooms?.done?.length ?? 0) / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);
  const isLogin = useIsLogin();

  useEffect(() => {
    if (butterflyState === "fold" && roomId) {
      history.replace(`/chatting/${roomId}`);
    }
  }, [butterflyState, roomId]);

  return !isLogin ? (
    <AdaptiveDiv type="center">
      <Title icon="myroom" isHeader>
        내 방 보기
      </Title>
      <WhiteContainerSuggestLogin />
    </AdaptiveDiv>
  ) : butterflyState === "fold" ? (
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
