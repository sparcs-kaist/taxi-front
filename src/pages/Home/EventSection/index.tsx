import { eventMode } from "@/tools/loadenv";

import EventSection2023Fall from "./EventSection2023Fall";
import EventSection2023Spring from "./EventSection2023Spring";

const EventSection = () => {
  switch (eventMode) {
    case "2023spring":
      return <EventSection2023Spring />;
    case "2023fall":
      return <EventSection2023Fall />;
    default:
      return null;
  }
};

export default EventSection;
