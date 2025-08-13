import { keyframes } from "@emotion/react";

import Room from ".";

type AnimatedRoomProps = {
  data: any;
  selected?: boolean;
  onClick?: () => void;
  marginTop?: string;
  marginBottom?: string;
  theme?: string;
  type?: "addition" | "deletion";
  unreadCount?: number;
  hasImportantMessage?: boolean;
};

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

const AnimatedRoom = ({
  data,
  selected = false,
  onClick = () => {},
  marginTop = "0px",
  marginBottom = "0px",
  theme,
  type,
  unreadCount,
  hasImportantMessage,
}: AnimatedRoomProps) => {
  const props = {
    data,
    selected,
    onClick,
    marginTop,
    marginBottom,
    theme,
    type,
    unreadCount,
    hasImportantMessage,
  };

  return !data.animating ? (
    <Room {...props} />
  ) : (
    <div
      css={{
        animation: `${
          type === "addition" ? growHeight : shrinkHeight
        } 0.5s forwards`,
      }}
    ></div>
  );
};

export default AnimatedRoom;
