import { CSSProperties } from "react";

import theme from "tools/theme";

import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

type MessagePaySettlementProps = {
  type: "payment" | "settlement";
  color: CSSProperties["color"];
};

const MessagePaySettlement = ({ type, color }: MessagePaySettlementProps) => (
  <div
    css={{
      padding: "9px 12px 8px",
      display: "flex",
      columnGap: "6px",
      ...theme.font16,
      color,
    }}
    className="selectable"
  >
    {type === "payment" ? (
      <>
        <CreditCardRoundedIcon style={{ fontSize: "18px" }} />
        제가 택시비를 결제하였어요 !
      </>
    ) : (
      <>
        <SendRoundedIcon style={{ fontSize: "18px" }} />
        결제자에게 송금했어요 !
      </>
    )}
  </div>
);

export default MessagePaySettlement;
