import { useEffect, useState } from "react";

import useDateToken from "hooks/useDateToken";
import { useQuery } from "hooks/useTaxiAPI";

import RLayout from "components/RLayout";
import Title from "components/Title";

import RoomList from "./RoomList";
import SelectDate from "./SelectDate";

import moment, { getToday } from "tools/moment";

const RoomSection = () => {
  const today = getToday().subtract(1, "day");
  const [allRoomsToken, fetchAllRooms] = useDateToken();
  const [, allRooms] = useQuery.get("/rooms/search", {}, [allRoomsToken]);
  const [rooms, setRooms] = useState<Nullable<Array<any>>>(null);
  const [selectedDate, setSelectedDate] = useState<[number, number, number]>([
    today.year(),
    today.month(),
    today.date(),
  ]);

  useEffect(() => {
    // 5분 간격으로 allRoms(요일 별 출발하는 방)을 갱신합니다.
    const interval = setInterval(fetchAllRooms, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (allRooms) {
      const time = moment(selectedDate);
      if (time.date() == today.date()) {
        setRooms(allRooms);
      } else {
        setRooms(
          allRooms?.filter(
            (room: Room) => moment(room.time).date() == time.date()
          )
        );
      }
    }
  }, [selectedDate, allRooms]);

  return (
    <RLayout.R1>
      <div style={{ margin: "20px 0" }}>
        <Title icon="taxi">요일별 출발하는 방</Title>
      </div>
      <SelectDate
        selectedDate={selectedDate}
        onClick={([year, month, date]) => setSelectedDate([year, month, date])}
      />
      <RoomList rooms={rooms} />
    </RLayout.R1>
  );
};

export default RoomSection;
