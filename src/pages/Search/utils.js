export const isSearchAll = (q) => {
  for (let [key, val] of Object.entries(q))
    if (key === "all" && val === "true") return true;
  return false;
};

export const isValidQuery = (q) => {
  const allowedKeys = [
    "name",
    "from",
    "to",
    "time",
    "withTime",
    "maxPeople",
    "page",
  ];
  const keys = Object.keys(q);

  if (keys.length > allowedKeys.length) return false;
  if (keys.some((key) => !allowedKeys.includes(key))) return false;
  if (keys.includes("from") !== keys.includes("to")) return false;
  if (keys.includes("maxPeople") && q.maxPeople !== null) {
    const parsedInt = parseInt(q.maxPeople);
    if (isNaN(parsedInt) || parsedInt < 2 || parsedInt > 4) return false;
  }
  if (keys.includes("time") && q.time !== null) {
    if (isNaN(Date.parse(q.time))) return false;
  } else if (keys.includes("withTime") && q.withTime === "true") return false;
  return true;
};
