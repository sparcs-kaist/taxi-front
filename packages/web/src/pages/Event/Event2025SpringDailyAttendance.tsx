import { memo, useState } from "react";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import DailyAttendanceCalendar from "@/components/Event/DailyAttendanceCalendar";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import WhiteContainer from "@/components/WhiteContainer";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

import { ReactComponent as DailyAttendance } from "@/static/events/2024fallDailyAttendance.svg";

// TODO: 에셋 변경

type DateSectionProps = {
  value: Array<Nullable<number>>;
  handler: (newValue: Array<number>) => void;
};

const DateSection = (props: DateSectionProps) => {
  return (
    <WhiteContainer css={{ padding: "10px 15px" }}>
      <DailyAttendanceCalendar />
    </WhiteContainer>
  );
};

const Event2025SpringAttendance = () => {
  const today = getToday();
  const endDate = moment("2025-03-13", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate);

  const [valueDate, setDate] = useState<Array<Nullable<number>>>([
    today.year(),
    today.month() + 1,
    today.date(),
  ]);

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
        <DateSection value={valueDate} handler={setDate} />
        {isEventDay ? (
          <Button
            type="purple"
            disabled={true}
            css={{
              width: "100%",
              padding: "14px 0 13px",
              borderRadius: "12px",
              ...theme.font16_bold,
            }}
          >
            오늘의 출석체크
          </Button>
        ) : (
          "이벤트 기간이 아닙니다."
        )}

        <Footer type="event-2025spring" />
      </AdaptiveDiv>
    </>
  );
};

export default memo(Event2025SpringAttendance);
