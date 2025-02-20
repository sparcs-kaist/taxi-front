import { memo, useMemo, useState } from "react";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import DailyAttendanceCalendar from "@/components/Event/DailyAttendanceCalendar";
import DailyAttendanceQuizResult from "@/components/Event/DailyAttendanceQuizResult";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import { ModalEvent2025SpringDailyAttendance } from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import moment, { getToday } from "@/tools/moment";

import { ReactComponent as DailyAttendance } from "@/static/events/2025springDailyAttendance.svg";

export type DateSectionProps = {
  value: Array<Nullable<number>>;
  handler: (newValue: Array<number>) => void;
};

const DateSection = ({ value, handler }: DateSectionProps) => {
  return (
    <WhiteContainer css={{ padding: "10px 15px" }}>
      <DailyAttendanceCalendar value={value} handler={handler} />
    </WhiteContainer>
  );
};

const Event2025SpringAttendance = () => {
  const today = useMemo(() => getToday(), []);
  const endDate = moment("2025-03-13", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate);

  const [valueDate, setValueDate] = useState<Array<number>>([2025, 2, 21]);
  const [isToday, setIsToday] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [dailyAttendanceOpened, setDailyAttendanceOpened] =
    useState<boolean>(false);

  return (
    <>
      <HeaderWithLeftNav
        value="daily-attendance"
        options={[
          {
            value: "quests",
            label: "퀘스트",
            to: "/event/2025spring-missions",
          },
          {
            value: "daily-attendance",
            label: "출석 체크",
            to: "/event/2025spring-daily-attendance",
          },
        ]}
      />
      <AdaptiveDiv
        type="center"
        css={{ display: "flex", flexDirection: "column" }}
      >
        <DailyAttendance css={{ width: "100%" }} />
        <CreditAmountStatusContainer />
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          날짜를 클릭하면 그 날의 질문을 볼 수 있어요!
        </div>
        <DateSection
          value={valueDate}
          handler={(array: Array<number>) => {
            setValueDate(array);
            setIsOpen(true);
            const newMoment = moment(
              `${array[0]}-${array[1]}-${array[2]}`,
              "YYYY-MM-DD"
            );
            setIsToday(
              today.isSame(newMoment, "year") &&
                today.isSame(newMoment, "month") &&
                today.isSame(newMoment, "day")
            );
            setDailyAttendanceOpened(
              today.isSame(newMoment, "year") &&
                today.isSame(newMoment, "month") &&
                today.isSame(newMoment, "day")
            );
          }}
        />
        {isEventDay ? (
          isToday ? (
            <ModalEvent2025SpringDailyAttendance
              isOpen={dailyAttendanceOpened}
              onChangeIsOpen={setDailyAttendanceOpened}
              forceOpen={true}
            />
          ) : (
            <DailyAttendanceQuizResult
              year={valueDate[0]}
              month={valueDate[1]}
              day={valueDate[2]}
              isOpen={isOpen}
              onChangeIsOpen={setIsOpen}
            />
          )
        ) : (
          "이벤트 기간이 아닙니다."
        )}

        <Footer type="event-2025spring" />
      </AdaptiveDiv>
    </>
  );
};

export default memo(Event2025SpringAttendance);
