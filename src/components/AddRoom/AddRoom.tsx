import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import myRoomAtom from "recoil/myRoom";
import RLayout from "components/common/RLayout";
import Title from "components/common/Title";
import Button from "components/common/Button";
import axios from "tools/axios";
import { date2str, getToday10, getToday } from "tools/moment";
import theme from "styles/theme";
import { useSetRecoilState } from "recoil";
import alertAtom from "recoil/alert";
import FullParticipation from "./FullParticipation";
import { MAX_PARTICIPATION } from "components/Myroom/Myroom";
import { useCookies } from "react-cookie";
import randomRoomName from "static/randomRoomName";

import OptionName from "components/common/roomOptions/Name";
import OptionPlace from "components/common/roomOptions/Place";
import OptionDate from "components/common/roomOptions/Date";
import OptionTime from "components/common/roomOptions/Time";
import OptionMaxPeople from "components/common/roomOptions/MaxPeople";

const AddRoom = () => {
  const onCall = useRef(false);
  const history = useHistory();
  const today = getToday();
  const today10 = getToday10();
  const [cookies, setCookies] = useCookies(["defaultFromTo"]);
  const [valueName, setName] = useState("");
  const [valuePlace, setPlace] = useState(
    cookies?.defaultFromTo?.[0] && cookies?.defaultFromTo?.[1]
      ? cookies.defaultFromTo
      : [null, null]
  );
  const [valueDate, setDate] = useState<Array<Nullable<number>>>([
    today.year(),
    today.month() + 1,
    today.date(),
  ]);
  const [valueMaxPeople, setMaxPeople] = useState(4);
  const [valueTime, setTime] = useState([today10.hour(), today10.minute()]);
  const [calculatedTime, setCalculatedTime] = useState<Date | null>(null);
  const setAlert = useSetRecoilState(alertAtom);
  const [myRoom, setMyRoom] = useRecoilState(myRoomAtom);

  useEffect(() => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    if (valuePlace[0] && valuePlace[1]) {
      setCookies("defaultFromTo", valuePlace, {
        expires: expirationDate,
      });
    }
  }, [valuePlace]);

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
  } else if (today.isSameOrAfter(calculatedTime)) {
    validatedMsg = "현재 시각 이후를 선택해주세요";
  } else if (
    valueName !== "" &&
    !RegExp("^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ,.?! _-]{1,50}$").test(valueName)
  ) {
    validatedMsg = "방 이름으로 사용될 수 없습니다";
  }

  const onClickAdd = async () => {
    if (!onCall.current) {
      onCall.current = true;
      const result = await axios.post("/rooms/create", {
        name: valueName ? valueName : randomRoomName,
        from: valuePlace[0],
        to: valuePlace[1],
        time: calculatedTime!.toISOString(),
        maxPartLength: valueMaxPeople,
      });
      if (result.status === 200) {
        try {
          const { data } = await axios.get("/rooms/searchByUser");
          setMyRoom(data);
        } catch (error) {
          setAlert("예상치 못한 오류가 발생했습니다. 새로고침 해주세요.");
        }
      } else {
        setAlert("방 개설에 실패하였습니다.");
      }
    }
  };

  return (myRoom?.ongoing.length ?? 0) < MAX_PARTICIPATION ? (
    <div>
      <Title icon="add" header marginAuto>
        방 개설하기
      </Title>
      <RLayout.R1>
        <OptionPlace value={valuePlace} handler={setPlace} />
        <OptionDate value={valueDate} handler={setDate} />
        <OptionName
          value={valueName}
          handler={setName}
          placeholder={randomRoomName}
        />
        <OptionTime value={valueTime} handler={setTime} page="add" />
        <OptionMaxPeople value={valueMaxPeople} handler={setMaxPeople} />
        <Button
          type="purple"
          disabled={validatedMsg ? true : false}
          padding="14px 0 13px"
          radius={12}
          font={theme.font16_bold}
          onClick={onClickAdd}
          className="scroll-to-button"
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
