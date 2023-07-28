import { CSSProperties } from "react";

import theme from "tools/theme";

type MessageTextProps = {
  text: string;
  color: CSSProperties["color"];
};

const MessageText = ({ text, color }: MessageTextProps) => (
  <div
    css={{
      padding: "7px 10px 6px",
      color,
      wordBreak: "break-all",
      ...theme.font14,
      whiteSpace: "pre-line",
    }}
    className="selectable"
  >
    {text}
  </div>
);

export default MessageText;
