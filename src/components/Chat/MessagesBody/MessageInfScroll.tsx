import theme from "tools/theme";

import MotionPhotosOnIcon from "@mui/icons-material/RotateLeftRounded";

type MessageInfScrollProps = {
  value: string;
};

const MessageInfScroll = ({ value }: MessageInfScrollProps) => (
  <div
    css={{
      paddingTop: "10px",
      margin: "0 12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      columnGap: "4px",
      color: theme.gray_text,
      ...theme.font12,
    }}
    data-chat-type="infscroll-checkout"
  >
    <MotionPhotosOnIcon
      style={{ fontSize: "18px" }}
      className="MessageForm_rotate_infinite"
    />
    채팅 불러오는 중...
  </div>
);

export default MessageInfScroll;
