import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import useDateToken from "hooks/useDateToken";
import { useQuery } from "hooks/useTaxiAPI";

import DottedLine from "components/DottedLine";
import Empty from "components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "components/Pagination";
import RLayout from "components/RLayout";
import Room from "components/Room";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";
import ChatHeaderBody from "pages/Chatting/Header/HeaderBody";
import SideChat from "pages/Chatting/SideChat";

import theme from "tools/theme";

import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

const ChatHeader = (props) => {
  const [headerInfoToken, fetchHeaderInfoToken] = useDateToken();
  const [, headerInfo] = useQuery.get(`/rooms/info?id=${props.roomId}`, {}, [
    headerInfoToken,
  ]);

  return (
    <ChatHeaderBody info={headerInfo} recallEvent={fetchHeaderInfoToken} />
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
  const [isHeaderOpen, setHeaderOpen] = useState(true);

  return (
    <>
      <RLayout.R2
        left={
          <>
            <Title
              icon="myroom"
              header
              marginAuto
              R2={props.roomId !== undefined}
            >
              내 방 보기
            </Title>
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
              <WhiteContainer padding="20px 20px 22px" margin="0px 0px -17px">
                <Title icon="past">과거 참여 방</Title>
                <div style={{ height: "19px" }} />
                <DottedLine direction="row" />
                {props.done.length === 0 ? (
                  <Empty screen="pc">과거 참여했던 방이 없습니다</Empty>
                ) : (
                  <div>
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
                    />
                  </div>
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
          <WhiteContainer padding="16px" style={{ flex: "0 0 auto" }}>
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
