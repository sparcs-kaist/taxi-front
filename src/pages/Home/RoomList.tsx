import { useEffect, useState } from "react";

import usePageFromSearchParams from "hooks/usePageFromSearchParams";

import Empty from "components/Empty";
import Pagination, { PAGE_MAX_ITEMS } from "components/Pagination";
import Room from "components/Room";
import RoomSelectionModal from "pages/Search/RoomSelectionModal";
import { useRecoilValue } from "recoil";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import { useHistory } from "react-router-dom";

type RoomListProps = {
  rooms: Nullable<Array<any>>;
  roomId: Nullable<any>;
};

const RoomList = (props: RoomListProps) => {
  console.log(props.roomId);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const totalPages = Math.ceil((props.rooms ?? []).length / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);
  const isLogin = !!useRecoilValue(loginInfoDetailAtom)?.id;
  const history = useHistory();

  useEffect(() => {
    setSelectedRoom(
      props.roomId && props.rooms?.find((room) => room._id === props.roomId)
    );
  }, [props.roomId, props.rooms]);

  return (
    <>
      <RoomSelectionModal
        isOpen={!!selectedRoom}
        onClose={() => {
          if (props.roomId) {
            history.push("/");
          }
          setSelectedRoom(null);
        }}
        roomInfo={selectedRoom}
        isLogin={isLogin}
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
