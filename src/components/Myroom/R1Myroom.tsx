import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import Title from "components/common/Title";
import Room from "components/common/room/Room";
import RLayout from "components/common/RLayout";
import Pagination, {
  PAGE_MAX_ITEMS,
} from "components/common/pagination/Pagination";
import PropTypes from "prop-types";

/**
 * TODO
 * - R2Myroom도 props가 같기 때문에 이 타입은 Myroom에서 export한 후 import해서 쓰기
 * - 전역으로 DB 스키마 타입 추가하기 (현재는 ongoing, done을 Array<any>로 정의)
 */
type R1MyroomProps = {
  roomId: string;
  ongoing: Array<any>;
  done: Array<any>;
  donePageInfo: { totalPages: number; currentPage: number };
  donePageClickHandler: (page: number) => void;
  donePrevPageHandler: () => void;
  doneNextPageHandler: () => void;
};

const R1Myroom = (props: R1MyroomProps) => {
  const styleEmpty: CSSProperties = {
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
        props.ongoing.map((item) => (
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
        ))
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
  donePageInfo: PropTypes.object,
  donePageClickHandler: PropTypes.func,
  doneNextPageHandler: PropTypes.func,
  donePrevPageHandler: PropTypes.func,
};
R1Myroom.defaultProps = {
  ongoing: [],
  done: [],
};

export default R1Myroom;
