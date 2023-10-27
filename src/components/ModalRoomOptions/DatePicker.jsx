import DottedLine from "@/components/DottedLine";
import MiniCircle from "@/components/MiniCircle";
import useHoverProps from "@/hooks/theme/useHoverProps";
import { getToday10 } from "@/tools/moment";
import theme from "@/tools/theme";
import PropTypes from "prop-types";
import { PureComponent, createRef, memo } from "react";

import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

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
  const [hoverProps, isHover] = useHoverProps();

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
          .top + // 화면 상에서 버튼의 현재 위치
        window.scrollY + // 스크롤 위치
        (46 + 15 + 56) - // 버튼의 높이 + 버튼과 네비게이션 사이의 간격 + 네비게이션 높이
        window.innerHeight; // - 화면 높이

      if (window.scrollY < scrollTo)
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
    }
  };

  if (!props.date) return <div style={style} />;
  return (
    <div style={styleBox} onClick={onClick} {...hoverProps}>
      <div style={styleDate}>{props.date}</div>
      {props.available === "today" && (
        <div style={styleToday}>
          <MiniCircle type="date" isSelected={props.selected} />
        </div>
      )}
    </div>
  );
};
const MemoizedDate = memo(Date);

Date.propTypes = {
  index: PropTypes.number,
  year: PropTypes.any,
  month: PropTypes.any,
  date: PropTypes.any,
  available: PropTypes.any,
  selected: PropTypes.any,
  handler: PropTypes.func,
};

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      // maxHeight: undefined,
    };

    this.pickerRef = createRef(null);
    this.clicked = false;

    this.dateHandler = this.dateHandler.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onClickTop = this.onClickTop.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);

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
      marginBottom: "5px",
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

  handleMaxHeight(event, callback) {
    event.stopPropagation();
    const monthHeight =
      document.getElementsByClassName("month")[0]?.clientHeight ?? 0;
    this.setState({ maxHeight: 24 + 10 + 1 + 32 + monthHeight + 5 }, callback);
  }

  onOpen(event) {
    this.handleMaxHeight(event, () =>
      this.setState({ isOpen: true }, () => {
        setTimeout(() => this.setState({ maxHeight: undefined }), 300);
      })
    );
  }

  onClose(event) {
    this.handleMaxHeight(event, () =>
      setTimeout(() => this.setState({ isOpen: false }), 0)
    );
  }

  onClickTop(event) {
    if (this.state.isOpen) return;
    this.clicked = false;
    this.onOpen(event);
  }

  onClickOutside(event) {
    if (this.clicked && !this.pickerRef?.current.contains(event.target))
      this.onClose(event);
  }

  render() {
    const dateInfo = getCalendarDates();
    const [selectedYear, selectedMonth, selectedDate] = this.props.selectedDate;

    return (
      <div
        className="datepicker"
        ref={this.pickerRef}
        style={{
          transition: "max-height 0.3s ease-in-out",
          margin: "-10px -15px",
          padding: "10px 15px",
          maxHeight: this.state.isOpen ? this.state.maxHeight : 24,
          cursor: !this.state.isOpen ? "pointer" : undefined,
        }}
        onClick={this.onClickTop}
      >
        <div style={this.styleTop}>
          <div style={this.styleInfo}>
            <TodayRoundedIcon style={this.styleIcon} />
            날짜 : {selectedYear}년 {selectedMonth}월 {selectedDate}일
          </div>
          {this.state.isOpen ? (
            <UnfoldLessRoundedIcon
              style={this.styleArrow}
              onClick={this.onClose}
            />
          ) : (
            <UnfoldMoreRoundedIcon
              style={this.styleArrow}
              onClick={this.onOpen}
            />
          )}
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
        <div className="month" style={this.styleMonth}>
          {dateInfo.map((item, index) => {
            return (
              <div key={index} style={this.styleWeek}>
                {item.map((item, index) => (
                  <MemoizedDate
                    key={index}
                    index={index}
                    year={item.year}
                    month={item.month}
                    date={item.date}
                    available={item.available}
                    selected={item.date === selectedDate}
                    handler={this.dateHandler}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  componentDidMount() {
    document.addEventListener("mouseup", this.onClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.onClickOutside);
  }
}

DatePicker.propTypes = {
  selectedDate: PropTypes.array,
  handler: PropTypes.func,
};

export default DatePicker;
