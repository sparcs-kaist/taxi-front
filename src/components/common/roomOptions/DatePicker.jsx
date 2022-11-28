import React, { Component, useState } from "react";
import { getToday10 } from "tools/moment";
import PropTypes from "prop-types";
import theme from "styles/theme";
import DottedLine from "components/common/DottedLine";
import MiniCircle from "components/common/MiniCircle";
import isMobile from "tools/isMobile";

import TodayRoundedIcon from "@material-ui/icons/TodayRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";

const getCalendarDates = () => {
  const MAX_AVAILABLE_DATES = 14;
  const today = getToday10();
  const date = today.clone();
  date.subtract(date.day(), "day");

  const calendar = [];
  let datesCount = 0;

  while (datesCount < MAX_AVAILABLE_DATES) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      let available = null;
      if (date.isSame(today, "day")) {
        available = "today";
        datesCount++;
      } else if (
        datesCount < MAX_AVAILABLE_DATES &&
        date.isAfter(today, "day")
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
        document.querySelector(".scroll-to-button").getBoundingClientRect()
          .top +
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

    this.pickerRef = React.createRef(null);
    this.clicked = false;

    this.dateHandler = this.dateHandler.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);
    this.onClickTop = this.onClickTop.bind(this);

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
      fontSize: "16px",
      margin: "0 6px 0 9px",
    };
    this.styleArrow = {
      width: "24px",
      height: "24px",
      fill: theme.purple,
      ...theme.cursor(),
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
    const width = (Math.min(360, weeks[0].clientWidth) - 36) / 7;
    [...weeks].map((week) => (week.style.height = `${width}px`));
    let selectorHeight =
      24 + (this.state.isOpen ? 32 + 1 + 10 + (width + 6) * weeks.length : 0);
    document.querySelector(".datepicker").style.height = `${selectorHeight}px`;
  }

  onClickTop() {
    this.clicked = false;
    if (!this.state.isOpen) this.setState({ isOpen: true });
  }

  render() {
    const dateInfo = getCalendarDates();
    const [selectedYear, selectedMonth, selectedDate] = this.props.selectedDate;

    return (
      <div
        className="datepicker"
        ref={this.pickerRef}
        style={{
          transition: "height 0.3s ease-in-out",
          margin: "-10px -15px",
          padding: "10px 15px",
          cursor: !this.state.isOpen ? "pointer" : undefined,
        }}
        onClick={this.onClickTop}
      >
        <div style={this.styleTop} onClick={this.onClickTop}>
          <div style={this.styleInfo}>
            <TodayRoundedIcon style={this.styleIcon} />
            날짜 : {selectedYear}년 {selectedMonth}월 {selectedDate}일
          </div>
          {this.state.isOpen ? (
            <UnfoldLessRoundedIcon
              style={this.styleArrow}
              onClick={() => this.setState({ isOpen: false })}
            />
          ) : (
            <UnfoldMoreRoundedIcon
              style={this.styleArrow}
              onClick={() => this.setState({ isOpen: true })}
            />
          )}
          {/* <KeyboardArrowLeftRoundedIcon
            style={this.styleArrow(!this.state.showNext, "left")}
            onClick={onClickBack}
          />
          <KeyboardArrowRightRoundedIcon
            style={this.styleArrow(this.state.showNext, "right")}
            onClick={onClickNext}
          /> */}
        </div>
        <div style={{ marginBottom: "5px" }}>
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
                      selected={item.date === selectedDate}
                      handler={(x, y, z) => this.dateHandler(x, y, z)}
                    />
                  ))}
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
  selectedDate: PropTypes.array,
  handler: PropTypes.func,
};

export default DatePicker;
