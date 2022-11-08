import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import theme from "styles/theme";

import Empty from "components/common/Empty";
import DottedLine from "components/common/DottedLine";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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
  };

  return <ChatHeaderBody info={headerInfo} recallEvent={recallEvent} />;
};

ChatHeader.propTypes = {
  roomId: PropTypes.string,
  resizeEvent: PropTypes.func,
};

const LinkRoom = (props) => {
  const history = useHistory();

  return props.currentId === props.id ? (
    <div onClick={() => history.goBack()}>{props.children}</div>
  ) : (
    <Link
      to={`/myroom/${props.id}`}
      replace={props.currentId ? true : false}
      style={{ textDecoration: "none" }}
    >
      {props.children}
    </Link>
  );
};

LinkRoom.propTypes = {
  currentId: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
};

const R2Myroom = (props) => {
  const refTitle = useRef();
  const refHeader = useRef();
  const [isHeaderOpen, setHeaderOpen] = useState(true);

  const bodyHeightRef = useRef("0px");
  const [bodyHeight, setBodyHeight] = useState(bodyHeightRef.current);
  const chatHeightRef = useRef("0px");
  const [chatHeight, setChatHeight] = useState(chatHeightRef.current);

  const resizeEvent = () => {
    try {
      const height1 = refTitle.current.clientHeight;
      const height2 = document.getElementById("navigation-body").clientHeight;
      const height3 = refHeader.current?.clientHeight;
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
  }, [props.roomId, isHeaderOpen]);

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "calc(100% - 50px)",
      }}
    >
      <div ref={refTitle}>
        <Title icon="myroom" header marginAuto R2={props.roomId !== undefined}>
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
                  <Empty screen="pc">참여 중인 방이 없습니다</Empty>
                ) : (
                  props.ongoing.map((item) => (
                    <LinkRoom
                      key={item._id}
                      currentId={props.roomId}
                      id={item._id}
                    >
                      <Room
                        data={item}
                        selected={props.roomId === item._id}
                        theme="purple"
                        marginTop="15px"
                      />
                    </LinkRoom>
                  ))
                )}
              </WhiteContainer>
              <WhiteContainer padding="20px 20px 22px">
                <Title icon="past">과거 참여 방</Title>
                <div style={{ height: "19px" }} />
                <DottedLine direction="row" />
                {props.done.length === 0 ? (
                  <Empty screen="pc">과거 참여했던 방이 없습니다</Empty>
                ) : (
                  <>
                    {props.done
                      .slice(
                        PAGE_MAX_ITEMS * (props.donePageInfo.currentPage - 1),
                        PAGE_MAX_ITEMS * props.donePageInfo.currentPage
                      )
                      .map((item) => (
                        <LinkRoom
                          key={item._id}
                          currentId={props.roomId}
                          id={item._id}
                        >
                          <Room
                            data={item}
                            selected={props.roomId === item._id}
                            theme="purple"
                            marginTop="15px"
                          />
                        </LinkRoom>
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
            props.roomId ? (
              <>
                <div ref={refHeader}>
                  <WhiteContainer padding="16px">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 4px 0 8px",
                      }}
                    >
                      <Title icon="chat">채팅 창</Title>
                      {isHeaderOpen ? (
                        <CloseRoundedIcon
                          style={{ color: theme.purple, ...theme.cursor() }}
                          onClick={() => setHeaderOpen(false)}
                        />
                      ) : (
                        <MenuRoundedIcon
                          style={{ color: theme.purple, ...theme.cursor() }}
                          onClick={() => setHeaderOpen(true)}
                        />
                      )}
                    </div>
                    {isHeaderOpen && (
                      <>
                        <DottedLine direction="row" margin="16px 0" />
                        <ChatHeader
                          roomId={props.roomId}
                          resizeEvent={resizeEvent}
                        />
                      </>
                    )}
                  </WhiteContainer>
                </div>
                <WhiteContainer padding="0px">
                  <div
                    style={{
                      height: chatHeight,
                      position: "relative",
                    }}
                  >
                    <SideChat roomId={props.roomId} />
                  </div>
                </WhiteContainer>
              </>
            ) : null
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
  donePageInfo: PropTypes.object,
  donePageClickHandler: PropTypes.func,
  doneNextPageHandler: PropTypes.func,
  donePrevPageHandler: PropTypes.func,
};
R2Myroom.defaultProps = {
  ongoing: [],
  done: [],
};

export default R2Myroom;
