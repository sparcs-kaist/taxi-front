import { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "hooks/useFetchRecoilState";
import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import {
  OptionDate,
  OptionMaxPeople,
  OptionName,
  OptionPlace,
  OptionTime,
} from "components/ModalRoomOptions";
import RLayout from "components/RLayout";
import Title from "components/Title";
import WhiteContainerSuggestLogin from "components/WhiteContainer/WhiteContainerSuggestLogin";
import { MAX_PARTICIPATION } from "pages/Myroom";

import FullParticipation from "./FullParticipation";

import alertAtom from "atoms/alert";
import { useSetRecoilState } from "recoil";

import { date2str, getToday, getToday10 } from "tools/moment";
import { randomRoomNameGenerator } from "tools/random";
import regExpTest from "tools/regExpTest";
import theme from "tools/theme";

const AddRoom = () => {
  const axios = useAxios();
  const history = useHistory();
  const [cookies, setCookies] = useCookies(["defaultFromTo"]);

  const onCall = useRef(false);
  const today = getToday();
  const today10 = getToday10();
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
  const randomRoomName = useMemo(randomRoomNameGenerator, []);

  const setAlert = useSetRecoilState(alertAtom);
  const isLogin = !!useValueRecoilState("loginInfo")?.id;
  const myRooms = useValueRecoilState("myRooms");
  const fetchMyRooms = useFetchRecoilState("myRooms");

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

  let validatedMsg = null;
  if (!valuePlace.every((x: Nullable<string>) => !!x)) {
    validatedMsg = "출발지와 도착지를 선택해 주세요";
  } else if (valuePlace[0] === valuePlace[1]) {
    validatedMsg = "출발지와 도착지는 달라야 합니다";
  } else if (!valueDate[0] || !valueDate[1] || !valueDate[2]) {
    validatedMsg = "날짜를 선택해 주세요";
  } else if (today.isSameOrAfter(calculatedTime)) {
    validatedMsg = "현재 시각 이후를 선택해주세요";
  } else if (valueName !== "" && !regExpTest.roomName(valueName)) {
    validatedMsg = "사용할 수 없는 방 이름입니다";
  }

  const onClickAdd = async () => {
    if (!onCall.current) {
      onCall.current = true;
      // FIXME: "/rooms/create" API가 myRoom을 반환하도록 수정
      await axios({
        url: "/rooms/create",
        method: "post",
        data: {
          name: valueName || randomRoomName,
          from: valuePlace[0],
          to: valuePlace[1],
          time: calculatedTime!.toISOString(),
          maxPartLength: valueMaxPeople,
        },
        onSuccess: () => {
          fetchMyRooms();
          history.push("/myroom");
        },
        onError: () => setAlert("방 개설에 실패하였습니다."),
      });
      onCall.current = false;
    }
  };

  return (myRooms?.ongoing.length ?? 0) < MAX_PARTICIPATION ? (
    <div>
      <Title icon="add" header marginAuto>
        방 개설하기
      </Title>
      <RLayout.R1>
        {isLogin ? (
          <>
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
          </>
        ) : (
          <WhiteContainerSuggestLogin />
        )}
      </RLayout.R1>
    </div>
  ) : (
    <FullParticipation />
  );
};

export default AddRoom;
