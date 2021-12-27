import React, { useEffect, useState } from "react";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import WhiteContainerMargin from "../../Frame/WhiteContainer/WhiteContainerMargin";

import RoomElement from "./RoomElement";
import RoomEntry from "../../Frame/RoomEntry/RoomEntry";

import Footer from "../../Frame/Footer";
import Title from "../../Frame/Title/Title";

import axios from "../../Tool/axios";

import svgMyRoom from "../../Frame/NavigationIcon/chat_selected.svg";

const Myroom = (props) => {
  const [myRoomList, setRoomList] = useState([]);

  const getUserRoom = async () => {
    const userRoom = await axios.get("rooms/searchByUser");
    setRoomList(userRoom.data);
  };

  useEffect(() => {
    getUserRoom();
  });

  return (
    <div className="myroom">
      <div style={{ height: "20px" }} />
      <Title img={svgMyRoom}>내 방 리스트</Title>
      <div style={{ height: "20px" }} />

      {/* <WhiteContainer title="탑승 예정 택시" padding="11px">
        <RoomEntry
          title="서울 같이 가요~"
          participants="2"
          head="김넙죽"
          from="택시승강장"
          to="시외버스터미널"
          date="2021년 7월 20일 09시 00분"
        />
      </WhiteContainer>
      <WhiteContainer title="탑승 예정 택시" padding="11px">
        <RoomEntry
          title="둔산 갑니다"
          participants="1"
          head="박야옹"
          from="택시승강장"
          to="갤러리아"
          date="2021년 7월 20일 17시 30분"
        />
      </WhiteContainer>
      <WhiteContainer title="탑승 예정 택시" padding="11px">
        <RoomEntry
          title="대전역 ㄱ"
          participants="3"
          head="이거위"
          from="오리연못"
          to="대전역"
          date="2021년 7월 20일 09시 30분"
        />
      </WhiteContainer> */}
      {myRoomList.map((item, index) => (
        <WhiteContainer key={index} title="탑승 예정 택시" padding="11px">
          <RoomEntry
            title={item.name}
            participants={item.part.length}
            head={item.part[0]}
            from={item.from}
            to={item.to}
            date={item.time}
          />
        </WhiteContainer>
      ))}
      {/* <WhiteContainer title="탑승 예정 택시">
          <RoomElement
            title="12월 8일 오후 12시 택시팟 찾아요~"
            subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
            partLen={3}
            partImgs={[]}
          />
        </WhiteContainer>
        <WhiteContainer title="탑승 예정 택시">
          <RoomElement
            title="12월 8일 오후 12시 택시팟 찾아요~"
            subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
            partLen={4}
            partImgs={[]}
          />
          <RoomElement
            title="술박스"
            subtitle="카이스트 > 터미널, 오후 4시 0분 출발"
            partLen={5}
            partImgs={[]}
          />
        </WhiteContainer> */}
      <WhiteContainerMargin />
      <WhiteContainer title="과거 탑승 택시">
        <RoomElement
          title="12월 8일 오후 12시 택시팟 찾아요~"
          subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
          partLen={1}
          partImgs={[]}
        />
        <RoomElement
          title="술박스"
          subtitle="카이스트 > 터미널, 오후 4시 0분 출발"
          partLen={3}
          partImgs={[]}
        />
      </WhiteContainer>
      <Footer />
    </div>
  );
};

export default Myroom;
