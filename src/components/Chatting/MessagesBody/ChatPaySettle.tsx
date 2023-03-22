import theme from "styles/theme";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

type ChatPaySettleProps = {
  itsme: boolean;
  type: "payment" | "settlement";
};

const ChatPaySettle = ({ itsme, type }: ChatPaySettleProps) => {
  return (
    <div
      style={{
        padding: "9px 12px 8px",
        display: "flex",
        columnGap: "6px",
        ...theme.font16,
        color: itsme ? theme.white : theme.black,
      }}
      className="selectable"
    >
      {type === "payment" ? (
        <CreditCardRoundedIcon style={{ fontSize: "18px" }} />
      ) : (
        <SendRoundedIcon style={{ fontSize: "18px" }} />
      )}
      {type === "payment" ? "결제를 완료하였습니다." : "정산을 완료하였습니다."}
    </div>
  );
};

export default ChatPaySettle;
