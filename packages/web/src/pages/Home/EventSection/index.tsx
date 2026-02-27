import EventSection2023Fall from "./EventSection2023Fall";
import EventSection2023Spring from "./EventSection2023Spring";
import EventSection2024Fall from "./EventSection2024Fall";
import EventSection2024Spring from "./EventSection2024Spring";
import EventSection2025Fall from "./EventSection2025Fall";
import EventSection2025Spring from "./EventSection2025Spring";
import EventSection2026Spring from "./EventSection2026Spring";

import { eventMode } from "@/tools/loadenv";

const EventSection = () => {
  switch (eventMode) {
    case "2023spring":
      return <EventSection2023Spring />;
    case "2023fall":
      return <EventSection2023Fall />;
    case "2024spring":
      return <EventSection2024Spring />;
    case "2024fall":
      return <EventSection2024Fall />;
    case "2025spring":
      return <EventSection2025Spring />;
    case "2025fall":
      return <EventSection2025Fall />;
    case "2026spring":
      return <EventSection2026Spring />;
    default:
      return <EventSection2026Spring />;
  }
};

export default EventSection;
