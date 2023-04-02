import { Link } from "react-router-dom";

import Empty from "components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "components/Pagination";
import RLayout from "components/RLayout";
import Room from "components/Room";
import Title from "components/Title";

/**
 * @todo
 * - R2Myroom도 props가 같기 때문에 이 타입은 Myroom에서 export한 후 import해서 쓰기
 * - 전역으로 DB 스키마 타입 추가하기 (현재는 ongoing, done을 Array<any>로 정의)
 */
type R1MyroomProps = {
  roomId: string;
  ongoing: Array<any>;
  done: Array<any>;
  donePageInfo: { totalPages: number; currentPage: number };
};

const R1Myroom = ({
  roomId,
  ongoing = [],
  done = [],
  donePageInfo,
}: R1MyroomProps) => (
  <RLayout.R1>
    <Title icon="current" header>
      참여 중인 방
    </Title>
    {ongoing.length === 0 ? (
      <Empty screen="mobile">참여 중인 방이 없습니다</Empty>
    ) : (
      ongoing.map((item) => (
        <Link
          key={item._id}
          to={`/myroom/${item._id}`}
          style={{ textDecoration: "none" }}
        >
          <Room
            data={item}
            selected={roomId === item._id}
            theme="white"
            marginBottom="15px"
          />
        </Link>
      ))
    )}
    <Title icon="past" header>
      과거 참여 방
    </Title>
    {done.length === 0 ? (
      <Empty screen="mobile">과거 참여했던 방이 없습니다</Empty>
    ) : (
      <>
        {done
          .slice(
            PAGE_MAX_ITEMS * (donePageInfo.currentPage - 1),
            PAGE_MAX_ITEMS * donePageInfo.currentPage
          )
          .map((item) => (
            <Link
              key={item._id}
              to={`/myroom/${item._id}`}
              style={{ textDecoration: "none" }}
            >
              <Room
                data={item}
                selected={roomId === item._id}
                theme="white"
                marginTop="15px"
              />
            </Link>
          ))}
        <Pagination
          totalPages={donePageInfo.totalPages}
          currentPage={donePageInfo.currentPage}
          isMobile
        />
      </>
    )}
  </RLayout.R1>
);

export default R1Myroom;
