import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import WhiteContainer from "@frames/WhiteContainer/WhiteContainer";
import Title from "@frames/Title/Title";
import RLayout from "@frames/ReactiveLayout/RLayout";
import Room from "@components/Room/Room/RoomElement1";
import SideChat from "./SideChat";
import Chat from "./Chat";
import axios from "@tools/axios";
import PropTypes from "prop-types";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";

const Myroom = (props) => {
  const history = useHistory();
  const reactiveState = RLayout.useR2state();
  const [chatRoomId, setChatRoomId] = useState(props.param);
  const [roomList1, setRoomList1] = useState([]);
  const [roomList2, setRoomList2] = useState([]);

  useEffect(() => {
    setChatRoomId(props.param);
  }, [props.param]);

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
          <Link
            key={index}
            to={`/myroom/${item._id}`}
            style={{ textDecoration: "none" }}
          >
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
          </Link>
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
          <SideChat
            roomId={chatRoomId}
            onClose={() => setChatRoomId(null)}
            setChatRoomId={setChatRoomId}
          />
        ) : null}
      </div>
    </div>
  );

  useEffect(() => {
    if (reactiveState == 3) {
      props.setShowFH(false);
    }
  }, [reactiveState]);

  return (
    <div>
      <div style={{ height: "30px" }} />
      <Title icon={(style) => <LibraryBooksRoundedIcon style={style} />}>
        내 방 리스트
      </Title>
      <div style={{ height: "20px" }} />
      {reactiveState === 3 && chatRoomId ? (
        <Chat
          roomId={chatRoomId}
          onClose={() => setChatRoomId(null)}
          setChatRoomId={setChatRoomId}
        />
      ) : (
        <RLayout.R2 priority="left" left={leftLay} right={rightLay} />
      )}
    </div>
  );
};

Myroom.propTypes = {
  param: PropTypes.string,
  setShowFH: PropTypes.func,
};

export default Myroom;
