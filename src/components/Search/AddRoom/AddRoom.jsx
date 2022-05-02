import React, { useState, useRef } from "react";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import Title from "../../Frame/Title/Title";
import SubmitButton from "../../Frame/SubmitButton/SubmitButton";
import axios from "../../Tool/axios";

import OptionName from "../Options/Name";
import OptionPlace from "../Options/Place";
import OptionDate from "../Options/Date";
import OptionTime from "../Options/Time";

import svgAdd from "./svg_add.svg";

const AddRoom = (props) => {
  const onCall = useRef(false);
  const [valueName, setName] = useState("");
  const [valuePlace, setPlace] = useState([null, null]);
  const [valueDate, setDate] = useState([null, null, null]);
  const today = new Date();
  const [valueTime, setTime] = useState([
    today.getHours().toString(),
    (parseInt(today.getMinutes() / 10) * 10).toString(),
  ]);

  let validatedMsg = null;
  if (!valuePlace[0] || !valuePlace[1]) {
    validatedMsg = "출발지와 도착지를 선택해 주세요";
  } else if (valuePlace[0] == valuePlace[1]) {
    validatedMsg = "출발지와 도착지는 같을 수 없습니다";
  } else if (!valueDate[0] || !valueDate[1] || !valueDate[2]) {
    validatedMsg = "날짜를 선택해 주세요";
  } else if (!valueTime[0] || !valueTime[1]) {
    validatedMsg = "시간을 선택해 주세요";
  } else if (valueName === "") {
    validatedMsg = "방 이름을 입력해 주세요";
  } else if (
    !RegExp("^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ,.?! _-]{1,50}$").test(valueName)
  ) {
    validatedMsg = "방 이름으로 사용될 수 없습니다";
  }

  const onClickAdd = async () => {
    if (!onCall.current) {
      onCall.current = true;
      const result = await axios.post("/rooms/create", {
        // Fixme from back => api 변경, 시간이 안쓰임??
        data: {
          name: valueName,
          from: valuePlace[0],
          to: valuePlace[1],
          time: new Date(
            valueDate[0],
            valueDate[1] - 1,
            valueDate[2],
            valueTime[0],
            valueTime[1]
          ),
        },
      });
      if (result.status === 200) {
        //console.log(result);
        alert("방이 개설됨!!");
      } else {
        console.log("add room error");
      }
    }
  };

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
        <SubmitButton
          marginAuto={false}
          onClick={validatedMsg ? () => {} : onClickAdd}
          disable={validatedMsg ? true : false}
        >
          {validatedMsg
            ? validatedMsg
            : `${valueDate[1]}월 ${valueDate[2]}일 ${valueTime[0]}시 ${valueTime[1]}분 이후 방 개설하기`}
        </SubmitButton>
      </RLayout.R1>
    </div>
  );
};

export default AddRoom;
