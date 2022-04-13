import React, { useEffect, useState } from "react";

import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Title from "../../Frame/Title/Title";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import Room from "../Room/RoomElement1";
import axios from "../../Tool/axios";

import svgRoom from "./svg_room.svg";

const Myroom = () => {
  const leftLay = (
    <div>
      <WhiteContainer marginAuto={false}>
        <Title img={svgRoom} marginAuto={false}>
          참여 중인 방
        </Title>
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
      <WhiteContainer marginAuto={false}>
        <Title img={svgRoom} marginAuto={false}>
          채팅 창
        </Title>
      </WhiteContainer>
    </div>
  );
  return (
    <div>
      <div style={{ height: "30px" }} />
      <Title img={svgRoom}>내 방 리스트</Title>
      <RLayout.R2 left={leftLay} right={rightLay} />
    </div>
  );
};

export default Myroom;
