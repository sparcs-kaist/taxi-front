import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useR2state } from "hooks/useReactiveState";
import useTaxiAPI from "hooks/useTaxiAPI";
import R1Myroom from "./R1Myroom";
import R2Myroom from "./R2Myroom";

const Myroom = () => {
  const history = useHistory();
  const { roomId } = useParams();
  const reactiveState = useR2state();
  const [roomListToken, setRoomListToken] = useState(Date.now().toString());
  const [, roomList] = useTaxiAPI.get("/rooms/v2/searchByUser", {}, [
    roomListToken,
  ]);

  if (reactiveState == 3 && roomId) {
    history.replace(`/chatting/${roomId}`);
  }

  useEffect(() => {}, []);

  return reactiveState === 3 ? (
    <R1Myroom
      roomId={roomId}
      ongoing={roomList?.ongoing}
      done={roomList?.done}
      recallEvent={() => setRoomListToken(Date.now().toString())}
    />
  ) : (
    <R2Myroom
      roomId={roomId}
      ongoing={roomList?.ongoing}
      done={roomList?.done}
      recallEvent={() => setRoomListToken(Date.now().toString())}
    />
  );
};

export default Myroom;
