import React, { Component } from "react";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import WhiteContainerMargin from "../../Frame/WhiteContainer/WhiteContainerMargin";
import RoomElement from "./RoomElement";
import Footer from "../../Frame/Footer";

class Myroom extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <WhiteContainer title="탑승 예정 택시">
          <RoomElement
            title="12월 8일 오후 12시 택시팟 찾아요~"
            subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
            partLen={1}
            partImgs={[]}
          />
          <RoomElement
            title="12월 8일 오후 12시 택시팟 찾아요~"
            subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
            partLen={2}
            partImgs={[]}
          />
          <RoomElement
            title="12월 8일 오후 12시 택시팟 찾아요~"
            subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
            partLen={3}
            partImgs={[]}
          />
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
        </WhiteContainer>
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
      </>
    );
  }
}

export default Myroom;
