import { useParams } from "react-router-dom";

import Event2022Beta from "./Event2022Beta";
import Event2023Fall from "./Event2023Fall";
import Event2023FallHistory from "./Event2023FallHistory";
import Event2023FallLeaderboard from "./Event2023FallLeaderboard";
import Event2023FallMissions from "./Event2023FallMissions";
import Event2023FallStore from "./Event2023FallStore";
import Event2023Spring from "./Event2023Spring";
import Event2023SpringGuide from "./Event2023SpringGuide";
import Event2024Fall from "./Event2024Fall";
import Event2024FallDailyAttendance from "./Event2024FallDailyAttendance";
import Event2024FallHistory from "./Event2024FallHistory";
import Event2024FallMissions from "./Event2024FallMissions";
import Event2024FallStore from "./Event2024FallStore";
import Item from "./Event2024FallStore/Item";
import Event2024Spring from "./Event2024Spring";
import Event2024SpringLeaderboard from "./Event2024SpringLeaderboard";
import Event2024SpringMissions from "./Event2024SpringMissions";
import Event2025Spring from "./Event2025Spring";
import Event2025SpringHistory from "./Event2025SpringHistory";
import Event2025SpringMissions from "./Event2025SpringMissions";
import Event2025SpringStore from "./Event2025SpringStore";

const Event = () => {
  const { eventName, itemId } = useParams() as {
    eventName: string;
    itemId: string;
  };
  if (eventName === "2024fall-store" && itemId) {
    return <Item itemId={itemId} />;
  }

  switch (eventName) {
    case "2022beta":
      return <Event2022Beta />;
    case "2023spring":
      return <Event2023Spring />;
    case "2023spring-guide":
      return <Event2023SpringGuide />;
    case "2023fall":
      return <Event2023Fall />;
    case "2023fall-store":
      return <Event2023FallStore />;
    case "2023fall-history":
      return <Event2023FallHistory />;
    case "2023fall-leaderboard":
      return <Event2023FallLeaderboard />;
    case "2023fall-missions":
      return <Event2023FallMissions />;
    case "2024spring":
      return <Event2024Spring />;
    case "2024spring-missions":
      return <Event2024SpringMissions />;
    case "2024spring-leaderboard":
      return <Event2024SpringLeaderboard />;
    case "2024fall":
      return <Event2024Fall />;
    case "2024fall-store":
      return <Event2024FallStore />;
    case "2024fall-history":
      return <Event2024FallHistory />;
    case "2024fall-missions":
      return <Event2024FallMissions />;
    case "2024fall-daily-attendance":
      return <Event2024FallDailyAttendance />;
    case "2025spring":
      return <Event2025Spring />;
    case "2025spring-store":
      return <Event2025SpringStore itemId={itemId} />;
    case "2025spring-history":
      return <Event2025SpringHistory />;
    case "2025spring-missions":
      return <Event2025SpringMissions />;
    default:
      return <Event2025Spring />;
  }
};

export default Event;
