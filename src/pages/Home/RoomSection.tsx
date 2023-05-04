import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import useDateToken from "hooks/useDateToken";
import { useAxios, useQuery } from "hooks/useTaxiAPI";

import { ModalRoomSelection } from "components/ModalPopup";
import RLayout from "components/RLayout";
import Title from "components/Title";

import RoomList from "./RoomList";
import SelectDate from "./SelectDate";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import moment, { getToday } from "tools/moment";

type RoomSectionProps = {
  roomId: Nullable<string>;
};

const RoomSection = ({ roomId }: RoomSectionProps) => {
  const axios = useAxios();
  const history = useHistory();
  const setAlert = useSetRecoilState(alertAtom);
  const today = getToday().subtract(1, "day");
  const [allRoomsToken, fetchAllRooms] = useDateToken();
  const [, allRooms] = useQuery.get("/rooms/search?isHome=true", {}, [
    allRoomsToken,
  ]);

  const [selectedDate, setSelectedDate] = useState<[number, number, number]>([
    today.year(),
    today.month(),
    today.date(),
  ]);
  const rooms = useMemo(() => {
    if (!allRooms) return null;
    const time = moment(selectedDate);
    return time.date() == today.date()
      ? allRooms
      : allRooms?.filter(
          (room: Room) => moment(room.time).date() == time.date()
        );
  }, [allRooms, selectedDate]);

  const [roomInfo, setRoomInfo] = useState<Nullable<any>>(null);

  // 5분 간격으로 allRoms(요일 별 출발하는 방)을 갱신합니다.
  useEffect(() => {
    const interval = setInterval(fetchAllRooms, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  // 방이 선택되면 해당 방의 정보를 가져옵니다.
  useEffect(() => {
    if (!roomId || !allRooms) return setRoomInfo(null);
    const _roomInfo = allRooms?.find((room: any) => room._id == roomId);
    if (_roomInfo) return setRoomInfo(_roomInfo);
    axios({
      url: "/rooms/publicInfo",
      method: "get",
      params: { id: roomId },
      onSuccess: setRoomInfo,
      onError: () => {
        setAlert("해당 방 조회에 실패하였습니다.");
        history.replace("/home");
      },
    });
  }, [roomId, allRooms]);

  return (
    <RLayout.R1>
      <ModalRoomSelection
        isOpen={!!roomInfo}
        onChangeIsOpen={() =>
          history.replace("/home" + history.location.search)
        }
        roomInfo={roomInfo}
      />
      <Title icon="taxi" header>
        요일별 출발하는 방
      </Title>
      <SelectDate
        selectedDate={selectedDate}
        onClick={([year, month, date]) => setSelectedDate([year, month, date])}
      />
      <RoomList rooms={rooms} />
    </RLayout.R1>
  );
};

export default RoomSection;
