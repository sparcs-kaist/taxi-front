import { memo, useMemo, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import DailyAttendanceCalendar from "@/components/Event/DailyAttendanceCalendar";
import WhiteContainerSuggestJoinEvent from "@/components/Event/WhiteContainerSuggestJoinEvent";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
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
      <DailyAttendanceCalendar />
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

  const [valueDate, setDate] = useState<Array<Nullable<number>>>([
    today.year(),
    today.month() + 1,
    today.date(),
  ]);

  return (
    <Modal
      padding="16px 12px 12px"
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
    >
      <DailyAttendance
        css={{ height: "100%", width: "100%", margin: "0 0 16px" }}
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
        오늘자 출석이 완료되었습니다.
      </Button>
    </Modal>
  );
};

export default ModalEvent2024FallDailyAttendance;
