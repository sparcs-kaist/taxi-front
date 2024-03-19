import theme from "@/tools/theme";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import MotionPhotosOnIcon from "@mui/icons-material/RotateLeftRounded";

type ButtonSendProps = {
  status?: "active" | "inactive" | "pending";
  onClick?: () => void;
};

const ButtonSend = ({ status = "active", onClick }: ButtonSendProps) => (
  <div
    css={{
      position: "absolute" as any,
      width: "28px",
      height: "28px",
      bottom: "2px",
      right: "2px",
      backgroundColor:
        status === "active" ? theme.purple : theme.gray_background,
      borderRadius: "14px",
      boxShadow: theme.shadow_gray_input_inset,
      ...theme.cursor(status !== "active"),
    }}
    onClick={status === "active" ? onClick : undefined}
  >
    {status === "pending" ? (
      <MotionPhotosOnIcon
        className="MessageForm_rotate_infinite"
        style={{
          fontSize: "22px",
          margin: "3px",
          fill: theme.gray_line,
        }}
      />
    ) : (
      <ArrowUpwardRoundedIcon
        style={{
          fontSize: "22px",
          margin: "3px",
          fill: status === "active" ? theme.white : theme.gray_line,
        }}
      />
    )}
  </div>
);

export default ButtonSend;
