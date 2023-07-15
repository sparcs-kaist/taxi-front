import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import useDateToken from "hooks/useDateToken";
import { useQuery } from "hooks/useTaxiAPI";

import { SideChat } from "components/Chatting";
import DottedLine from "components/DottedLine";
import Empty from "components/Empty";
import { ModalRoomShare } from "components/ModalPopup";
import Pagination, { PAGE_MAX_ITEMS } from "components/Pagination";
import RLayout from "components/RLayout";
import Room from "components/Room";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

const ChatHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [headerInfoToken, fetchHeaderInfo] = useDateToken();
  const [, headerInfo] = useQuery.get(`/rooms/info?id=${props.roomId}`, {}, [
    headerInfoToken,
  ]);

  return (
    <WhiteContainer padding="16px" style={{ flex: "0 0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 4px 0 8px",
        }}
      >
        <Title icon="chat">채팅 창</Title>
        <ShareRoundedIcon
          style={{
            color: theme.purple,
            marginLeft: "auto",
            marginRight: "12px",
            ...theme.cursor(),
            fontSize: "20px",
          }}
          onClick={() => setIsOpenShare(true)}
        />
        {isOpen ? (
          <UnfoldLessRoundedIcon
            style={{ color: theme.purple, ...theme.cursor() }}
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <UnfoldMoreRoundedIcon
            style={{ color: theme.purple, ...theme.cursor() }}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
      {isOpen && (
        <>
          <DottedLine direction="row" margin="16px 0" />
          {/* <ChatHeaderBody info={headerInfo} recallEvent={fetchHeaderInfo} /> TODO */}
        </>
      )}
      <ModalRoomShare
        isOpen={isOpenShare}
        onChangeIsOpen={setIsOpenShare}
        roomInfo={headerInfo}
      />
    </WhiteContainer>
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
  return (
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
      right={
        props.roomId ? (
          <div
            style={{
              position: "fixed",
              width: "min(390px, calc(50% - 27.5px))",
              top: "79px",
              left: "calc(50% + 7.5px)",
              height:
                "calc(var(--window-inner-height) - 79px - 56px - 15px - env(safe-area-inset-bottom))",
              display: "flex",
              flexDirection: "column",
              zIndex: theme.zIndex_nav - 1,
            }}
          >
            <ChatHeader roomId={props.roomId} />
            <div style={{ height: "100%", minHeight: 0 }}>
              <WhiteContainer padding="0px" style={{ height: "100%" }}>
                <SideChat roomId={props.roomId} />
              </WhiteContainer>
            </div>
          </div>
        ) : null
      }
    />
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
