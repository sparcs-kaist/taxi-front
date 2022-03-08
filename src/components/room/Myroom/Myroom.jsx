import React, { useEffect, useState } from "react";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import BackgroundPurpleContainer from "../../Frame/BackgroundPurpleContainer/BackgroundPurpleContainer";

import RoomEntry from "../../Frame/RoomEntry/RoomEntry";

import Footer from "../../Frame/Footer";
import Title from "../../Frame/Title/Title";

import axios from "../../Tool/axios";

import svgMyRoom from "../../Frame/NavigationIcon/chat_selected.svg";

import "./Myroom.css";

const Myroom = (props) => {
  const [currentRoomList, setCurrentRoomList] = useState([]);
  const [pastRoomList, setPastRoomList] = useState([]);
  const [bodyWidth, setBodyWidth] = useState(document.body.clientWidth);

  const getUserRoom = async () => {
    const userRoom = await axios.get("rooms/searchByUser");
    console.log(userRoom.data);
    setCurrentRoomList(userRoom.data.ongoing);
    setPastRoomList(userRoom.data.done);
  };

  useEffect(() => {
    getUserRoom();

    const resizeEvent = () => {
      const _bodyWidth = document.body.clientWidth;
      if (bodyWidth != _bodyWidth) setBodyWidth(_bodyWidth);
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  const styleMain = {
    width: bodyWidth >= 1440 ? "1400px" : "calc(100% - 40px)",
    margin: "auto",
  };
  const styleLeft = {
    width: bodyWidth >= 605 ? "calc(50% - 7.5px)" : "100%",
  };
  const styleRight = {
    width: bodyWidth >= 720 ? "calc(50% - 10px)" : "0px",
    display: bodyWidth >= 720 ? "block" : "none",
  };

  return (
    <div className="myroom">
      <div
        className="ND"
        style={{ display: "flex", flexDirection: "column", ...styleMain }}
      >
        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Title img={svgMyRoom} unmargin>
            내 방 리스트
          </Title>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Left Layout */}
          <div style={styleLeft}>
            <WhiteContainer title="참여 중인 방" padding="20px" layAuto={false}>
              <div className="subCategoryTitle">참여 중인 방</div>
              <div className="dashedLine"></div>

              <BackgroundPurpleContainer title="_" padding="11px">
                <RoomEntry
                  title="서울 같이 가요~"
                  participants={2}
                  head="김넙죽"
                  from="택시승강장"
                  to="시외버스터미널"
                  date="2021년 7월 20일 오전 9시 00분"
                />
              </BackgroundPurpleContainer>

              <BackgroundPurpleContainer title="_" padding="11px">
                <RoomEntry
                  title="둔산 갑니다"
                  participants={1}
                  head="박야옹"
                  from="택시승강장"
                  to="갤러리아"
                  date="2021년 7월 20일 오후 5시 30분"
                />
              </BackgroundPurpleContainer>
            </WhiteContainer>
            <WhiteContainer title="과거 참여 방" padding="20px" layAuto={false}>
              <div className="subCategoryTitle">과거 참여 방</div>
              <div className="dashedLine"></div>
              {pastRoomList.map((item, index) => (
                <BackgroundPurpleContainer key={index} title="_" padding="11px">
                  <RoomEntry
                    title={item.name}
                    participants={item.part.length}
                    head={item.part[0].nickname}
                    from={item.from}
                    to={item.to}
                    date={item.time}
                  />
                </BackgroundPurpleContainer>
              ))}
            </WhiteContainer>
            <div style={{ width: "15px" }}></div>
          </div>

          {/* Right Layout */}
          <div style={styleRight}>
            <WhiteContainer layAuto={false}>
              {/* Title */}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={svgMyRoom} />
                <div
                  style={{
                    marginLeft: "8.85px",
                    lineHeight: "23px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#6E3678",
                  }}
                >
                  채팅 창
                </div>
              </div>
              <div className="dashedLine"></div>
              <div style={{ minHeight: "600px" }}></div>
            </WhiteContainer>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
{
  /* <WhiteContainer title="탑승 예정 택시" padding="11px" layAuto={ false }>
        <RoomEntry
          title="서울 같이 가요~"
          participants="2"
          head="김넙죽"
          from="택시승강장"
          to="시외버스터미널"
          date="2021년 7월 20일 09시 00분"
        />
      </WhiteContainer>
      <WhiteContainer title="탑승 예정 택시" padding="11px" layAuto={ false }>
        <RoomEntry
          title="둔산 갑니다"
          participants="1"
          head="박야옹"
          from="택시승강장"
          to="갤러리아"
          date="2021년 7월 20일 17시 30분"
        />
      </WhiteContainer>
      <WhiteContainer title="탑승 예정 택시" padding="11px" layAuto={ false }>
        <RoomEntry
          title="대전역 ㄱ"
          participants="3"
          head="이거위"
          from="오리연못"
          to="대전역"
          date="2021년 7월 20일 09시 30분"
        />
      </WhiteContainer> */
}

export default Myroom;
