import React, { useState } from "react";
import { getToday } from "tools/moment";
import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import SelectDate from "./SelectDate";

const RoomSection = () => {
  const [selectedDate, setSelectedDate] = useState([
    getToday().year(),
    getToday().month(),
    getToday().date(),
  ]);
  return (
    <RLayout.R1>
      <div style={{ margin: "20px 0" }}>
        <Title icon="taxi">요일별 출발하는 방</Title>
      </div>
      <SelectDate
        selectedDate={selectedDate[2]}
        onClick={(year, month, date) => setSelectedDate([month, year, date])}
      />
    </RLayout.R1>
  );
};

export default RoomSection;
