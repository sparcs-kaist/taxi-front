import React, { useEffect, useState } from "react";

import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Title from "../../Frame/Title/Title";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import Room from "../Room/RoomElement1";
import axios from "../../Tool/axios";

import svgRoom from "./svg_room.svg";

const Myroom = () => {
  const reactiveState = RLayout.useR2state();
  const chatRoomId = useState(null);

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
        <Title img={svgRoom} marginAuto={false} paddingTop="0px">
          참여 중인 방
        </Title>

        <div style={{ height: "7px" }} />
        <div style={styleLine} />
        <div style={{ height: "20px" }} />

        <Room
          name="서울 같이 가요~"
          left={2}
          creator="김넙죽"
          origin="택시승강장"
          destination="시외버스터미널"
        />
        <div style={{ height: "10px" }} />
        <Room
          name="서울 같이 가요~"
          left={2}
          creator="김넙죽"
          origin="택시승강장"
          destination="시외버스터미널"
        />
      </WhiteContainer>
    </div>
  );
  const rightLay = (
    <div>
      <WhiteContainer marginAuto={false} padding="20px">
        <Title img={svgRoom} marginAuto={false} paddingTop="0px">
          채팅 창
        </Title>
      </WhiteContainer>
    </div>
  );
  return (
    <div>
      <div style={{ height: "30px" }} />
      <Title img={svgRoom}>내 방 리스트</Title>
      <div style={{ height: "20px" }} />
      <RLayout.R2 priority="left" left={leftLay} right={rightLay} />
    </div>
  );
};

export default Myroom;
