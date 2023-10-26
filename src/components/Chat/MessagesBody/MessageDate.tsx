import DottedLine from "@/components/DottedLine";
import theme from "@/tools/theme";

type MessageDateProps = {
  date: Dayjs;
};

const MessageDate = ({ date }: MessageDateProps) => (
  <div
    css={{
      position: "relative",
      padding: "16px 12px 6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <DottedLine />
    <div
      css={{
        ...theme.font10,
        margin: "0 12px",
        color: theme.gray_text,
        minWidth: "fit-content",
      }}
    >
      {date.format("YYYY년 M월 D일 (ddd)")}
    </div>
    <DottedLine />
  </div>
);

export default MessageDate;
