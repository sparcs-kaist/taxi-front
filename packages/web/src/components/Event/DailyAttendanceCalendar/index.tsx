import PropTypes from "prop-types";
import { PureComponent, memo, useState } from "react";

import MiniCircle from "@/components/MiniCircle";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

const getCalendarDates = () => {
  const startDate = moment("2024-09-06", "YYYY-MM-DD");
  const endDate = moment("2024-09-24", "YYYY-MM-DD");
  const endDateOfMonth = moment("2024-09-30", "YYYY-MM-DD");
  const today = getToday();
  // const today = moment("2024-09-10", "YYYY-MM-DD"); // FIXME: 배포 전에 수정
  const date = startDate.clone();
  date.subtract(date.day(), "day");

  const calendar = [];

  for (let i = 0; i < 5; i++) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      let available = null;
      let checked = false;
      if (date.isAfter(startDate) && date.isBefore(today)) {
        available = "past";
      } else if (date.isBefore(endDate) && date.isAfter(startDate, "day")) {
        available = true;
      }
      week.push({
        year: date.year(),
        month: date.month() + 1,
        date: date.date(),
        available,
        checked,
      });
      if (date.isSame(endDateOfMonth)) {
        break;
      }
      date.add(1, "day");
    }
    calendar.push(week);
  }
  return calendar;
};
type DateProps = {
  index: number;
  year: any;
  month: any;
  date: any;
  available: any;
  handler: (year: any, month: any, date: any) => {};
};

const Date = (props: DateProps) => {
  const style = {
    width: "calc((100% - 36px) / 7)",
    aspectRatio: "1 / 1",
    height: "100%",
  };
  const styleBox = {
    ...style,
    borderRadius: "6px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: props.available ? theme.white : theme.gray_background,
    // background-image: ;
    transitionDuration: theme.duration,
  };
  const styleDate = {
    ...theme.font12,
    letterSpacing: undefined,
    marginTop: "3px",
    color:
      props.available === "past" || !props.available
        ? theme.gray_line
        : props.index === 0
        ? theme.red_text
        : props.index === 6
        ? theme.blue_text
        : theme.black,
  };
  const styleToday = {
    position: "absolute",
    top: "calc(50% + 8px)",
    left: "calc(50% - 2px)",
  };

  if (!props.date) return <div style={style} />;
  return (
    <div style={styleBox}>
      <div style={styleDate}>{props.date}</div>
      {props.available === "startDate" && (
        <div style={styleToday}>
          <MiniCircle type="date" />
        </div>
      )}
    </div>
  );
};
const MemoizedDate = memo(Date);

const DailyAttendanceCalendar = () => {
  const dateInfo = getCalendarDates();

  console.log(dateInfo);

  const styleMonth = {
    display: "flex",
    flexDirection: "column",
    rowGap: "6px",
    marginBottom: "5px",
  };
  const styleDay = {
    display: "flex",
    margin: "12px 0 8px",
    columnGap: "6px",
  };
  const styleDayItem = {
    width: "calc((100% - 36px) / 7)",
    fontSize: "10px",
    height: "12px",
    textAlign: "center",
  };
  const styleWeek = {
    display: "flex",
    columnGap: "6px",
  };

  const week: { color: string; text: string }[] = [
    { color: theme.red_text, text: "일" },
    { color: theme.black, text: "월" },
    { color: theme.black, text: "화" },
    { color: theme.black, text: "수" },
    { color: theme.black, text: "목" },
    { color: theme.black, text: "금" },
    { color: theme.blue_text, text: "토" },
  ];

  return (
    <div
      className="datepicker"
      style={{
        transition: "max-height 0.3s ease-in-out",
        margin: "-10px -15px",
        padding: "10px 15px",
      }}
    >
      <div style={styleDay}>
        {week.map((item, index) => (
          <div
            key={index}
            style={{
              ...styleDayItem,
              color: item.color,
              opacity: 0.632,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
      <div className="month" style={styleMonth}>
        {dateInfo.map((item, index) => {
          return (
            <div key={index} style={styleWeek}>
              {item.map((item, index) => (
                <MemoizedDate
                  key={index}
                  index={index}
                  year={item.year}
                  month={item.month}
                  date={item.date}
                  available={item.available}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyAttendanceCalendar;
