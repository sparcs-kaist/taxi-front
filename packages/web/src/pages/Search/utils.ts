export const isValidQuery = (query: any) => {
  if (typeof query !== "object") return false;

  const allowedKeys = ["place", "date", "time", "maxPeople", "name", "page"];
  const keys = Object.keys(query);

  if (keys.length > allowedKeys.length) return false;
  if (keys.some((key) => !allowedKeys.includes(key))) return false;
  if (keys.includes("place")) {
    if (Array.isArray(query.place) && query.place.length !== 2) return false;
    if (typeof query.place[0] !== "string") return false;
    if (typeof query.place[1] !== "string") return false;
  }
  if (keys.includes("date")) {
    if (Array.isArray(query.date) && query.date.length !== 3) return false;
    const year = parseInt(query.date[0]);
    const month = parseInt(query.date[1]);
    const day = parseInt(query.date[2]);
    if (isNaN(year) || year <= 2000) return false;
    if (isNaN(month) || month < 1 || month > 12) return false;
    if (isNaN(day) || day < 1 || day > 31) return false;
  }
  if (keys.includes("time")) {
    if (Array.isArray(query.time) && query.time.length !== 2) return false;
    const hour = parseInt(query.time[0]);
    const minute = parseInt(query.time[1]);
    if (isNaN(hour) || hour < 0 || hour > 23) return false;
    if (isNaN(minute) || minute < 0 || minute > 59) return false;
  }
  if (keys.includes("maxPeople")) {
    const maxPeople = parseInt(query.maxPeople);
    if (isNaN(maxPeople) || maxPeople < 0 || maxPeople > 5) return false;
  }
  if (keys.includes("name")) {
    if (typeof query.name !== "string") return false;
  }
  if (!keys.includes("page")) return false;
  return true;
};
