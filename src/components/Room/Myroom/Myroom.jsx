import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Title from "../../Frame/Title/Title";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import RoomList from "../../Room/Room/RoomList";
import SideChat from "./SideChat";
import axios from "../../Tool/axios";

import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";

const Myroom = () => {
  const history = useHistory();
  const reactiveState = RLayout.useR2state();
  const [chatRoomId, setChatRoomId] = useState(null);
  const [roomList1, setRoomList1] = useState([]);
  const [roomList2, setRoomList2] = useState([]);

  const updateRoomList = async () => {
    const result = await axios.get("rooms/searchByUser");
    try {
      setRoomList1(result.data.ongoing);
      setRoomList2(result.data.done);
    } catch {
      console.log("error"); // FIXME
    }
  };
  useEffect(async () => {
    updateRoomList();
  }, []);

  if (reactiveState == 3 && chatRoomId) {
    history.push(`/chatting/${chatRoomId}`);
  }

  const leftLay = (
    <div>
      <RoomList
        icon={(style) => <LibraryBooksRoundedIcon style={style} />}
        title="참여 중인 방"
        list={roomList1}
      />
      <RoomList
        icon={(style) => <HistoryRoundedIcon style={style} />}
        title="과거 참여 방"
        list={roomList2}
      />
    </div>
  );
  const rightLay = (
    <div>
      <WhiteContainer marginAuto={false} padding="20px">
        <Title
          icon={(style) => <LibraryBooksRoundedIcon style={style} />}
          marginAuto={false}
        >
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
    <div>
      <div style={{ height: "30px" }} />
      <Title icon={(style) => <LibraryBooksRoundedIcon style={style} />}>
        내 방 리스트
      </Title>
      <div style={{ height: "20px" }} />
      <RLayout.R2 priority="left" left={leftLay} right={rightLay} />
    </div>
  );
};

export default Myroom;
