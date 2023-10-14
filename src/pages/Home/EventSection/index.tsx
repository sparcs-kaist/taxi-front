import EventSection2023Fall from "./EventSection2023Fall";
import EventSection2023FallResult from "./EventSection2023FallResult";
import EventSection2023Spring from "./EventSection2023Spring";

import { eventMode } from "tools/loadenv";

const EventSection = () => {
  switch (eventMode) {
    case "2023spring":
      return <EventSection2023Spring />;
    case "2023fall":
      return <EventSection2023Fall />;
    default:
      return <EventSection2023FallResult />;
  }
};

export default EventSection;
