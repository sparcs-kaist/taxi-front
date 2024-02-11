import EventSection2023Fall from "./EventSection2023Fall";
import EventSection2023Spring from "./EventSection2023Spring";
import EventSection2024Spring from "./EventSection2024Spring";

import { eventMode } from "@/tools/loadenv";

const EventSection = () => {
  switch (eventMode) {
    case "2023spring":
      return <EventSection2023Spring />;
    case "2023fall":
      return <EventSection2023Fall />;
    case null:
      return <EventSection2024Spring />;
    default:
      return null;
  }
};

export default EventSection;
