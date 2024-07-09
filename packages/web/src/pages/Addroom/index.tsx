import { useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import { useEvent2024SpringQuestComplete } from "@/hooks/event/useEvent2024SpringQuestComplete";
import {
  useFetchRecoilState,
  useIsLogin,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import { ModalEvent2024SpringAbuseWarning } from "@/components/ModalPopup";
import {
  OptionDate,
  OptionMaxPeople,
  OptionName,
  OptionPlace,
  OptionTime,
} from "@/components/ModalRoomOptions";
import Title from "@/components/Title";
import WhiteContainerSuggestLogin from "@/components/WhiteContainer/WhiteContainerSuggestLogin";
import { MAX_PARTICIPATION } from "@/pages/Myroom";

import FullParticipation from "./FullParticipation";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { date2str, getToday, getToday10 } from "@/tools/moment";
import { randomRoomNameGenerator } from "@/tools/random";
import regExpTest from "@/tools/regExpTest";
import theme from "@/tools/theme";

const AddRoom = () => {
  const axios = useAxios();
  const history = useHistory();
  const [cookies, setCookies] = useCookies(["defaultFromTo"]);

  const onCall = useRef(false);
  const loginInfo = useValueRecoilState("loginInfo");
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
  const isLogin = useIsLogin();
  const myRooms = useValueRecoilState("myRooms");
  const fetchMyRooms = useFetchRecoilState("myRooms");
  //#region event2024Spring
  const event2024SpringQuestComplete = useEvent2024SpringQuestComplete();
  const [isOpenModalEventAbuseWarning, setIsOpenModalEventAbuseWarning] =
    useState<boolean>(false);
  //#endregion

  const notPaid = useMemo(() => {
    const myOngoingRoom = myRooms?.ongoing.slice() ?? [];
    const notPaid = myOngoingRoom.find(
      (room) =>
        room.part.find((item: any) => item._id === loginInfo?.oid)
          .isSettlement === "send-required" && room.isDeparted
    ); // 다른 사람이 정산을 올렸으나 내가 아직 송금하지 않은 방이 있는지 여부 (추가 입장 제한에 사용)
    return notPaid;
  }, [myRooms]); // myOngoingRoom은 infoSection의 sortedMyRoom에서 정렬만 뺀 코드입니다. useMemo로 감싼 형태입니다.
  // item : any 가 좋은 방법인지 모르겠습니다

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
  if (notPaid) {
    validatedMsg = "결제자에게 송금이 완료되지 않은 방이 있습니다";
  } else if (!valuePlace.every((x: Nullable<string>) => !!x)) {
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

      // #region event2024Spring
      let isAgreeOnTermsOfEvent = false;
      await axios({
        url: "/events/2024spring/globalState",
        method: "get",
        onSuccess: (data) => {
          if (data.isAgreeOnTermsOfEvent) {
            isAgreeOnTermsOfEvent = data.isAgreeOnTermsOfEvent;
          }
        },
        onError: () => {},
      });
      if (isAgreeOnTermsOfEvent) {
        let isFalse = false;
        await axios({
          url: "/rooms/create/test",
          method: "post",
          data: {
            from: valuePlace[0],
            to: valuePlace[1],
            time: calculatedTime!.toISOString(),
            maxPartLength: valueMaxPeople,
          },
          onSuccess: (data) => {
            if (data!.result === false) {
              setIsOpenModalEventAbuseWarning(true);
              onCall.current = false;
              isFalse = true;
              return;
            }
          },
          onError: () => {},
        });
        if (isFalse) return;
      }
      // #endregion

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
          //#region event2024Spring
          event2024SpringQuestComplete("firstRoomCreation");
          //#endregion
          history.push("/myroom");
        },
        onError: () => setAlert("방 개설에 실패하였습니다."),
      });
      onCall.current = false;
    }
  };

  return (myRooms?.ongoing.length ?? 0) < MAX_PARTICIPATION ? (
    <>
      <div>
        <AdaptiveDiv type="center">
          <Title icon="add" isHeader>
            방 개설하기
          </Title>
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
                css={{
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font16_bold,
                }}
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
        </AdaptiveDiv>
      </div>
      {/* #region event2024Spring */}
      <ModalEvent2024SpringAbuseWarning
        isOpen={isOpenModalEventAbuseWarning}
        onChangeIsOpen={async (data) => {
          if (data === true) {
            setIsOpenModalEventAbuseWarning(data);
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
                //#region event2024spring
                event2024SpringQuestComplete("firstRoomCreation");
                //#endregion
                history.push("/myroom");
              },
              onError: () => setAlert("방 개설에 실패하였습니다."),
            });
          } else if (data === false) {
            setIsOpenModalEventAbuseWarning(data);
          }
        }}
      />
      {/* #endregion */}
    </>
  ) : (
    <FullParticipation />
  );
};

export default AddRoom;
