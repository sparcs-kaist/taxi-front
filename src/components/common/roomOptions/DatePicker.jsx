import React, { Component, useState } from "react";
import { getToday10 } from "tools/moment";
import PropTypes from "prop-types";
import theme from "styles/theme";
import DottedLine from "components/common/DottedLine";
import MiniCircle from "components/common/MiniCircle";

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
    top: "calc(50% + 8px)",
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
    };
    this.styleIcon = {
      fontSize: "15px",
      margin: "0 6px 0 9px",
    };
    this.styleArrow = (disabled, type) => {
      return {
        width: "24px",
        height: "24px",
        opacity: type === "left" && !this.state.isOpen ? 0 : 1,
        fill: !this.state.isOpen || !disabled ? theme.purple : theme.gray_line,
        ...theme.cursor(disabled),
        transform: this.state.isOpen
          ? undefined
          : type === "right"
          ? "rotate(90deg)"
          : "translate(32px, 0) rotate(-90deg)",
        transition: "all 0.3s ease-out",
      };
    };
    this.styleArrowGrid = {
      width: "56px",
      display: "flex",
      justifyContent: "flex-end",
      columnGap: "8px",
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
      showNext: false,
      isOpen: true,
      timeoutId: null,
    };
    this.month1 = getDateInfo.getCurrent();
    this.month2 = getDateInfo.getNext();
  }
  dateHandler(year, month, date) {
    this.props.handler(year, month, date);
    if (this.state.timeoutId) clearTimeout(this.state.timeoutId);
    const timeoutId = setTimeout(() => {
      this.setState({ isOpen: false });
    }, 1500);
    this.setState({ timeoutId });
  }

  resizeEvent() {
    const weeks = document.getElementsByClassName("datepicker-week");
    let selectorHeight = -6 + 32 + 1 + 10 + 24;
    if (weeks.length > 0) {
      const width = (weeks[0].clientWidth - 36) / 7;
      const height = `${Math.min(width, 48)}px`;
      selectorHeight += (Math.min(width, 48) + 6) * weeks.length + 6;
      for (let i = 0; i < weeks.length; i++) {
        weeks[i].style.height = height;
      }
    }
    const picker = document.querySelector(".datepicker");
    if (this.state.isOpen) {
      picker.style.height = `${selectorHeight}px`;
    } else {
      picker.style.height = "24px";
    }
  }

  render() {
    const dateInfo = this.state.showNext ? this.month2 : this.month1;
    let year = "",
      month = "";
    console.log(dateInfo);
    if (dateInfo.length > 1) {
      year = dateInfo[1][0].year;
      month = dateInfo[1][0].month;
    }

    const onClickBack = () => {
      if (this.state.timeoutId) clearTimeout(this.state.timeoutId);
      if (this.state.isOpen) this.setState({ showNext: false });
    };
    const onClickNext = () => {
      if (this.state.timeoutId) clearTimeout(this.state.timeoutId);
      if (this.state.isOpen) {
        this.setState({ showNext: true });
      } else {
        this.setState({ isOpen: true });
      }
    };

    return (
      <div
        className="datepicker"
        style={{
          transition: "height 0.3s ease-in-out",
        }}
      >
        <div style={this.styleTop}>
          <div style={this.styleInfo}>
            <TodayRoundedIcon style={this.styleIcon} />
            날짜 : {year}년 {month}월{" "}
            {!this.state.isOpen && this.props.selectedDate[2] + "일"}
          </div>
          <div style={this.styleArrowGrid}>
            <KeyboardArrowLeftRoundedIcon
              style={this.styleArrow(!this.state.showNext, "left")}
              onClick={onClickBack}
            />
            <KeyboardArrowRightRoundedIcon
              style={this.styleArrow(this.state.showNext, "right")}
              onClick={onClickNext}
            />
          </div>
        </div>
        <div
          className="datepicker-selector"
          style={{
            opacity: this.state.isOpen ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            marginBottom: "5px",
          }}
        >
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
                      month === this.props.selectedDate[1] &&
                      item.date === this.props.selectedDate[2]
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
        </div>
      </div>
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
