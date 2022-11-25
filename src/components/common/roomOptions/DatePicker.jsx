import React, { Component, useState } from "react";
import { getToday10 } from "tools/moment";
import PropTypes from "prop-types";
import theme from "styles/theme";
import DottedLine from "components/common/DottedLine";
import MiniCircle from "components/common/MiniCircle";

import TodayRoundedIcon from "@material-ui/icons/TodayRounded";

const getCalendarDates = (startDate) => {
  const MAX_AVAILABLE_DATES = 14;
  const date = startDate.clone();
  date.subtract(date.day(), "day");

  const calendar = [];
  let datesCount = 0;

  while (datesCount < MAX_AVAILABLE_DATES) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      let available = null;
      if (date.isSame(startDate, "day")) {
        available = "today";
        datesCount++;
      } else if (
        datesCount < MAX_AVAILABLE_DATES &&
        date.isAfter(startDate, "day")
      ) {
        available = true;
        datesCount++;
      }
      week.push({
        year: date.year(),
        month: date.month() + 1,
        date: date.date(),
        available,
      });
      date.add(1, "day");
    }
    calendar.push(week);
  }
  return calendar;
};

const Date = (props) => {
  const [isHover, setHover] = useState(false);

  const style = {
    width: "calc((100% - 36px) / 7)",
    height: "100%",
  };
  const styleBox = {
    height: "100%",
    borderRadius: "6px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: props.selected
      ? isHover
        ? theme.purple_dark
        : theme.purple
      : props.available
      ? isHover
        ? theme.purple_hover
        : theme.purple_light
      : theme.gray_background,
    boxShadow: props.available
      ? props.selected
        ? theme.shadow_purple_button_inset
        : theme.shadow_purple_input_inset
      : undefined,
    ...theme.cursor(!props.available),
    transitionDuration: theme.duration,
  };
  const styleDate = {
    ...theme.font12,
    letterSpacing: undefined,
    marginTop: "1px",
    fontWeight: props.selected ? 500 : undefined,
    color: props.selected
      ? theme.white
      : props.available
      ? props.index === 0
        ? theme.red_text
        : props.index === 6
        ? theme.blue_text
        : theme.black
      : theme.gray_line,
  };
  const styleToday = {
    position: "absolute",
    top: "calc(50% + 8.5px)",
    left: "calc(50% - 2px)",
  };

  const onClick = () => {
    if (props.available) props.handler(props.year, props.month, props.date);
  };

  if (!props.date) return <div style={style} />;
  return (
    <div style={style}>
      <div
        style={styleBox}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
      >
        <div style={styleDate}>{props.date}</div>
        {props.available === "today" && (
          <div style={styleToday}>
            <MiniCircle type="date" isSelected={props.selected} />
          </div>
        )}
      </div>
    </div>
  );
};

Date.propTypes = {
  index: PropTypes.number,
  year: PropTypes.any,
  month: PropTypes.any,
  date: PropTypes.any,
  available: PropTypes.any,
  selected: PropTypes.any,
  handler: PropTypes.func,
};

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.week = [
      { color: theme.red_text, text: "일" },
      { color: theme.black, text: "월" },
      { color: theme.black, text: "화" },
      { color: theme.black, text: "수" },
      { color: theme.black, text: "목" },
      { color: theme.black, text: "금" },
      { color: theme.blue_text, text: "토" },
    ];

    this.styleTop = {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    };
    this.styleInfo = {
      display: "flex",
      alignItems: "center",
      ...theme.font14,
      padding: "5px 0",
    };
    this.styleIcon = {
      fontSize: "15px",
      margin: "0 6px 0 9px",
    };
    this.styleArrow = {
      width: "24px",
      height: "24px",
      fill: theme.purple,
      ...theme.cursor(),
    };
    this.styleArrowGrid = {
      width: "56px",
      display: "flex",
      justifyContent: "space-between",
    };
    this.styleMonth = {
      display: "flex",
      flexDirection: "column",
      rowGap: "6px",
    };
    this.styleDay = {
      display: "flex",
      margin: "12px 0 8px",
      columnGap: "6px",
    };
    this.styleDayItem = {
      width: "calc((100% - 36px) / 7)",
      fontSize: "10px",
      height: "12px",
      textAlign: "center",
    };
    this.styleWeek = {
      display: "flex",
      columnGap: "6px",
    };
  }

  dateHandler(year, month, date) {
    this.props.handler(year, month, date);
  }

  resizeEvent() {
    const weeks = document.getElementsByClassName("datepicker-week");
    if (weeks.length > 0) {
      const width = (weeks[0].clientWidth - 36) / 7;
      const height = `${Math.min(width, 48)}px`;
      for (let i = 0; i < weeks.length; i++) {
        weeks[i].style.height = height;
      }
    }
  }

  render() {
    const today = getToday10();
    const dateInfo = getCalendarDates(today);
    let year = "",
      month = "";

    if (dateInfo.length > 1) {
      year = dateInfo[1][0].year;
      month = dateInfo[1][0].month;
    }

    return (
      <>
        <div style={this.styleTop}>
          <div style={this.styleInfo}>
            <TodayRoundedIcon style={this.styleIcon} />
            날짜 : {year}년 {month}월
          </div>
        </div>
        <DottedLine direction="row" />
        <div style={this.styleDay}>
          {this.week.map((item, index) => (
            <div
              key={index}
              style={{
                ...this.styleDayItem,
                color: item.color,
                opacity: 0.632,
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
        <div style={this.styleMonth}>
          {dateInfo.map((item, index) => {
            return (
              <div
                key={index}
                style={{ ...this.styleWeek }}
                className="datepicker-week"
              >
                {item.map((item, index) => (
                  <Date
                    key={index}
                    index={index}
                    year={item.year}
                    month={item.month}
                    date={item.date}
                    available={item.available}
                    selected={item.date === this.props.selectedDate[2]}
                    handler={(x, y, z) => this.dateHandler(x, y, z)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </>
    );
  }
  componentDidMount() {
    this.resizeEvent();
    window.addEventListener("resize", this.resizeEvent);
  }
  componentDidUpdate() {
    this.resizeEvent();
    window.addEventListener("resize", this.resizeEvent);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeEvent);
  }
}

DatePicker.propTypes = {
  // FIXME specify type
  selectedDate: PropTypes.array,
  handler: PropTypes.func,
};

export default DatePicker;
