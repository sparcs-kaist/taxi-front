import { useState } from "react";
import Room from "components/room/Room";
import Empty from "components/Empty";
import RoomSelectionModal from "pages/Search/RoomSelectionModal";
import Pagination, { PAGE_MAX_ITEMS } from "components/pagination/Pagination";
import usePageFromSearchParams from "hooks/usePageFromSearchParams";

type RoomListProps = {
  rooms: Nullable<Array<any>>;
};

const RoomList = (props: RoomListProps) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const totalPages = Math.ceil((props.rooms ?? []).length / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);
  return (
    <>
      <RoomSelectionModal
        isOpen={!!selectedRoom}
        onClose={() => {
          setSelectedRoom(null);
        }}
        roomInfo={selectedRoom}
      />
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
                onClick={() => {
                  setSelectedRoom(room);
                }}
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
