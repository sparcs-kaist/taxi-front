import { Link } from "react-router-dom";

import usePageFromSearchParams from "hooks/usePageFromSearchParams";

import Empty from "components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "components/Pagination";
import Room from "components/Room";

type RoomListProps = {
  rooms: Nullable<Array<any>>;
};

const RoomList = (props: RoomListProps) => {
  const totalPages = Math.ceil((props.rooms ?? []).length / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);

  return (
    <>
      {props.rooms?.length ? (
        <>
          {props.rooms
            ?.slice(
              PAGE_MAX_ITEMS * (currentPage - 1),
              PAGE_MAX_ITEMS * currentPage
            )
            .map((room) => (
              <Link
                key={room._id}
                to={`/home/${room._id}?page=${currentPage}`}
                replace
                style={{ textDecoration: "none" }}
              >
                <Room data={room} marginBottom="15px" />
              </Link>
            ))}
          {props.rooms.length > PAGE_MAX_ITEMS && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              isMobile
            />
          )}
        </>
      ) : (
        <Empty type="mobile" css={{ marginBottom: "15px" }}>
          해당 요일에 개설된 방이 없습니다
        </Empty>
      )}
    </>
  );
};

export default RoomList;
