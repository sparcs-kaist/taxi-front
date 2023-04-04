import usePageFromSearchParams from "hooks/usePageFromSearchParams";

import Empty from "components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "components/Pagination";
import Room from "components/Room";
import { useHistory } from "react-router-dom";

type RoomListProps = {
  rooms: Nullable<Array<any>>;
};

const RoomList = (props: RoomListProps) => {
  const totalPages = Math.ceil((props.rooms ?? []).length / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);
  const history = useHistory();

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
              <Room
                key={room._id}
                data={room}
                marginBottom="15px"
                onClick={() => history.replace(`/home/${room._id}`)}
              />
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
        <Empty screen="mobile">해당 요일에 개설된 방이 없습니다</Empty>
      )}
    </>
  );
};

export default RoomList;
