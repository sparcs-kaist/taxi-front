import React, { Component, useState } from "react";
import { useSpring, animated } from "react-spring";
import { getToday10 } from "@tools/trans";
import PropTypes from "prop-types";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

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
    overflow: "hidden",
  };

  let styleBox = {
    height: "100%",
    borderRadius: "6px",
    background: "#fafafa",
    position: "relative",
    display: "flex",
    alignItems: "center",
  };
  let className = "";
  let styleDate = {
    width: "100%",
    textAlign: "center",
    fontSize: "12px",
    marginTop: "1px",
    color: "#C8C8C8",
  };
  let styleToday = {
    width: "3px",
    height: "3px",
    borderRadius: "1.5px",
    position: "absolute",
    top: "calc(50% + 8.5px)",
    left: "calc(50% - 1.5px)",
  };

  if (props.available) {
    styleBox.boxShadow = "inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)";
    styleBox.background = isHover ? "#F4EAF6" : "#FAF6FB";
    className = "BTNC";
    styleDate.color = "#323232";
    if (props.available === "today") styleToday.background = "#B89DBD";
  } else {
    styleBox.cursor = "not-allowed";
  }
  if (props.selected) {
    styleBox.boxShadow = "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.25)";
    styleBox.background = isHover ? "#572A5E" : "#6E3678";
    styleDate.color = "white";
    styleDate.fontWeight = 500;
    if (props.available === "today") styleToday.background = "white";
  }

  const onClick = () => {
    if (props.available) props.handler(props.year, props.month, props.date);
  };
  const background = useSpring({
    background: styleBox.background,
    config: { duration: 100 },
  });

  if (!props.date) return <div style={style} />;
  return (
    <div style={style}>
      <animated.div
        style={{ ...styleBox, ...background }}
        className={className}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
      >
        <div style={styleDate}>{props.date}</div>
        <div style={styleToday} />
      </animated.div>
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
      { color: "#DD616E", text: "일" },
      { color: "#323232", text: "월" },
      { color: "#323232", text: "화" },
      { color: "#323232", text: "수" },
      { color: "#323232", text: "목" },
      { color: "#323232", text: "금" },
      { color: "#DD616E", text: "토" },
    ];

    this.styleLayTop = {
      height: "25px",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
      paddingRight: "1px",
    };
    this.styleLayInfo = {
      display: "flex",
      alignItems: "center",
      paddingTop: "1px",
    };
    this.styleLayTopBorder = {
      height: "0.5px",
      backgroundImage:
        "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
      backgroundSize: "10px 1px",
    };
    this.styleLayTopImg = {
      width: "14px",
      height: "14px",
      marginLeft: "9px",
      marginBottom: "1px",
    };
    this.styleLayTopTxt = {
      fontSize: "14px",
      marginLeft: "6px",
    };
    this.styleLayArrow = {
      width: "25px",
      height: "25px",
      fill: "var(--purple)",
    };
    this.styleLayArrowGrid = {
      width: "60px",
      display: "flex",
      justifyContent: "space-between",
    };
    this.styleLayWeek = {
      height: "12px",
      display: "flex",
      marginTop: "10.5px",
      marginBottom: "8px",
      gap: "6px",
    };
    this.styleWeekItem = {
      width: "calc((100% - 36px) / 7)",
      fontSize: "10px",
      height: "12px",
      textAlign: "center",
    };
    this.styleLayOneWeek = {
      display: "flex",
      marginBottom: "6px",
      gap: "6px",
    };

    this.state = {
      selectedDate: [undefined, undefined, undefined],
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
      const height = `${Math.min(width, 56)}px`;
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
        <div style={this.styleLayTop}>
          <div style={this.styleLayInfo}>
            <CalendarTodayIcon style={this.styleLayTopImg} />
            <div style={this.styleLayTopTxt}>
              날짜 : {year}년 {month}월
            </div>
          </div>
          <div style={this.styleLayArrowGrid}>
            <KeyboardArrowLeftIcon
              style={this.styleLayArrow}
              className="BTNC"
              onClick={onClickBack}
            />
            <KeyboardArrowRightIcon
              style={this.styleLayArrow}
              className="BTNC"
              onClick={onClickNext}
            />
          </div>
        </div>
        <div style={this.styleLayTopBorder} />
        <div style={this.styleLayWeek}>
          {this.week.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  ...this.styleWeekItem,
                  color: item.color,
                  opacity: 0.632,
                }}
              >
                {item.text}
              </div>
            );
          })}
        </div>

        {dateInfo.map((item, index) => {
          return (
            <div
              key={index}
              style={{ ...this.styleLayOneWeek }}
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
  handler: PropTypes.any,
};

export default DatePicker;
