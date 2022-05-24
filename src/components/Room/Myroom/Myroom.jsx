import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Title from "../../Frame/Title/Title";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import Room from "../Room/RoomElement1";
import SideChat from "./SideChat";
import axios from "../../Tool/axios";

import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";

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

  const styleLine = {
    height: "1px",
    backgroundImage:
      "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "15px 1px",
    backgroundRpeat: "repeat-x",
  };

  if (reactiveState == 3 && chatRoomId) {
    history.push(`/chatting/${chatRoomId}`);
  }

  const leftLay = (
    <div>
      <WhiteContainer marginAuto={false} padding="20px">
        <Title
          icon={(style) => <LibraryBooksRoundedIcon style={style} />}
          marginAuto={false}
        >
          참여 중인 방
        </Title>

        <div style={{ height: "7px" }} />
        <div style={styleLine} />

        {roomList1.map((item, index) => (
          <Room
            key={index}
            name={item.name}
            left={0}
            creater="백에서 가져오기"
            origin={item.from}
            destination={item.to}
            date={item.time}
            onClick={() => setChatRoomId(item._id)}
            selected={chatRoomId === item._id}
            marginTop="15px"
          />
        ))}
      </WhiteContainer>
      <WhiteContainer marginAuto={false} padding="20px">
        <Title
          icon={(style) => <LibraryBooksRoundedIcon style={style} />}
          marginAuto={false}
        >
          과거 참여 방
        </Title>

        <div style={{ height: "7px" }} />
        <div style={styleLine} />

        {roomList2.map((item, index) => (
          <Room
            key={index}
            name={item.name}
            left={0}
            creater="백에서 가져오기"
            origin={item.from}
            destination={item.to}
            date={item.time}
            onClick={() => setChatRoomId(item._id)}
            selected={chatRoomId === item._id}
            marginTop="15px"
          />
        ))}
      </WhiteContainer>
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
