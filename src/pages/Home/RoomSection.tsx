import { useEffect, useState } from "react";
import { useQuery } from "hooks/useTaxiAPI";
import moment, { getToday } from "tools/moment";
import RLayout from "components/RLayout";
import Title from "components/Title";
import SelectDate from "./SelectDate";
import RoomList from "./RoomList";

const RoomSection = () => {
  const today = getToday().subtract(1, "day");
  const [, allRooms] = useQuery.get("/rooms/search");
  const [rooms, setRooms] = useState<Nullable<Array<any>>>(null);
  const [selectedDate, setSelectedDate] = useState<[number, number, number]>([
    today.year(),
    today.month(),
    today.date(),
  ]);

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
