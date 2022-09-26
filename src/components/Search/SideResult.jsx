import React, { useState, useEffect } from "react";
import WhiteContainer from "components/common/WhiteContainer";
import Title from "components/common/Title";
import Room from "components/common/room/Room";
import RoomSelectionModal from "./RoomSelectionModal";
import PropTypes from "prop-types";

import CheckIcon from "@mui/icons-material/Check";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Pagination from "components/common/pagination/Pagination";

const sortOptions = {
  time: "출발 시간 순",
  leftPeopleReverse: "남은 인원 많은 순",
  leftPeopleNatural: "남은 인원 적은 순",
};

const PAGE_MAX_ROOMS = 20;

const SearchOptions = (props) => {
  const styleWrapper = {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    marginTop: "25px",
  };

  const styleOption = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23px",
    color: "#6E3678",
    fontSize: "10px",
    fontWeight: "400",
    lineHeight: "12px",
    padding: "5px 8px",

    boxShadow:
      "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
    borderRadius: "6px",
    background: props.theme === "purple" ? "#FAF8FB" : "white",
  };

  const styleCheckbox = {
    width: "13px",
    height: "13px",
    background: props.isIncludeFullRoom ? "#6E3678" : "#EEEEEE",
    boxShadow: props.isIncludeFullRoom
      ? "inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)"
      : "inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)",
    borderRadius: "3px",
    marginRight: "6px",
  };

  const styleCheckIcon = {
    color: "white",
    width: "100%",
    height: "100%",
  };

  const styleArrowIcon = {
    color: "#6E3678",
    width: "11px",
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
        <p>{props.sortOption}</p>
        <ArrowDropDownIcon style={styleArrowIcon} />
      </div>
    </div>
  );
};

SearchOptions.propTypes = {
  theme: PropTypes.string,
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
  const [sortOption, setSortOption] = useState(sortOptions.leftPeopleReverse);
  const [rooms, setRooms] = useState([]);
  const [pageInfo, setPageInfo] = useState({ totalPages: 1, currentPage: 1 });

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

  useEffect(() => {
    setPageInfo({
      totalPages: Math.ceil(rooms.length / PAGE_MAX_ROOMS),
      currentPage: 1,
    });
  }, [rooms]);

  const pageClickHandler = (page) => {
    setPageInfo({ ...pageInfo, currentPage: page });
  };

  const prevPageHandler = () => {
    if (pageInfo.currentPage <= 1) return;
    setPageInfo({ ...pageInfo, currentPage: pageInfo.currentPage - 1 });
  };

  const nextPageHandler = () => {
    if (pageInfo.currentPage >= pageInfo.totalPages) return;
    setPageInfo({ ...pageInfo, currentPage: pageInfo.currentPage + 1 });
  };

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
          <SearchOptions
            isIncludeFullRoom={isIncludeFullRoom}
            setIsIncludeFullRoom={setIsIncludeFullRoom}
            sortOption={sortOption}
            setSortOption={setSortOption}
            theme="purple"
          />
          {rooms.length == 0 ? (
            <div style={styleEmpty}>검색 결과가 없습니다.</div>
          ) : (
            <>
              {rooms
                .slice(
                  PAGE_MAX_ROOMS * (pageInfo.currentPage - 1),
                  PAGE_MAX_ROOMS * pageInfo.currentPage
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
                totalPages={pageInfo.totalPages}
                currentPage={pageInfo.currentPage}
                onClickPage={pageClickHandler}
                onClickNext={nextPageHandler}
                onClickPrev={prevPageHandler}
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
          <WhiteContainer marginAuto={false} style={styleEmpty}>
            <div style={styleEmpty}>검색 결과가 없습니다</div>
          </WhiteContainer>
        ) : (
          <>
            {rooms
              .slice(
                PAGE_MAX_ROOMS * (pageInfo.currentPage - 1),
                PAGE_MAX_ROOMS * pageInfo.currentPage
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
              totalPages={pageInfo.totalPages}
              currentPage={pageInfo.currentPage}
              onClickPage={pageClickHandler}
              onClickNext={nextPageHandler}
              onClickPrev={prevPageHandler}
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
