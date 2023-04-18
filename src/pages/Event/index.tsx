import { useParams } from "react-router-dom";

import Event2022Beta from "./Event2022Beta";
import Event2023Spring from "./Event2023Spring";

const Event = () => {
  const { eventName } = useParams() as { eventName: string };

  switch (eventName) {
    case "2022beta":
      return <Event2022Beta />;
    case "2023spring":
      return <Event2023Spring />;
    default:
      return <Event2023Spring />;
  }
};

export default Event;
