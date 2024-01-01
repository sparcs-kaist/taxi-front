import theme from "@/tools/theme";

type MessageInOutProps = {
  type: "in" | "out";
  users: Array<string>;
};

const MessageInOut = ({ type, users = [] }: MessageInOutProps) => (
  <div css={{ paddingTop: "10px", margin: "0 12px" }}>
    <div
      css={{
        padding: "4px 8px 3px",
        ...theme.font10,
        color: theme.gray_text,
        background: theme.gray_background,
        borderRadius: "10px",
        textAlign: "center",
        width: "fit-content",
        margin: "auto",
      }}
    >
      {`${users.join(" 님, ")} 님이 ${
        type === "in" ? "입장하였습니다" : "퇴장하였습니다"
      }`}
    </div>
  </div>
);

export default MessageInOut;
