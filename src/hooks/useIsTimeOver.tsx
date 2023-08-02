import { useEffect, useState } from "react";

import { Dayjs, dayNowClient } from "tools/day";

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
