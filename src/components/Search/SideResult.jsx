import React, { useState, useEffect } from "react";
import WhiteContainer from "components/common/WhiteContainer";
import Title from "components/common/Title";
import Room from "components/common/room/Room";
import Pagination, {
  PAGE_MAX_ITEMS,
} from "components/common/pagination/Pagination";
import RoomSelectionModal from "./RoomSelectionModal";
import PropTypes from "prop-types";
import usePageFromSearchParams from "hooks/usePageFromSearchParams";
import { theme } from "styles/theme";
import Empty from "components/common/Empty";
import DottedLine from "components/common/DottedLine";
import CheckIcon from "@mui/icons-material/Check";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const sortOptions = {
  time: "출발 시간 순",
  leftPeopleReverse: "남은 인원 많은 순",
  leftPeopleNatural: "남은 인원 적은 순",
};

const SearchOptions = (props) => {
  const styleWrapper = {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0",
  };

  const styleOption = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    height: "23px",
    color: theme.purple,
    ...theme.font10_bold,
    lineHeight: "12px",
    padding: "5px 8px",
    boxShadow: theme.shadow,
    borderRadius: "6px",
    background: props.color === "purple" ? theme.purple_light : "white",
    cursor: theme.cursor(),
  };

  const styleCheckbox = {
    width: "13px",
    height: "13px",
    background: props.isIncludeFullRoom ? theme.purple : theme.gray_background,
    boxShadow: theme.shadow_purple_input_inset,
    borderRadius: "3px",
    marginRight: "6px",
  };

  const styleCheckIcon = {
    color: "white",
    width: "100%",
    height: "100%",
  };

  const styleArrowIcon = {
    color: theme.purple,
    width: "11px",
  };

  const styleSelect = {
    opacity: 0,
    right: 0,
    position: "absolute",
    cursor: theme.cursor(),
  };

  const styleShowOption = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={styleWrapper}>
      <div
        onClick={() => {
          props.setIsIncludeFullRoom(!props.isIncludeFullRoom);
        }}
        style={styleOption}
      >
        <div style={styleCheckbox}>
          {props.isIncludeFullRoom && <CheckIcon style={styleCheckIcon} />}
        </div>
        <p>만석인 방 포함하기</p>
      </div>
      <div style={styleOption}>
        <select
          value={props.sortOption}
          onChange={(e) => props.setSortOption(e.target.value)}
          style={styleSelect}
        >
          {Object.entries(sortOptions).map(([key, value]) => (
            <option value={value} key={key}>
              {value}
            </option>
          ))}
        </select>
        <div style={styleShowOption}>
          <p>{props.sortOption}</p>
          <ArrowDropDownIcon style={styleArrowIcon} />
        </div>
      </div>
    </div>
  );
};

SearchOptions.propTypes = {
  color: PropTypes.string,
  isIncludeFullRoom: PropTypes.bool.isRequired,
  sortOption: PropTypes.string.isRequired,
  setIsIncludeFullRoom: PropTypes.func.isRequired,
  setSortOption: PropTypes.func.isRequired,
};
SearchOptions.defaultProps = {
  theme: "white",
};

const SideResult = (props) => {
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [isIncludeFullRoom, setIsIncludeFullRoom] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptions.time);
  const [rooms, setRooms] = useState([]);
  const totalPages = Math.ceil(rooms.length / PAGE_MAX_ITEMS);
  const currentPage = usePageFromSearchParams(totalPages);

  useEffect(() => {
    if (props.result === null) return;

    let roomsWithOptions = isIncludeFullRoom
      ? [...props.result]
      : props.result.filter((room) => room.maxPartLength > room.part.length);

    // For stable sort
    roomsWithOptions.forEach((room, idx) => {
      room.idx = idx;
    });

    // 시간순 옵션일 경우 추가 정렬 필요 없음 (서버에서 정렬된 결과 반환)
    if (sortOption !== sortOptions.time)
      roomsWithOptions.sort((room1, room2) => {
        const room1Left = room1.maxPartLength - room1.part.length;
        const room2Left = room2.maxPartLength - room2.part.length;
        if (room1Left === room2Left) return room1.idx - room2.idx;
        return sortOption === sortOptions.leftPeopleNatural
          ? room1Left - room2Left
          : room2Left - room1Left;
      });

    setRooms(roomsWithOptions);
  }, [isIncludeFullRoom, sortOption, props.result]);

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
        <WhiteContainer padding="20px 20px 22px">
          <Title icon="search_result">검색 결과</Title>
          <SearchOptions
            isIncludeFullRoom={isIncludeFullRoom}
            setIsIncludeFullRoom={setIsIncludeFullRoom}
            sortOption={sortOption}
            setSortOption={setSortOption}
            theme="purple"
          />
          <DottedLine direction="row" />
          {rooms.length == 0 ? (
            <Empty screen="pc">검색 결과가 없습니다</Empty>
          ) : (
            <>
              {rooms
                .slice(
                  PAGE_MAX_ITEMS * (currentPage - 1),
                  PAGE_MAX_ITEMS * currentPage
                )
                .map((room) => (
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
                ))}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                isMobile={false}
              />
            </>
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
        <SearchOptions
          isIncludeFullRoom={isIncludeFullRoom}
          setIsIncludeFullRoom={setIsIncludeFullRoom}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        {rooms.length == 0 ? (
          <Empty screen="mobile">검색 결과가 없습니다</Empty>
        ) : (
          <>
            {rooms
              .slice(
                PAGE_MAX_ITEMS * (currentPage - 1),
                PAGE_MAX_ITEMS * currentPage
              )
              .map((room) => {
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
              })}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              isMobile
            />
          </>
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
