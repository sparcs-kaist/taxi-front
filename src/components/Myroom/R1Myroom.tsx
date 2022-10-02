import React from "react";
import { Link } from "react-router-dom";
import Title from "components/common/Title";
import Room from "components/common/room/Room";
import RLayout from "components/common/RLayout";
import Pagination, {
  PAGE_MAX_ITEMS,
} from "components/common/pagination/Pagination";
import PropTypes from "prop-types";

const R1Myroom = (props) => {
  const styleEmpty = {
    color: "#888888",
    fontSize: "14px",
    lineHeight: "109px",
    textAlign: "center",
    height: "109px",
  };

  return (
    <RLayout.R1>
      <Title icon="current" header={true}>
        참여 중인 방
      </Title>
      {props.ongoing.length === 0 ? (
        <div style={styleEmpty}>참여 중인 방이 없습니다.</div>
      ) : (
        <>
          {props.ongoing
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
                  theme="white"
                  marginBottom="15px"
                />
              </Link>
            ))}
          <Pagination
            totalPages={props.ongoingPageInfo.totalPages}
            currentPage={props.ongoingPageInfo.currentPage}
            onClickPage={props.ongoingPageClickHandler}
            onClickPrev={props.ongoingPrevPageHandler}
            onClickNext={props.ongoingNextPageHandler}
            isMobile
          />
        </>
      )}
      <Title icon="past" header={true}>
        과거 참여 방
      </Title>
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
                  theme="white"
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
            isMobile
          />
        </>
      )}
    </RLayout.R1>
  );
};

R1Myroom.propTypes = {
  roomId: PropTypes.string,
  ongoing: PropTypes.array,
  done: PropTypes.array,
  ongoingPageInfo: PropTypes.object,
  donePageInfo: PropTypes.object,
  ongoingPageClickHandler: PropTypes.func,
  donePageClickHandler: PropTypes.func,
  ongoingNextPageHandler: PropTypes.func,
  doneNextPageHandler: PropTypes.func,
  ongoingPrevPageHandler: PropTypes.func,
  donePrevPageHandler: PropTypes.func,
};
R1Myroom.defaultProps = {
  ongoing: [],
  done: [],
};

export default R1Myroom;
