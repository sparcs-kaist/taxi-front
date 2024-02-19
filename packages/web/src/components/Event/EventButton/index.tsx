import { HTMLAttributes } from "react";

import eventTheme from "@/tools/eventTheme";
import theme from "@/tools/theme";

type EventButtonProps = {
  title: string;
  background: string;
} & HTMLAttributes<HTMLDivElement>;

const EventButton = ({ title, background, ...divProps }: EventButtonProps) => {
  return (
    <div
      css={{
        ...eventTheme.font16_bold,
        borderRadius: eventTheme.borderRadius,
        textAlign: "center",
        lineHeight: "50px",
        background,
        color: theme.white,
        width: "100%",
        height: "50px",
      }}
      {...divProps}
    >
      {title}
    </div>
  );
};

export default EventButton;
