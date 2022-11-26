import React, { useEffect } from "react";
import { getToday10 } from "tools/moment";
import Date from "./Date";

const getCalendarDates = () => {
  const today = getToday10();
  const date = today.clone().subtract(1, "day");

  return Array.apply(null, Array(7)).map(() => {
    let available = null;
    if (date.isSame(today, "day")) {
      available = "today";
    }
    available = true;
    date.add(1, "day");
    return {
      year: date.year(),
      month: date.month() + 1,
      date: date.date(),
      index: date.day(),
      available,
    };
  });
};

type SelectDateType = {
  selectedDate: number;
  onClick: (x: number, y: number, z: number) => void;
};

const resizeEvent = () => {
  const week = document.querySelector<HTMLElement>(".select-week");
  if (!week) return;
  const width = (week.clientWidth - 36) / 7;
  week.style.height = `${Math.min(width, 48)}px`;
};

const SelectDate = (props: SelectDateType) => {
  useEffect(() => {
    window.addEventListener("resize", resizeEvent);
    resizeEvent();
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
          year={day.year}
          month={day.month}
          date={day.date}
          available={day.available}
          selected={day.date === props.selectedDate}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};

export default SelectDate;
