import React, { useState } from "react";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import Title from "../../Frame/Title/Title";

import OptionName from "../Options/Name";
import OptionPlace from "../Options/Place";
import OptionDate from "../Options/Date";
import OptionTime from "../Options/Time";

import svgAdd from "./svg_add.svg";

const AddRoom = (props) => {
  const [valueName, setName] = useState("");
  const [valuePlace, setPlace] = useState([null, null]);
  const [valueDate, setDate] = useState([null, null, null]);
  const [valueTime, setTime] = useState([0, 0]);

  return (
    <div>
      <div style={{ height: "30px" }} />
      <Title img={svgAdd}>방 개설하기</Title>
      <div style={{ height: "20px" }} />
      <RLayout.R1>
        <OptionPlace value={valuePlace} handler={setPlace} />
        <OptionDate value={valueDate} handler={setDate} />
        <OptionName value={valueName} handler={setName} />
        <OptionTime value={valueTime} handler={setTime} />
      </RLayout.R1>
    </div>
  );
};

export default AddRoom;
