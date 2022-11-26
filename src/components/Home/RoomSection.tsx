import React from "react";
import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import DaySelection from "./DaySelection";

const RoomSection = () => {
  return (
    <RLayout.R1>
      <div style={{ margin: "20px 0" }}>
        <Title icon="taxi">요일별 출발하는 방</Title>
      </div>
      <DaySelection />
    </RLayout.R1>
  );
};

export default RoomSection;
