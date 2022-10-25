import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import myRoomAtom from "recoil/myRoom";
import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import Button from "components/common/Button";
import axios from "tools/axios";
import { date2str, getToday10, getToday } from "tools/moment";
import { theme } from "styles/theme";
import FullParticipation from "./FullParticipation";
import { MAX_PARTICIPATION } from "components/Myroom/Myroom";

import OptionName from "components/common/roomOptions/Name";
import OptionPlace from "components/common/roomOptions/Place";
import OptionDate from "components/common/roomOptions/Date";
import OptionTime from "components/common/roomOptions/Time";
import OptionMaxPart from "components/common/roomOptions/MaxPart";

const AddRoom = () => {
  const onCall = useRef(false);
  const history = useHistory();
  const [valueName, setName] = useState("");
  const [valuePlace, setPlace] = useState([null, null]);
  const [valueDate, setDate] = useState<Array<Nullable<number>>>([
    null,
    null,
    null,
  ]);
  const [valueMaxPart, setMaxPart] = useState(4);
  const today = getToday();
  const today10 = getToday10();
  const [valueTime, setTime] = useState([today10.hour(), today10.minute()]);
  const [calculatedTime, setCalculatedTime] = useState<Date | null>(null);
  const [myRoom, setMyRoom] = useRecoilState(myRoomAtom);

  useEffect(() => {
    setCalculatedTime(
      new Date(
        valueDate[0]!,
        valueDate[1]! - 1,
        valueDate[2]!,
        valueTime[0],
        valueTime[1]
      )
    );
  }, [valueDate, valueTime]);

  useEffect(() => {
    if (onCall.current) history.push("/myroom");
  }, [myRoom?.ongoing.length]);

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
        time: calculatedTime!.toISOString(),
        maxPartLength: valueMaxPart,
      });
      if (result.status === 200) {
        try {
          const { data } = await axios.get("/rooms/v2/searchByUser");
          setMyRoom(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("add room error");
      }
    }
  };

  return (myRoom?.ongoing.length ?? 0) < MAX_PARTICIPATION ? (
    <div>
      <Title icon="add" header={true} marginAuto={true}>
        방 개설하기
      </Title>
      <RLayout.R1>
        <OptionPlace value={valuePlace} handler={setPlace} />
        <OptionDate value={valueDate} handler={setDate} />
        <OptionName value={valueName} handler={setName} />
        <OptionTime value={valueTime} handler={setTime} page="add" />
        <OptionMaxPart value={valueMaxPart} handler={setMaxPart} />
        <Button
          type="purple"
          disabled={validatedMsg ? true : false}
          padding="13px 0px 14px"
          radius={12}
          font={theme.font16_bold}
          onClick={onClickAdd}
        >
          {validatedMsg
            ? validatedMsg
            : `${date2str(
                new Date(
                  valueDate[0]!,
                  valueDate[1]! - 1,
                  valueDate[2]!,
                  valueTime[0],
                  valueTime[1]
                ),
                "MMM Do [(]dd[)] a h[시] m[분]"
              )} 방 개설하기`}
        </Button>
      </RLayout.R1>
    </div>
  ) : (
    <FullParticipation />
  );
};

export default AddRoom;
