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
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";

const ChatHeader = (props) => {
  const [headerInfToken, setHeaderInfToken] = useState(Date.now().toString());
  const [, headerInfo] = useTaxiAPI.get(
    `/rooms/v2/info?id=${props.roomId}`,
    {},
    [headerInfToken]
  );

  return (
    <ChatHeaderBody
      info={headerInfo}
      recallEvent={() => setHeaderInfToken(Date.now().toString())}
    />
  );
};

ChatHeader.propTypes = {
  roomId: PropTypes.string,
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

  return (
    <>
      <RLayout.R2
        left={
          <>
            <div ref={refTitle}>
              <Title
                icon="myroom"
                header
                marginAuto
                R2={props.roomId !== undefined}
              >
                내 방 보기
              </Title>
            </div>
            <div style={{ margin: "0 -4px", padding: "0 4px" }}>
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
              <WhiteContainer padding="20px 20px 22px" margin="0px 0px -15px">
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
            </div>
          </>
        }
        right={props.roomId ? <></> : null}
      />
      {props.roomId ? (
        <div
          style={{
            position: "fixed",
            width: "min(390px, calc(50% - 27.5px))",
            top: 20,
            left: "calc(50% + 7.5px)",
            height: "calc(100vh - 20px - 56px - 15px)",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
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
                  <UnfoldLessRoundedIcon
                    style={{ color: theme.purple, ...theme.cursor() }}
                    onClick={() => setHeaderOpen(false)}
                  />
                ) : (
                  <UnfoldMoreRoundedIcon
                    style={{ color: theme.purple, ...theme.cursor() }}
                    onClick={() => setHeaderOpen(true)}
                  />
                )}
              </div>
              {isHeaderOpen && (
                <>
                  <DottedLine direction="row" margin="16px 0" />
                  <ChatHeader roomId={props.roomId} />
                </>
              )}
            </WhiteContainer>
          </div>
          <div style={{ height: "100%", minHeight: 0 }}>
            <WhiteContainer padding="0px" style={{ height: "100%", zIndex: 0 }}>
              <SideChat roomId={props.roomId} />
            </WhiteContainer>
          </div>
        </div>
      ) : null}
    </>
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
