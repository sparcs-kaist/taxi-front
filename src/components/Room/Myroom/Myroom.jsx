import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import WhiteContainer from "components/common/WhiteContainer";
import Title from "components/common/Title";
import RLayout from "components/common/RLayout";
import { useR2state } from "hooks/useReactiveState";
import RoomList from "@components/Room/Room/RoomList";
import SideChat from "@components/Chatting/SideChat";
import axios from "@tools/axios";

// import Chatting from "../../../components/Chatting/Chatting";

const Myroom = () => {
  const history = useHistory();
  const reactiveState = useR2state();
  const [currentRoom, setCurrentRoom] = useState([]);
  const [pastRoom, setPastRoom] = useState([]);
  const param = useParams();

  const updateRoomList = async () => {
    const result = await axios.get("rooms/searchByUser");
    try {
      setCurrentRoom(result.data.ongoing);
      setPastRoom(result.data.done);
    } catch {
      console.log("error"); // FIXME
    }
  };
  useEffect(async () => {
    updateRoomList();
  }, []);

  useEffect(() => {
    if (reactiveState == 3 && param.roomId) {
      history.replace("/chatting/" + param.roomId);
    }
  });

  const leftLay = (
    <div>
      <RoomList
        icon="current"
        title="참여 중인 방"
        list={currentRoom}
        selected={param.roomId}
      />
      <RoomList
        icon="past"
        title="과거 참여 방"
        list={pastRoom}
        selected={param.roomId}
      />
    </div>
  );
  const rightLay = (
    <div>
      <WhiteContainer marginAuto={false} padding="20px">
        <Title icon="chat" marginAuto={false}>
          채팅 창
        </Title>
      </WhiteContainer>
      <div style={{ height: "500px", position: "relative" }}>
        {param.roomId ? <SideChat roomId={param.roomId} /> : null}
      </div>
    </div>
  );

  return (
    <>
      <Title icon="myroom" header={true}>
        내 방 리스트
      </Title>
      <RLayout.R2 priority="left" left={leftLay} right={rightLay} />
    </>
  );
};

export default Myroom;
