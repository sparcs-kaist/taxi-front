import { memo, useMemo, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import DailyAttendanceCalendar from "@/components/Event/DailyAttendanceCalendar";
import WhiteContainerSuggestJoinEvent from "@/components/Event/WhiteContainerSuggestJoinEvent";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import WhiteContainer from "@/components/WhiteContainer";

import { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

// ToDo : 2023fall 이미지
import { ReactComponent as CreditIcon } from "@/static/events/2023fallCredit.svg";
import { ReactComponent as MissionCompleteIcon } from "@/static/events/2023fallMissionComplete.svg";
import { ReactComponent as DailyAttendance } from "@/static/events/2024fallDailyAttendance.svg";

type DateSectionProps = {
  value: Array<Nullable<number>>;
  handler: (newValue: Array<number>) => void;
};

const DateSection = (props: DateSectionProps) => {
  return (
    <WhiteContainer css={{ padding: "10px 15px" }}>
      <DailyAttendanceCalendar
        selectedDate={props.value}
        handler={(x: number, y: number, z: number) => props.handler([x, y, z])}
      />
    </WhiteContainer>
  );
};

const Event2024FallMissions = () => {
  const today = getToday();

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
          { value: "quests", label: "퀘스트", to: "/event/2024fall-missions" },
          {
            value: "daily-attendance",
            label: "출석 체크",
            to: "/event/2024fall-daily-attendance",
          },
        ]}
      />
      <AdaptiveDiv type="center">
        <DailyAttendance css={{ height: "100%", width: "100%" }} />
        <CreditAmountStatusContainer />
        <DateSection value={valueDate} handler={setDate} />
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
          오늘자 출석이 완료되었습니다.
        </Button>

        <Footer type="event-2024fall" />
      </AdaptiveDiv>
    </>
  );
}; // ToDo : 2023fall 문구 및 footer

export default memo(Event2024FallMissions);
