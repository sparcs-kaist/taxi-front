import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import Room from "@/components/Room";

const DiffRoom = (props: any) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const growHeight = keyframes`
  from {
    height: 0px;
  }
  to {
    height: 125px;
  }
  `;

  const shrinkHeight = keyframes`
  from {
    height: 125px;
  }
  to {
    height: 0px;
  }
  `;

  const animation = props.type === "addition" ? growHeight : shrinkHeight;

  return animating ? (
    <div
      css={{
        animation: `${animation} 0.5s forwards`,
      }}
    ></div>
  ) : props.type === "addition" ? (
    <Room data={props.room} marginBottom={props.marginBottom} />
  ) : null;
};

export default DiffRoom;
