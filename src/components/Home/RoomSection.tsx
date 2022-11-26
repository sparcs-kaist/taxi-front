import React, { useEffect, useState } from "react";
import axios from "tools/axios";
import moment, { getToday } from "tools/moment";
import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import SelectDate from "./SelectDate";
import RoomList from "./RoomList";

const RoomSection = () => {
  const today = getToday().subtract(1, "day");
  const [rooms, setRooms] = useState(null);
  const [selectedDate, setSelectedDate] = useState<[number, number, number]>([
    today.year(),
    today.month(),
    today.date(),
  ]);
  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await axios.get("rooms/v2/search", {
        params: { time: moment(selectedDate).toISOString(), withTime: false },
      });
      setRooms(data);
    };
    fetchRooms();
  }, [selectedDate]);
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
