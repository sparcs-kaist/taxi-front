import { getToday10 } from "@tools/trans";

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
export default getDateInfo;
