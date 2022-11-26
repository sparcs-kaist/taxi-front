import React, { useState } from "react";
import Room from "components/common/room/Room";
import Empty from "components/common/Empty";

type RoomListProps = {
  rooms: Nullable<Array<any>>;
};

const RoomList = (props: RoomListProps) => {
  return (
    <>
      {props.rooms?.length ? (
        props.rooms?.map((room) => {
          return <Room key={room.id} data={room} marginBottom="15px" />;
        })
      ) : (
        <Empty screen="mobile">해당 요일에 개설된 방이 없습니다</Empty>
      )}
    </>
  );
};

export default RoomList;
