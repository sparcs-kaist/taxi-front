import { useEffect, useState } from "react";

import { useEvent2024FallQuestComplete } from "@/hooks/event/useEvent2024FallQuestComplete";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import Button from "@/components/Button";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import DailyAttendanceCalendar from "@/components/Event/DailyAttendanceCalendar";
import Modal from "@/components/Modal";
import WhiteContainer from "@/components/WhiteContainer";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

import { ReactComponent as DailyAttendance } from "@/static/events/2024fallDailyAttendance.svg";

type DateSectionProps = {
  value: Array<Nullable<number>>;
  handler: (newValue: Array<number>) => void;
};

const DateSection = (props: DateSectionProps) => {
  return (
    <WhiteContainer css={{ padding: "10px 15px" }}>
      <DailyAttendanceCalendar {...props} />
    </WhiteContainer>
  );
};

interface ModalEvent2024FallDailyAttendanceProps {
  isOpen: boolean;
  onChangeIsOpen?: ((isOpen: boolean) => void) | undefined;
}

const ModalEvent2024FallDailyAttendance = ({
  isOpen,
  onChangeIsOpen,
}: ModalEvent2024FallDailyAttendanceProps) => {
  const today = getToday();
  // const today = moment("2024-09-23", "YYYY-MM-DD"); // FIXME: 배포 전에 수정
  const endDate = moment("2024-09-24", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate);

  const [valueDate, setDate] = useState<Array<Nullable<number>>>([
    today.year(),
    today.month() + 1,
    today.date(),
  ]);

  const event2024FallQuestComplete = useEvent2024FallQuestComplete();

  const { isAgreeOnTermsOfEvent = false, completedQuests = [] } =
    useValueRecoilState("event2024FallInfo") || {};

  const todayInitial = completedQuests?.filter(
    ({ questId, completedAt }) =>
      questId === "dailyAttendance" && moment(completedAt).isSame(today, "day")
  );

  useEffect(() => {
    const modalOpened =
      isEventDay && isAgreeOnTermsOfEvent && todayInitial.length === 0;

    if (onChangeIsOpen && modalOpened) {
      onChangeIsOpen(modalOpened); // 모달 열기 상태 변경
      event2024FallQuestComplete("dailyAttendance");
    }
  }, [isAgreeOnTermsOfEvent, todayInitial.length]);

  return (
    <Modal
      padding="16px 12px 12px"
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      css={{ display: "flex", flexDirection: "column" }}
    >
      <DailyAttendance
        css={{ width: "92%", height: "200px", margin: "0 4%" }}
      />
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
        {isEventDay
          ? "오늘자 출석이 완료되었습니다. "
          : "이벤트 기간이 아닙니다. "}
      </Button>
    </Modal>
  );
};

export default ModalEvent2024FallDailyAttendance;
