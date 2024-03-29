import { useParams } from "react-router-dom";

import Event2022Beta from "./Event2022Beta";
import Event2023Fall from "./Event2023Fall";
import Event2023FallHistory from "./Event2023FallHistory";
import Event2023FallLeaderboard from "./Event2023FallLeaderboard";
import Event2023FallMissions from "./Event2023FallMissions";
import Event2023FallStore from "./Event2023FallStore";
import Event2023Spring from "./Event2023Spring";
import Event2023SpringGuide from "./Event2023SpringGuide";
import Event2024Spring from "./Event2024Spring";
import Event2024SpringLeaderboard from "./Event2024SpringLeaderboard";
import Event2024SpringMissions from "./Event2024SpringMissions";

const Event = () => {
  const { eventName } = useParams() as { eventName: string };

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
    default:
      return <Event2024Spring />;
  }
};

export default Event;
