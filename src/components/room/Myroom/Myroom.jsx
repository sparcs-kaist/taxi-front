import React, { useEffect, useState } from "react";

import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import BackgroundPurpleContainer from "../../Frame/BackgroundPurpleContainer/BackgroundPurpleContainer";
import RoomEntry from "../../Frame/RoomEntry/RoomEntry";
import ChatRoomInfo from "./ChatRoomInfo";
import Footer from "../../Frame/Footer";
import Title from "../../Frame/Title/Title";

import axios from "../../Tool/axios";

import ArrowRightAltIcon from "./ArrowRightAltIcon.svg";
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
  const [clickedRoomInfo, setClickedRoomInfo] = useState();

  const getUserRoom = async () => {
    const userRoom = await axios.get("rooms/searchByUser");
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
    if (current) {
      newArr[idx] = true;
      setClickedRoomInfo(currentRoomList[idx]);
    } else {
      newArr[currentRoomList.length + idx] = true;
      setClickedRoomInfo(pastRoomList[idx]);
    }
    setRoomClicked(newArr);
  };

  const resizeStyleMain = () => {
    if (bodyWidth >= 768) return { width: "718px", margin: "auto" };
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
          <Title img={svgMyRoom} marginAuto={false}>
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
            <WhiteContainer title="참여 중인 방" marginAuto={false}>
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
            </WhiteContainer>
            <WhiteContainer title="과거 참여 방" marginAuto={false}>
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
            <WhiteContainer marginAuto={false} marginBottom="15px">
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
            </WhiteContainer>

            <WhiteContainer
              marginAuto={false}
              marginBottom="15px"
              padding="16px"
            >
              <ChatRoomInfo roomInfo={clickedRoomInfo}></ChatRoomInfo>
            </WhiteContainer>
            <WhiteContainer padding="0px" marginAuto={false}>
              <div className="chatTop">
                <div
                  style={
                    clickedRoomInfo
                      ? {
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }
                      : {
                          display: "none",
                        }
                  }
                >
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
                      {clickedRoomInfo ? clickedRoomInfo.name : ""}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "12px",
                        lineHeight: "14px",
                      }}
                    >
                      <div>{clickedRoomInfo ? clickedRoomInfo.from : ""}</div>
                      <img
                        src={ArrowRightAltIcon}
                        style={{ padding: "0px 6px" }}
                      />
                      <div>{clickedRoomInfo ? clickedRoomInfo.to : ""}</div>
                    </div>
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
  /* <WhiteContainer title="탑승 예정 택시" padding="11px" marginAuto={ false }>
        <RoomEntry
          title="서울 같이 가요~"
          participants="2"
          head="김넙죽"
          from="택시승강장"
          to="시외버스터미널"
          date="2021년 7월 20일 09시 00분"
        />
      </WhiteContainer>
      <WhiteContainer title="탑승 예정 택시" padding="11px" marginAuto={ false }>
        <RoomEntry
          title="둔산 갑니다"
          participants="1"
          head="박야옹"
          from="택시승강장"
          to="갤러리아"
          date="2021년 7월 20일 17시 30분"
        />
      </WhiteContainer>
      <WhiteContainer title="탑승 예정 택시" padding="11px" marginAuto={ false }>
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
