import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Chat from "@/components/Chat";
import DottedLine from "@/components/DottedLine";
import Empty from "@/components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "@/components/Pagination";
import Room from "@/components/Room";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const LinkRoom = (props) => {
  const history = useHistory();

  return props.currentId === props.id ? (
    <div onClick={() => history.goBack()}>{props.children}</div>
  ) : (
    <Link
      to={(location) => ({
        ...location,
        pathname: `/myroom/${props.id}`,
      })}
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
    <AdaptiveDiv
      type="butterfly"
      left={
        <>
          <Title icon="myroom" isHeader>
            내 방 보기
          </Title>
          <div css={{ margin: "0 -4px", padding: "0 4px" }}>
            <WhiteContainer css={{ padding: "20px 20px 22px" }}>
              <Title icon="current">참여 중인 방</Title>
              <div css={{ height: "19px" }} />
              <DottedLine direction="row" />
              {props.ongoing.length === 0 ? (
                <Empty type="pc">참여 중인 방이 없습니다</Empty>
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
            <WhiteContainer
              css={{ padding: "20px 20px 22px", margin: "0 0 -17px" }}
            >
              <Title icon="past">과거 참여 방</Title>
              <div css={{ height: "19px" }} />
              <DottedLine direction="row" />
              {props.done.length === 0 ? (
                <Empty type="pc">과거 참여했던 방이 없습니다</Empty>
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
            css={{
              position: "fixed",
              width: "min(390px, calc(50% - 27.5px))",
              top: "max(calc(79px - var(--window-scroll-y)), 15px)",
              left: "calc(50% + 7.5px)",
              height:
                "calc(var(--window-inner-height) - max(calc(79px - var(--window-scroll-y)), 15px) - 56px - 15px - env(safe-area-inset-bottom))",
              zIndex: theme.zIndex_nav - 1,
            }}
          >
            <WhiteContainer css={{ padding: "0", height: "100%" }}>
              <Chat roomId={props.roomId} layoutType="sidechat" />
            </WhiteContainer>
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
