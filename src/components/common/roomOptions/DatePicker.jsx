import React, { Component, useState } from "react";
import { getToday10 } from "tools/moment";
import PropTypes from "prop-types";
import theme from "styles/theme";
import DottedLine from "components/common/DottedLine";
import MiniCircle from "components/common/MiniCircle";
import isMobile from "tools/isMobile";

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
    ...style,
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
    marginTop: "3px",
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
    if (props.available) {
      props.handler(props.year, props.month, props.date);

      const scrollTo =
        document.querySelector(".scrollTo").getBoundingClientRect().top +
        (window.scrollY + 56 + 46 + 15) -
        window.innerHeight;

      if (window.scrollY < scrollTo)
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
    }
  };

  if (!props.date) return <div style={style} />;
  return (
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
    this.state = {
      showNext: false,
      isOpen: true,
    };

    this.month1 = getDateInfo.getCurrent();
    this.month2 = getDateInfo.getNext();
    this.pickerRef = React.createRef(null);
    this.clicked = false;

    this.dateHandler = this.dateHandler.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);

    this.week = [
      { color: theme.red_text, text: "일" },
      { color: theme.black, text: "월" },
      { color: theme.black, text: "화" },
      { color: theme.black, text: "수" },
      { color: theme.black, text: "목" },
      { color: theme.black, text: "금" },
      { color: theme.blue_text, text: "토" },
    ];

    this.styleTop = () => {
      return {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        cursor: !this.state.isOpen ? "pointer" : undefined,
      };
    };
    this.styleInfo = {
      display: "flex",
      alignItems: "center",
      ...theme.font14,
    };
    this.styleIcon = {
      fontSize: "16px",
      margin: "0 6px 0 9px",
    };
    this.styleArrow = (disabled, type) => {
      return {
        width: "24px",
        height: "24px",
        opacity: type === "left" && !this.state.isOpen ? 0 : 1,
        fill: !this.state.isOpen || !disabled ? theme.purple : theme.gray_line,
        ...theme.cursor(this.state.isOpen && disabled),
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
  }

  dateHandler(year, month, date) {
    if (!this.clicked) this.clicked = true;
    this.props.handler(year, month, date);
  }

  handleClickOutside(event) {
    if (this.clicked && !this.pickerRef?.current.contains(event.target))
      this.setState({ isOpen: false });
  }

  resizeEvent() {
    const weeks = document.getElementsByClassName("datepicker-week");
    const width = (weeks[0].clientWidth - 36) / 7;
    [...weeks].map((week) => (week.style.height = `${width}px`));
    let selectorHeight =
      24 + (this.state.isOpen ? 32 + 1 + 10 + (width + 6) * weeks.length : 0);
    document.querySelector(".datepicker").style.height = `${selectorHeight}px`;
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
      if (this.state.isOpen) this.setState({ showNext: false });
    };
    const onClickNext = () => {
      if (this.state.isOpen) {
        this.setState({ showNext: true });
      } else {
        this.setState({ isOpen: true });
      }
    };
    const onClickTop = () => {
      this.clicked = false;
      if (!this.state.isOpen) this.setState({ isOpen: true });
    };

    return (
      <div
        className="datepicker"
        ref={this.pickerRef}
        style={{
          transition: "height 0.3s ease-in-out",
          margin: "-10px -15px",
          padding: "10px 15px",
        }}
      >
        <div style={this.styleTop()} onClick={onClickTop}>
          <div style={this.styleInfo}>
            <TodayRoundedIcon style={this.styleIcon} />
            날짜 : {year}년{" "}
            {this.state.isOpen ? month : this.props.selectedDate[1]}월{" "}
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
        <div style={{ marginBottom: "5px" }}>
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
    document.addEventListener("mouseup", this.handleClickOutside);
  }
  componentDidUpdate() {
    this.resizeEvent();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeEvent);
    document.removeEventListener("mouseup", this.handleClickOutside);
  }
}

DatePicker.propTypes = {
  // FIXME specify type
  selectedDate: PropTypes.array,
  handler: PropTypes.any,
};

export default DatePicker;
