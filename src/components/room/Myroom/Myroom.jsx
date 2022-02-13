import React, { useEffect, useState } from "react";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import BackgroundPurpleContainer from "../../Frame/BackgroundPurpleContainer/BackgroundPurpleContainer";

import RoomEntry from "../../Frame/RoomEntry/RoomEntry";

import Footer from "../../Frame/Footer";
import Title from "../../Frame/Title/Title";

import axios from "../../Tool/axios";

import svgChatIcon from "./chatIcon.svg";
import arrowBackIcon from "./ArrowBack.svg";
import sendIcon from "./Send.svg";
import svgMyRoom from "../../Frame/NavigationIcon/chat_selected.svg";

import "./Myroom.css";

const Myroom = () => {
  const [currentRoomList, setCurrentRoomList] = useState([]);
  const [pastRoomList, setPastRoomList] = useState([]);
  const [bodyWidth, setBodyWidth] = useState(document.body.clientWidth);
  const [roomClicked, setRoomClicked] = useState([]);

  const getUserRoom = async () => {
    const userRoom = await axios.get("rooms/searchByUser");
    console.log(userRoom.data);
    setCurrentRoomList(userRoom.data.ongoing);
    setPastRoomList(userRoom.data.done);
    setRoomClicked(
      Array(userRoom.data.ongoing.length + userRoom.data.done.length).fill(
        false
      )
    );
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

  const handleClick = (current, idx) => {
    const newArr = Array(roomClicked.length).fill(false);
    if (current) newArr[idx] = true;
    else newArr[currentRoomList.length + idx] = true;
    setRoomClicked(newArr);
  };

  const resizeStyleMain = () => {
    if (bodyWidth >= 755) return { width: "755px", margin: "auto" };
    else return { width: "calc(100% - 50px)", margin: "auto" };
  };

  const styleMain = resizeStyleMain();
  const styleLeft = {
    width: bodyWidth >= 605 ? "calc(50% - 7.5px)" : "100%",
  };
  const styleRight = {
    width: bodyWidth >= 605 ? "calc(50% - 7.5px)" : "0px",
    display: bodyWidth >= 605 ? "block" : "none",
  };

  return (
    <div className="myroom">
      <div
        className="ND"
        style={{ display: "flex", flexDirection: "column", ...styleMain }}
      >
        <div style={{ paddingTop: "20px", paddingBottom: "10px" }}>
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
            <WhiteContainer title="참여 중인 방" layAuto={false}>
              <div className="subCategoryTitle">참여 중인 방</div>
              <div className="dashedLine" style={{ marginTop: "19px" }}></div>

              {currentRoomList.map((item, index) => (
                <BackgroundPurpleContainer
                  key={index}
                  title="_"
                  padding="11px"
                  isSelected={roomClicked[index]}
                >
                  <RoomEntry
                    title={item.name}
                    participants={item.part.length}
                    head={item.part[0].nickname}
                    from={item.from}
                    to={item.to}
                    date={item.time}
                    clickEvent={handleClick}
                    isCurrent={true}
                    elementIndex={index}
                    isSelected={roomClicked[index]}
                  />
                </BackgroundPurpleContainer>
              ))}

              {/* <BackgroundPurpleContainer title="_" padding="11px">
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
              </BackgroundPurpleContainer> */}
            </WhiteContainer>
            <WhiteContainer title="과거 참여 방" layAuto={false}>
              <div className="subCategoryTitle">과거 참여 방</div>
              <div className="dashedLine" style={{ marginTop: "19px" }}></div>
              {pastRoomList.map((item, index) => (
                <BackgroundPurpleContainer
                  key={index}
                  title="_"
                  padding="11px"
                  isSelected={roomClicked[currentRoomList.length + index]}
                >
                  <RoomEntry
                    title={item.name}
                    participants={item.part.length}
                    head={item.part[0].nickname}
                    from={item.from}
                    to={item.to}
                    date={item.time}
                    clickEvent={handleClick}
                    isCurrent={false}
                    elementIndex={index}
                    isSelected={roomClicked[currentRoomList.length + index]}
                  />
                </BackgroundPurpleContainer>
              ))}
            </WhiteContainer>
            <div style={{ width: "15px" }}></div>
          </div>

          {/* Right Layout */}
          <div style={styleRight}>
            <WhiteContainer layAuto={false} bottomMargin="15px">
              {/* Title */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "2px",
                  marginTop: "1px",
                }}
              >
                <img src={svgChatIcon} />
                <div
                  style={{
                    marginLeft: "10px",
                    lineHeight: "23px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#6E3678",
                  }}
                >
                  채팅 창
                </div>
              </div>

              {/* <div className="dashedLine" style={{ marginTop: "19px" }}></div>
              <div style={{ minHeight: "600px" }}></div> */}
            </WhiteContainer>

            <WhiteContainer layAuto={false} bottomMargin="15px" padding="16px">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "2px",
                }}
              >
                <div style={{ marginRight: "34px" }}>
                  <div style={{ marginBottom: "12px" }}>
                    <div className="roomInfo1">출발 시각 & 날짜</div>
                    <div className="roomInfo2" style={{ color: "#323232" }}>
                      2021. 7. 13. 오후 9시 45분
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <div className="roomInfo1">개설자</div>
                    <div className="roomInfo2" style={{ color: "#323232" }}>
                      어궁동 패티
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ marginRight: "12px" }}>
                      <div className="roomInfo1">정산 여부</div>
                      <div className="roomInfo2" style={{ color: "#6E3678" }}>
                        Yes
                      </div>
                    </div>
                    <div>
                      <div className="roomInfo1">결제자</div>
                      <div className="roomInfo2" style={{ color: "#6E3678" }}>
                        결제 미완료
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "6px",
                    }}
                  >
                    <div className="participantsImage"></div>
                    <div className="participantsNickname">어은동 불주먹</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "6px",
                    }}
                  >
                    <div className="participantsImage"></div>
                    <div className="participantsNickname">궁동 루피</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "6px",
                    }}
                  >
                    <div className="participantsImage"></div>
                    <div className="participantsNickname">봉명동 크롱</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div className="participantsImage"></div>
                    <div className="participantsNickname">
                      미쳐 날뛰는 어은동 패티
                    </div>
                  </div>
                </div>
              </div>
            </WhiteContainer>
            <WhiteContainer padding="0px" layAuto={false}>
              <div className="chatTop">
                <img
                  src={arrowBackIcon}
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
                <div className="chatRoomInfo">
                  <div
                    style={{
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "18px",
                      lineHeight: "21px",
                      letterSpacing: "0.03em",

                      marginBottom: "5px",
                    }}
                  >
                    서울 같이 가요~
                  </div>
                  <div
                    style={{
                      fontStyle: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      lineHeight: "14px",
                    }}
                  >
                    택시 승강장 - 시외버스터미널
                  </div>
                </div>
              </div>
              <div style={{ height: "414px", padding: "0px 18px" }}></div>
              <div className="chatBottom">
                <div className="chattingInput">채팅을 입력해주세요</div>
                <img
                  src={sendIcon}
                  style={{
                    position: "absolute",
                    top: "17.5px",
                    right: "17.5px",
                    width: "17.5px",
                    height: "15px",
                  }}
                />
              </div>
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
