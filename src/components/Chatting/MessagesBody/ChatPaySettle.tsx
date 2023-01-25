import React from "react";
import theme from "styles/theme";

type ChatPaySettleProps = {
  itsme: boolean;
  type: "pay" | "settlement";
};

const ChatPaySettle = ({ itsme, type }: ChatPaySettleProps) => {
  return (
    <div
      style={{
        padding: "7px 10px 6px",
        color: itsme ? theme.white : theme.black,
        ...theme.font14,
        // wordBreak: "break-all",
        // whiteSpace: "pre-line",
      }}
      className="selectable"
    >
      {type === "pay" ? "결제를 완료하였습니다." : "정산을 완료하였습니다."}
    </div>
  );
};

export default ChatPaySettle;
