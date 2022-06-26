import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Title from "../../Frame/Title/Title";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import RoomList from "../../Room/Room/RoomList";
import SideChat from "./SideChat";
import axios from "../../Tool/axios";

import Chatting from "../../../components/Chatting/Chatting";

const Myroom = () => {
  const history = useHistory();
  const reactiveState = RLayout.useR2state();
  const [chatRoomId, setChatRoomId] = useState(null);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [pastRoom, setPastRoom] = useState([]);

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

  // if (reactiveState == 3 && chatRoomId) {
  //   history.push(`/chatting/${chatRoomId}`);
  // }

  const leftLay = (
    <div>
      <RoomList
        icon="current"
        title="참여 중인 방"
        list={currentRoom}
        onClick={(id) => setChatRoomId(id)}
        selected={chatRoomId}
      />
      <RoomList
        icon="past"
        title="과거 참여 방"
        list={pastRoom}
        onClick={(id) => setChatRoomId(id)}
        selected={chatRoomId}
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
        {chatRoomId ? (
          <SideChat roomId={chatRoomId} onClose={() => setChatRoomId(null)} />
        ) : null}
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
