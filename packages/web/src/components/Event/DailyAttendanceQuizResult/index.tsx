import { CSSProperties, useEffect } from "react";

import { useQuery } from "@/hooks/useTaxiAPI";

import Modal from "@/components/Modal";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

type DateAttendanceModalProps = {
  year: number;
  month: number;
  day: number;
  isOpen: boolean;
  onChangeIsOpen?: ((isOpen: boolean) => void) | undefined;
};

const styleBox: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: "1",
  alignItems: "center",
  textAlign: "center",
  background: theme.gray_background,
  borderRadius: "12px",
  padding: "12px",
  gap: "12px",
  lineHeight: "30px",
  whiteSpace: "pre",
};

const DailyAttendanceQuizResult = ({
  year,
  month,
  day,
  isOpen,
  onChangeIsOpen,
}: DateAttendanceModalProps) => {
  const today = getToday();
  const selectedDate = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
  const isPast = selectedDate.isBefore(today);
  const isToday =
    selectedDate.isSame(today, "year") &&
    selectedDate.isSame(today, "month") &&
    selectedDate.isSame(today, "day");
  const [error, dateData, isLoading] =
    useQuery.get(
      `/events/2025spring/quizzes/${year}-${`${month}`.padStart(
        2,
        "0"
      )}-${`${day}`.padStart(2, "0")}`,
      { skip: !isPast }
    ) || {};
  const [todayError, todayData, todayIsLoading] =
    useQuery.get(`/events/2025spring/quizzes/today`, { skip: !isToday }) || {};
  const setAlert = useSetRecoilState(alertAtom);

  useEffect(() => {
    if (!isPast && !isToday && isOpen) {
      setAlert("아직 공개되지 않은 질문입니다.");
      onChangeIsOpen && onChangeIsOpen(false);
    }
  }, [isPast, isToday, isOpen, setAlert, onChangeIsOpen]);

  return (
    (isPast || isToday) && (
      <Modal
        padding="16px 12px 12px"
        isOpen={isOpen}
        onChangeIsOpen={onChangeIsOpen}
        css={{ display: "flex", flexDirection: "column" }}
      >
        {isToday
          ? !todayError &&
            !todayIsLoading && (
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {`오늘의 질문`}
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
                  <div style={styleBox}>{todayData.optionA}</div>
                  <div style={styleBox}>{todayData.optionB}</div>
                </div>
              </div>
            )
          : !error &&
            !isLoading && (
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {`${year}년 ${month}월 ${day}일의 질문`}
                <div>{dateData.quizTitle}</div>
                <div>{dateData.quizContent}</div>
                <img src={dateData.quizImage} style={{ width: "auto" }} />
                <div
                  css={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    gap: "4px",
                  }}
                >
                  <div style={styleBox}>
                    {dateData.optionA}
                    {"\n"}
                    {dateData.pickRatio.A + "%"}
                  </div>
                  <div style={styleBox}>
                    {dateData.optionB}
                    {"\n"}
                    {dateData.pickRatio.B + "%"}
                  </div>
                </div>
              </div>
            )}
      </Modal>
    )
  );
};

export default DailyAttendanceQuizResult;
