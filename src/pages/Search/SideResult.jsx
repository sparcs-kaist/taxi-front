import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import usePageFromSearchParams from "hooks/usePageFromSearchParams";

import DottedLine from "components/DottedLine";
import Empty from "components/Empty";
import Select from "components/Input/Select";
import { ModalRoomSelection } from "components/ModalPopup";
import Pagination, { PAGE_MAX_ITEMS } from "components/Pagination";
import Room from "components/Room";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import CheckIcon from "@mui/icons-material/Check";

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
    color: theme.purple,
    ...theme.font10_bold,
    borderRadius: "6px",
    boxShadow: theme.shadow,
    boxSizing: "border-box",
    padding: "5px 11px 5px 8px",
    background: props.theme === "purple" ? theme.purple_light : "white",
    ...theme.cursor(),
  };

  const styleCheckbox = {
    width: "13px",
    height: "13px",
    background: props.isIncludeFullRoom ? theme.purple : theme.gray_background,
    boxShadow: theme.shadow_gray_input_inset,
    borderRadius: "3px",
    marginRight: "6px",
  };

  const styleCheckIcon = {
    color: theme.white,
    width: "12px",
    height: "13px",
  };

  const styleSelect = {
    color: theme.purple,
    ...theme.font10_bold,
    borderRadius: "6px",
    boxShadow: theme.shadow,
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
        만석인 방 포함하기
      </div>
      <Select
        value={props.sortOption}
        options={Object.entries(sortOptions).map(([, value]) => ({
          value,
          label: value,
        }))}
        onChangeValue={props.setSortOption}
        css={styleSelect}
      />
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
        <ModalRoomSelection
          isOpen={!!selectedRoomInfo}
          onChangeIsOpen={() => setSelectedRoomInfo(null)}
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
            <Empty screen="pc">
              <div>검색 결과가 없습니다</div>
              {/* <div></div> */}
            </Empty>
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
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            </>
          )}
        </WhiteContainer>
      </div>
    );
  } else {
    return (
      <>
        <ModalRoomSelection
          isOpen={!!selectedRoomInfo}
          onChangeIsOpen={() => setSelectedRoomInfo(null)}
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
            <Pagination totalPages={totalPages} currentPage={currentPage} />
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

SideResult.defaultProps = {
  mobile: false,
};

export default SideResult;
