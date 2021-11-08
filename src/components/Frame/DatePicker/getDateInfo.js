const widing = (date, currentMonth = false) => {
  const year = date.getFullYear(),
    month = date.getMonth() + 1;
  const day = date.getDate();
  const w = date,
    result = [];

  while (w.getDate() > 1) w.setDate(w.getDate() - 1);
  while (w.getMonth() + 1 === month) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (w.getMonth() + 1 === month && w.getDay() === i) {
        let available = null;
        if (w.getDate() === day && currentMonth) available = "today";
        else if (w.getDate() >= day) available = true;
        week.push({
          year: year,
          month: month,
          date: w.getDate(),
          available: available,
        });
        w.setDate(w.getDate() + 1);
      } else {
        week.push({ date: null });
      }
    }
    result.push(week);
  }
  return result;
};

const getCurrent = () => {
  const today = new Date();
  const currentMonth = widing(today, true);
  return currentMonth;
};
const getNext = () => {
  let date = new Date();
  const month = date.getMonth() + 1;
  while (date.getMonth() + 1 === month) date.setDate(date.getDate() + 1);
  const nextMonth = widing(date);
  return nextMonth;
};

const getDateInfo = { getCurrent, getNext };
export default getDateInfo;
