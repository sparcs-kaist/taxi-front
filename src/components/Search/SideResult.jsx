import React, { useState, useEffect } from "react";
import WhiteContainer from "components/common/WhiteContainer";
import Title from "components/common/Title";
import Room from "components/common/room/Room";
import RoomSelectionModal from "./RoomSelectionModal";
import PropTypes from "prop-types";

const sortOptions = {
  time: "time",
  leftPeopleNatural: "leftPeopleNatural", // 남은 인원 많은순
  leftPeopleReverse: "leftPeopleReverse", // 남은 인원 적은순
};

const SideResult = (props) => {
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [isIncludeFullRoom, setIsIncludeFullRoom] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptions.leftPeopleReverse);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (props.result === null) return;

    let roomsWithOptions = isIncludeFullRoom
      ? props.result
      : props.result.filter((room) => room.maxPartLength > room.part.length);

    // For stable sort
    roomsWithOptions.forEach((room, idx) => {
      room.idx = idx;
    });

    // 시간순 옵션일 경우 추가 정렬 필요 없음 (서버에서 정렬된 결과 반환)
    if (sortOption === sortOptions.leftPeopleNatural) {
      roomsWithOptions.sort((room1, room2) => {
        const room1Left = room1.maxPartLength - room1.part.length;
        const room2Left = room2.maxPartLength - room2.part.length;
        if (room1Left === room2Left) return room1.idx - room2.idx;
        return room1Left - room2Left;
      });
    } else if (sortOption === sortOptions.leftPeopleReverse) {
      roomsWithOptions.sort((room1, room2) => {
        const room1Left = room1.maxPartLength - room1.part.length;
        const room2Left = room2.maxPartLength - room2.part.length;
        if (room1Left === room2Left) return room1.idx - room2.idx;
        return room2Left - room1Left;
      });
    }
    setRooms(roomsWithOptions);
  }, [isIncludeFullRoom, sortOption, props.result]);

  const styleEmpty = {
    color: "#888888",
    fontWeight: "700",
    textAlign: "center",
    margin: "50px 0px 30px",
  };

  if (!props.mobile) {
    return (
      <div style={{ marginTop: 26 }}>
        <RoomSelectionModal
          isOpen={!!selectedRoomInfo}
          isMobile={false}
          onClose={() => {
            setSelectedRoomInfo(null);
          }}
          roomInfo={selectedRoomInfo}
        />
        <WhiteContainer marginAuto={false} padding="20px 20px 22px">
          <Title icon="search_result" marginAuto={false}>
            검색 결과
          </Title>
          {rooms.length == 0 ? (
            <div style={styleEmpty}>검색 결과가 없습니다.</div>
          ) : (
            rooms.map((room) => (
              <Room
                key={room._id}
                marginTop="15px"
                mobile={props.mobile}
                data={room}
                onClick={() => {
                  setSelectedRoomInfo(room);
                }}
                theme="purple"
              />
            ))
          )}
        </WhiteContainer>
      </div>
    );
  } else {
    return (
      <>
        <RoomSelectionModal
          isOpen={!!selectedRoomInfo}
          isMobile={true}
          onClose={() => {
            setSelectedRoomInfo(null);
          }}
          roomInfo={selectedRoomInfo}
        />
        {rooms.length == 0 ? (
          <WhiteContainer marginAuto={false} style={styleEmpty}>
            <div style={styleEmpty}>검색 결과가 없습니다</div>
          </WhiteContainer>
        ) : (
          rooms.map((room) => {
            return (
              <Room
                data={room}
                key={room._id}
                marginTop="0px"
                marginBottom="15px"
                mobile={props.mobile}
                onClick={() => {
                  setSelectedRoomInfo(room);
                }}
              />
            );
          })
        )}
      </>
    );
  }
};

SideResult.propTypes = {
  result: PropTypes.array,
  mobile: PropTypes.bool,
};

export default SideResult;
