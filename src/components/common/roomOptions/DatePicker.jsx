import React, { Component, useState } from "react";
import { getToday10 } from "tools/moment";
import PropTypes from "prop-types";
import { theme } from "styles/theme";
import DottedLine from "components/common/DottedLine";

import TodayRoundedIcon from "@material-ui/icons/TodayRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";

const widing = (startDate, currentMonth = false) => {
  const date = startDate.clone().date(1);
  const year = date.year();
  const month = date.month() + 1;
  const calendar = [];

  while (date.month() + 1 === month) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (date.month() + 1 === month && date.day() === i) {
        let available = null;
        if (date.date() === startDate.date() && currentMonth) {
          available = "today";
        } else if (date.date() >= startDate.date() || !currentMonth) {
          available = true;
        }

        week.push({
          year: year,
          month: month,
          date: date.date(),
          available: available,
        });
        date.add(1, "day");
      } else {
        week.push({ date: null });
      }
    }
    calendar.push(week);
  }
  return calendar;
};

const getCurrent = () => {
  const today = getToday10();
  const currentMonth = widing(today, true);
  return currentMonth;
};

const getNext = () => {
  const date = getToday10().add(1, "month");
  const nextMonth = widing(date, false);
  return nextMonth;
};

const getDateInfo = { getCurrent, getNext };

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
    cursor: theme.cursor(!props.available),
    transitionDuration: theme.duration,
  };
  const styleDate = {
    ...theme.font12,
    marginTop: "1px",
    fontWeight: props.selected ? 500 : undefined,
    color: props.selected
      ? theme.white
      : props.available
      ? theme.black
      : theme.gray_line,
  };
  const styleToday = {
    width: "3px",
    height: "3px",
    borderRadius: "50%",
    position: "absolute",
    top: "calc(50% + 8.5px)",
    left: "calc(50% - 1.5px)",
    background:
      props.available === "today"
        ? props.selected
          ? theme.white
          : theme.purple_disabled
        : undefined,
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
        <div style={styleToday} />
      </div>
    </div>
  );
};

Date.propTypes = {
  available: PropTypes.any,
  selected: PropTypes.any,
  handler: PropTypes.func,
  year: PropTypes.any,
  month: PropTypes.any,
  date: PropTypes.any,
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
      { color: theme.red_text, text: "토" },
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
    };
    this.styleIcon = {
      fontSize: "15px",
      margin: "0 6px 0 9px",
    };
    this.styleArrow = {
      width: "24px",
      height: "24px",
      fill: theme.purple,
      cursor: theme.cursor(false),
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

    this.state = {
      selectedDate: props.selectedDate,
      showNext: false,
    };
    this.month1 = getDateInfo.getCurrent();
    this.month2 = getDateInfo.getNext();
  }
  dateHandler(year, month, date) {
    this.setState({ selectedDate: [year, month, date] });
    if (this.props.handler) {
      this.props.handler(year, month, date);
    }
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
    const dateInfo = this.state.showNext ? this.month2 : this.month1;
    let year = "",
      month = "";

    if (dateInfo.length > 1) {
      year = dateInfo[1][0].year;
      month = dateInfo[1][0].month;
    }

    const onClickBack = () => {
      this.setState({ showNext: false });
    };
    const onClickNext = () => {
      this.setState({ showNext: true });
    };

    return (
      <>
        <div style={this.styleTop}>
          <div style={this.styleInfo}>
            <TodayRoundedIcon style={this.styleIcon} />
            날짜 : {year}년 {month}월
          </div>
          <div style={this.styleArrowGrid}>
            <KeyboardArrowLeftRoundedIcon
              style={this.styleArrow}
              onClick={onClickBack}
            />
            <KeyboardArrowRightRoundedIcon
              style={this.styleArrow}
              onClick={onClickNext}
            />
          </div>
        </div>
        <DottedLine direction="row" />
        <div style={this.styleDay}>
          {this.week.map((item, index) => {
            return (
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
            );
          })}
        </div>
        <div style={this.styleMonth}>
          {dateInfo.map((item, index) => {
            return (
              <div
                key={index}
                style={{ ...this.styleWeek }}
                className="datepicker-week"
              >
                {item.map((item, index) => {
                  let selected = false;
                  if (
                    month === this.state.selectedDate[1] &&
                    item.date === this.state.selectedDate[2]
                  )
                    selected = true;
                  return (
                    <Date
                      key={index}
                      index={index}
                      year={item.year}
                      month={item.month}
                      date={item.date}
                      available={item.available}
                      selected={selected}
                      handler={(x, y, z) => this.dateHandler(x, y, z)}
                    />
                  );
                })}
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
  handler: PropTypes.any,
};

export default DatePicker;
