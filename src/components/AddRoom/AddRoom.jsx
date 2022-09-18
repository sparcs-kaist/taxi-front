import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import SubmitButton from "components/common/roomOptions/SubmitButton";
import axios from "tools/axios";
import { date2str, getToday10, getToday } from "tools/moment";

import OptionName from "components/common/roomOptions/Name";
import OptionPlace from "components/common/roomOptions/Place";
import OptionDate from "components/common/roomOptions/Date";
import OptionTime from "components/common/roomOptions/Time";
import OptionMaxPartLength from "components/common/roomOptions/MaxPartLength";

const AddRoom = () => {
  const onCall = useRef(false);
  const history = useHistory();
  const [valueName, setName] = useState("");
  const [valuePlace, setPlace] = useState([null, null]);
  const [valueDate, setDate] = useState([null, null, null]);
  const [valueMaxPartLength, setMaxPartLength] = useState(4);
  const today = getToday();
  const today10 = getToday10();
  const [valueTime, setTime] = useState([
    today10.hour().toString(),
    today10.minute().toString(),
  ]);
  const [calculatedTime, setCalculatedTime] = useState(null);

  useEffect(() => {
    setCalculatedTime(
      new Date(
        valueDate[0],
        valueDate[1] - 1,
        valueDate[2],
        valueTime[0],
        valueTime[1]
      )
    );
  }, [valueDate, valueTime]);

  let validatedMsg = null;
  if (!valuePlace[0] || !valuePlace[1]) {
    validatedMsg = "출발지와 도착지를 선택해 주세요";
  } else if (valuePlace[0] === valuePlace[1]) {
    validatedMsg = "출발지와 도착지는 달라야 합니다";
  } else if (!valueDate[0] || !valueDate[1] || !valueDate[2]) {
    validatedMsg = "날짜를 선택해 주세요";
  } else if (!valueTime[0] || !valueTime[1]) {
    validatedMsg = "시간을 선택해 주세요";
  } else if (today.isSameOrAfter(calculatedTime)) {
    validatedMsg = "현재 시각 이후를 선택해주세요";
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
      const result = await axios.post("/rooms/v2/create", {
        name: valueName,
        from: valuePlace[0],
        to: valuePlace[1],
        time: calculatedTime.toISOString(),
        maxPartLength: valueMaxPartLength,
      });
      if (result.status === 200) {
        history.push("/myroom");
      } else {
        alert("add room error");
      }
    }
  };

  return (
    <div>
      <Title icon="add" header={true}>
        방 개설하기
      </Title>
      <RLayout.R1>
        <OptionPlace value={valuePlace} handler={setPlace} />
        <OptionDate value={valueDate} handler={setDate} />
        <OptionName value={valueName} handler={setName} />
        <OptionTime value={valueTime} handler={setTime} page="add" />
        <OptionMaxPartLength
          value={valueMaxPartLength}
          handler={setMaxPartLength}
        />
        <SubmitButton
          onClick={validatedMsg ? () => {} : onClickAdd}
          disable={validatedMsg ? true : false}
        >
          {validatedMsg
            ? validatedMsg
            : `${date2str(
                new Date(
                  valueDate[0],
                  valueDate[1] - 1,
                  valueDate[2],
                  valueTime[0],
                  valueTime[1]
                ),
                "MMM Do [(]dd[)] a h[시] m[분]"
              )} 방 개설하기`}
        </SubmitButton>
      </RLayout.R1>
    </div>
  );
};

export default AddRoom;
