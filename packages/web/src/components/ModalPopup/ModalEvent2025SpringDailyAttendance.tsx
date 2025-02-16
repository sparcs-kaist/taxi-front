import { useEffect, useState } from "react";
import { CSSProperties } from "react";

// import { useEvent2025SpringQuestComplete } from "@/hooks/event/useEvent2025SpringQuestComplete";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import Button from "@/components/Button";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import Modal from "@/components/Modal";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

import { ReactComponent as DailyAttendance } from "@/static/events/2024fallDailyAttendance.svg";

interface ModalEvent2025SpringDailyAttendanceProps {
  isOpen: boolean;
  onChangeIsOpen?: ((isOpen: boolean) => void) | undefined;
}

const styleBox: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: "1",
  alignItems: "center",
  background: theme.gray_background,
  borderRadius: "12px",
  padding: "12px",
  gap: "12px",
};

const ModalEvent2025SpringDailyAttendance = ({
  isOpen,
  onChangeIsOpen,
}: ModalEvent2025SpringDailyAttendanceProps) => {
  const today = getToday();
  // const today = moment("2024-09-23", "YYYY-MM-DD"); // FIXME: 배포 전에 수정
  const endDate = moment("2025-03-13", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate);

  // const event2025SpringQuestComplete = useEvent2025SpringQuestComplete();

  const { isAgreeOnTermsOfEvent = false, completedQuests = [] } =
    useValueRecoilState("event2025SpringInfo") || {};

  const todayInitial = completedQuests?.filter(
    ({ questId, completedAt }) =>
      questId === "dailyAttendance" && moment(completedAt).isSame(today, "day")
  );

  useEffect(() => {
    const modalOpened =
      isEventDay && isAgreeOnTermsOfEvent && todayInitial.length === 0;

    if (onChangeIsOpen && modalOpened) {
      onChangeIsOpen(modalOpened); // 모달 열기 상태 변경
      // event2025SpringQuestComplete("dailyAttendance");
    }
  }, [isAgreeOnTermsOfEvent, todayInitial.length]);

  const [selectedChoice, setSelectedChoice] = useState(0);
  const todayQuestion = "오늘의 질문은 어쩌구저쩌구";
  const todayChoiceList = ["선택지 1", "선택지 2"];
  const todayImage = "https://picsum.photos/150/150";
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
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {todayQuestion}
        <img src={todayImage} style={{ width: "auto" }} />
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "4px",
          }}
        >
          <div style={styleBox}>
            {todayChoiceList[0]}
            <Button
              type={selectedChoice === 1 ? "white" : "purple"}
              disabled={false}
              css={{
                width: "100%",
                padding: "14px 0 13px",
                borderRadius: "12px",
                ...theme.font16_bold,
              }}
              onClick={() => {
                setSelectedChoice(1);
              }}
            >
              {selectedChoice === 1 ? "선택 완료" : "선택"}
            </Button>
          </div>
          <div style={styleBox}>
            {todayChoiceList[1]}
            <Button
              type={selectedChoice === 2 ? "white" : "purple"}
              disabled={false}
              css={{
                width: "100%",
                padding: "14px 0 13px",
                borderRadius: "12px",
                ...theme.font16_bold,
              }}
              onClick={() => {
                setSelectedChoice(2);
              }}
            >
              {selectedChoice === 2 ? "선택 완료" : "선택"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEvent2025SpringDailyAttendance;
