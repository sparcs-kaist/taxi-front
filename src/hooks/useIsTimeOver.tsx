import { dayNowClient } from "@/tools/day";
import { useEffect, useState } from "react";

export default (time: Dayjs): boolean => {
  const [isTimeOver, setIsTimeOver] = useState(time <= dayNowClient());

  useEffect(() => {
    const timeDelta = time.diff(dayNowClient(), "millisecond");
    setIsTimeOver(timeDelta <= 0);

    if (timeDelta > 0) {
      const timeOut = setTimeout(() => setIsTimeOver(true), timeDelta);
      return () => clearTimeout(timeOut);
    }
  }, [time]);

  return isTimeOver;
};
