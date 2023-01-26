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
        padding: "9px 12px 8px",
        color: itsme ? theme.white : theme.black,
        // backgroundColor: itsme ? theme.purple_dark : theme.gray_background,
        ...theme.font16,
      }}
      className="selectable"
    >
      {type === "pay" ? "결제를 완료하였습니다." : "정산을 완료하였습니다."}
    </div>
  );
};

export default ChatPaySettle;
