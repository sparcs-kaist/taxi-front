import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import theme from "@/tools/theme";

type ReplyPreviewProps = {
  authorName: string;
  content: string;
  onCancel: () => void;
};

const ReplyPreview = ({ authorName, content, onCancel }: ReplyPreviewProps) => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "7px 10px",
      background: theme.purple_light,
      borderRadius: "12px",
      boxShadow: theme.shadow_purple_input_inset,
    }}
  >
    <ReplyRoundedIcon
      style={{
        fontSize: "16px",
        fill: theme.purple,
        transform: "scaleX(-1)",
        flexShrink: 0,
      }}
    />
    <div css={{ flex: 1, minWidth: 0 }}>
      <div
        css={{
          ...theme.font10_bold,
          color: theme.purple,
        }}
      >
        {authorName}에게 답장
      </div>
      <div
        css={{
          ...theme.font12,
          color: theme.gray_text,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {content}
      </div>
    </div>
    <div
      css={{
        cursor: "pointer",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
      }}
      onClick={onCancel}
    >
      <CloseRoundedIcon style={{ fontSize: "18px", fill: theme.gray_text }} />
    </div>
  </div>
);

export default ReplyPreview;
