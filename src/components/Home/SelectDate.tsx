import React, { useEffect } from "react";
import { getToday10 } from "tools/moment";
import Date from "./Date";

const getCalendarDates = () => {
  const today = getToday10();
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

const resizeEvent = () => {
  const week = document.querySelector<HTMLElement>(".select-week");
  if (!week) return;
  const width = (week.clientWidth - 42) / 8;
  week.style.height = `${Math.min(width, 48)}px`;
};

type SelectDateProps = {
  selectedDate: number;
  onClick: (date: [number, number, number]) => void;
};

const SelectDate = (props: SelectDateProps) => {
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);
  return (
    <div className="select-week" style={{ display: "flex", columnGap: "6px" }}>
      {getCalendarDates().map((day, index) => (
        <Date
          key={index}
          index={day.index}
          date={[day.year, day.month, day.date]}
          type={day.type}
          selected={day.date === props.selectedDate}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};

export default SelectDate;
