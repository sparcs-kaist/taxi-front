import { useEffect, useState } from "react";
import { CSSProperties } from "react";

import { useEvent2025SpringCancelAnswer } from "@/hooks/event/useEvent2025SpringCancelAnswer";
import { useEvent2025SpringQuestComplete } from "@/hooks/event/useEvent2025SpringQuestComplete";
import { useEvent2025SpringSubmitAnswer } from "@/hooks/event/useEvent2025SpringSubmitAnswer";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useQuery } from "@/hooks/useTaxiAPI";

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

  const event2025SpringQuestComplete = useEvent2025SpringQuestComplete();

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
    }
  }, [isAgreeOnTermsOfEvent, todayInitial.length]);

  const [userError, userData, userIsLoading] =
    useQuery.get("/events/2025spring/quizzes/todayAnswer", {}) || {};
  const [selectedChoice, setSelectedChoice] = useState("");
  const [error, todayData, isLoading] =
    useQuery.get("/events/2025spring/quizzes/today", {}) || {};

  const submitAnswer = useEvent2025SpringSubmitAnswer();
  const cancelAnswer = useEvent2025SpringCancelAnswer();

  const handleClose = async () => {
    if (selectedChoice !== "") {
      if (!userError && !userIsLoading) {
        if (userData.answer !== null) {
          await cancelAnswer();
        }
      }
      await submitAnswer(selectedChoice);
      event2025SpringQuestComplete("dailyAttendance");
    }
  };

  return (
    !error &&
    !isLoading && (
      <Modal
        padding="16px 12px 12px"
        isOpen={isOpen}
        onChangeIsOpen={onChangeIsOpen}
        onClose={handleClose}
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
          <div>{todayData.quizTitle}</div>
          <div>{todayData.quizContent}</div>
          <img src={todayData.quizImage} style={{ width: "auto" }} />
          <div
            css={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "4px",
            }}
          >
            <div style={styleBox}>
              {"A"}
              <Button
                type={selectedChoice === "A" ? "white" : "purple"}
                disabled={false}
                css={{
                  width: "100%",
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font16_bold,
                }}
                onClick={() => {
                  setSelectedChoice("A");
                }}
              >
                {selectedChoice === "A" ? "선택 완료" : "선택"}
              </Button>
            </div>
            <div style={styleBox}>
              {"B"}
              <Button
                type={selectedChoice === "B" ? "white" : "purple"}
                disabled={false}
                css={{
                  width: "100%",
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font16_bold,
                }}
                onClick={() => {
                  setSelectedChoice("B");
                }}
              >
                {selectedChoice === "B" ? "선택 완료" : "선택"}
              </Button>
            </div>
          </div>
          <div>
            {selectedChoice === "A" || selectedChoice === "B"
              ? "출석 완료되었습니다."
              : ""}
          </div>
        </div>
      </Modal>
    )
  );
};

export default ModalEvent2025SpringDailyAttendance;
