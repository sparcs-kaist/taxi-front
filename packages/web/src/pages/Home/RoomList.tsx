import { Link } from "react-router-dom";

import usePageFromSearchParams from "@/hooks/usePageFromSearchParams";
import useRoomListAnimationState from "@/hooks/useRoomListAnimationState";

import Empty from "@/components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "@/components/Pagination";
import Room from "@/components/Room";
import AnimatedRoom from "@/components/Room/AnimatedRoom";

type RoomListProps = {
  rooms: Nullable<Array<any>>;
  initialLoad: boolean;
  triggerTags?: Nullable<string[]>;
};

const RoomList = (props: RoomListProps) => {
  const totalPages = Math.ceil((props.rooms ?? []).length / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);
  const { localRooms } = useRoomListAnimationState(props.rooms);

  return (
    <>
      {localRooms?.length ? (
        <>
          {localRooms
            ?.slice(
              PAGE_MAX_ITEMS * (currentPage - 1),
              PAGE_MAX_ITEMS * currentPage
            )
            .map((room) => (
              <Link
                key={room._id}
                to={`/home/${room._id}?page=${currentPage}&triggerTags=${props.triggerTags?.join(",")}`}
                replace
                style={{ textDecoration: "none" }}
              >
                {props.initialLoad ? (
                  <AnimatedRoom
                    data={room}
                    marginBottom="15px"
                    type={room.type}
                  />
                ) : (
                  <Room data={room} marginBottom="15px" />
                )}
              </Link>
            ))}
          {localRooms.length > PAGE_MAX_ITEMS && (
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
