import { useQuery } from "@/hooks/useTaxiAPI";

type DateProps = {
  year: number;
  month: number;
  day: number;
};

const DailyAttendanceQuizResult = ({ year, month, day }: DateProps) => {
  const [, dateData] =
    useQuery.get(`/events/2025spring/quizzes/${year}-${month}-${day}`) || {};

  return (
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
        <div>{"A"}</div>
        <div>{"B"}</div>
      </div>
    </div>
  );
};

export default DailyAttendanceQuizResult;
