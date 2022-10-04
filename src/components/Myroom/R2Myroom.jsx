import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Title from "components/common/Title";
import WhiteContainer from "components/common/WhiteContainer";
import ChatHeaderBody from "components/Chatting/Header/HeaderBody";
import SideChat from "components/Chatting/SideChat";
import Room from "components/common/room/Room";
import Pagination, {
  PAGE_MAX_ITEMS,
} from "components/common/pagination/Pagination";
import RLayout from "components/common/RLayout";
import useTaxiAPI from "hooks/useTaxiAPI";
import PropTypes from "prop-types";
import DottedLine from "components/common/DottedLine";

const ChatHeader = (props) => {
  const [headerInfToken, setHeaderInfToken] = useState(Date.now().toString());
  const [, headerInfo] = useTaxiAPI.get(
    `/rooms/v2/info?id=${props.roomId}`,
    {},
    [headerInfToken]
  );

  useEffect(() => {
    props.resizeEvent();
  }, [headerInfo]);

  const recallEvent = () => {
    setHeaderInfToken(Date.now().toString());
    props.recallEvent();
  };

  return (
    <div>
      <div style={{ height: "19px" }} />
      <ChatHeaderBody info={headerInfo} recallEvent={recallEvent} />
    </div>
  );
};

ChatHeader.propTypes = {
  roomId: PropTypes.string,
  resizeEvent: PropTypes.func,
  recallEvent: PropTypes.func,
};

const R2Myroom = (props) => {
  const refTitle = useRef();
  const refHeader = useRef();

  const bodyHeightRef = useRef("0px");
  const [bodyHeight, setBodyHeight] = useState(bodyHeightRef.current);
  const chatHeightRef = useRef("0px");
  const [chatHeight, setChatHeight] = useState(chatHeightRef.current);

  const styleEmpty = {
    color: "#888888",
    fontSize: "14px",
    lineHeight: "109px",
    textAlign: "center",
    height: "109px",
  };

  const resizeEvent = () => {
    try {
      const height1 = refTitle.current.clientHeight;
      const height2 = document.getElementById("navigation-body").clientHeight;
      const height3 = refHeader.current.clientHeight;
      const height4 = document.body.clientHeight;

      const newHeight = `${height4 - height1 - height2}px`;
      if (bodyHeightRef.current !== newHeight) {
        bodyHeightRef.current = newHeight;
        setBodyHeight(newHeight);
      }

      const newChatHeight = `${height4 - height1 - height2 - height3 - 30}px`;
      if (chatHeightRef.current !== newChatHeight) {
        chatHeightRef.current = newChatHeight;
        setChatHeight(newChatHeight);
      }
    } catch (e) {
      console.log(e);
      // FIXME
    }
  };
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, [props.roomId]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "calc(100% - 50px)",
      }}
    >
      <div ref={refTitle}>
        <Title icon="myroom" header={true} marginAuto={true}>
          내 방 리스트
        </Title>
      </div>
      <div
        style={{
          height: bodyHeight,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <RLayout.R2
          priority="left"
          left={
            <div style={{ height: bodyHeight, overflow: "auto" }}>
              <WhiteContainer padding="20px 20px 22px">
                <Title icon="current">참여 중인 방</Title>
                <div style={{ height: "19px" }} />
                <DottedLine direction="row" />
                {props.ongoing.length === 0 ? (
                  <div style={styleEmpty}>참여 중인 방이 없습니다.</div>
                ) : (
                  props.ongoing
                    .slice(
                      PAGE_MAX_ITEMS * (props.ongoingPageInfo.currentPage - 1),
                      PAGE_MAX_ITEMS * props.ongoingPageInfo.currentPage
                    )
                    .map((item) => (
                      <Link
                        key={item._id}
                        to={`/myroom/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Room
                          data={item}
                          selected={props.roomId === item._id}
                          theme="purple"
                          marginTop="15px"
                        />
                      </Link>
                    ))
                )}
              </WhiteContainer>
              <WhiteContainer padding="20px 20px 22px">
                <Title icon="past">과거 참여 방</Title>
                <div style={{ height: "19px" }} />
                <DottedLine direction="row" />
                {props.done.length === 0 ? (
                  <div style={styleEmpty}>과거 참여했던 방이 없습니다.</div>
                ) : (
                  <>
                    {props.done
                      .slice(
                        PAGE_MAX_ITEMS * (props.donePageInfo.currentPage - 1),
                        PAGE_MAX_ITEMS * props.donePageInfo.currentPage
                      )
                      .map((item) => (
                        <Link
                          key={item._id}
                          to={`/myroom/${item._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Room
                            data={item}
                            selected={props.roomId === item._id}
                            theme="purple"
                            marginTop="15px"
                          />
                        </Link>
                      ))}
                    <Pagination
                      totalPages={props.donePageInfo.totalPages}
                      currentPage={props.donePageInfo.currentPage}
                      onClickPage={props.donePageClickHandler}
                      onClickPrev={props.donePrevPageHandler}
                      onClickNext={props.doneNextPageHandler}
                    />
                  </>
                )}
              </WhiteContainer>
              <div style={{ height: "50px" }} />
            </div>
          }
          right={
            <div>
              <div ref={refHeader}>
                <WhiteContainer padding="20px">
                  <Title icon="chat">채팅 창</Title>
                  <div style={{ height: "19px" }} />
                  <DottedLine direction="row" />
                  {props.roomId ? (
                    <ChatHeader
                      roomId={props.roomId}
                      resizeEvent={resizeEvent}
                      recallEvent={props.recallEvent}
                    />
                  ) : (
                    <div style={styleEmpty}>방을 선택하세요.</div>
                  )}
                </WhiteContainer>
              </div>
              {props.roomId ? (
                <WhiteContainer padding="0px">
                  <div style={{ height: chatHeight, position: "relative" }}>
                    <SideChat roomId={props.roomId} />
                  </div>
                </WhiteContainer>
              ) : null}
            </div>
          }
        />
      </div>
    </div>
  );
};

R2Myroom.propTypes = {
  roomId: PropTypes.string,
  ongoing: PropTypes.array,
  done: PropTypes.array,
  recallEvent: PropTypes.func,
  ongoingPageInfo: PropTypes.object,
  donePageInfo: PropTypes.object,
  ongoingPageClickHandler: PropTypes.func,
  donePageClickHandler: PropTypes.func,
  ongoingNextPageHandler: PropTypes.func,
  doneNextPageHandler: PropTypes.func,
  ongoingPrevPageHandler: PropTypes.func,
  donePrevPageHandler: PropTypes.func,
};
R2Myroom.defaultProps = {
  ongoing: [],
  done: [],
};

export default R2Myroom;
