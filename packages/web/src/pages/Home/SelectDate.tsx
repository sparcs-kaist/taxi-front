import { useEffect, useState } from "react";

import Date from "./Date";

import { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

const getWeekDates = () => {
  const today = getToday();
  const date = today.clone().subtract(1, "day");

  return Array.apply(null, Array(8)).map((_, index) => {
    if (!index) {
      return {
        year: date.year(),
        month: date.month(),
        date: date.date(),
        index: -1,
        type: "all" as const,
      };
    } else {
      date.add(1, "day");
      return {
        year: date.year(),
        month: date.month(),
        date: date.date(),
        index: date.day(),
        type: date.isSame(today, "day") ? ("today" as const) : null,
      };
    }
  });
};

type SelectDateProps = {
  selectedDate: [number, number, number];
  onClick: (date: [number, number, number]) => void;
};

const SelectDate = (props: SelectDateProps) => {
  const [weekHeight, setWeekHeight] = useState("30px");
  const week = getWeekDates();

  const resizeEvent = () => {
    const week = document.querySelector<HTMLElement>(".select-week");
    if (!week) return;
    const width = (week.clientWidth - 42) / 8;
    setWeekHeight(`${Math.min(width, 44)}px`);
  };
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return (
    <>
      <div
        className="select-week"
        css={{ display: "flex", columnGap: "6px", alignItems: "end" }}
      >
        {week.map((day, index) => (
          <Date
            key={index}
            index={day.index}
            date={[day.year, day.month, day.date]}
            type={day.type}
            width={weekHeight as PixelValue}
            selected={day.date === props.selectedDate[2]}
            onClick={props.onClick}
          />
        ))}
      </div>
      <div
        style={{
          ...theme.font14,
          color: theme.purple,
          margin: "20px 4px 15px",
        }}
      >
        날짜 :{" "}
        {week[0].date === props.selectedDate[2]
          ? `${week[1].month + 1}월 ${week[1].date}일 ~ ${
              week[1].month !== week[7].month ? `${week[7].month + 1}월 ` : ""
            }${week[7].date}일`
          : `${props.selectedDate[1] + 1}월 ${props.selectedDate[2]}일`}
      </div>
    </>
  );
};

export default SelectDate;
