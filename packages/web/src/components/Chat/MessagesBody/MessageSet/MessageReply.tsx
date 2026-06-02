import type { ParentChat } from "@/types/chat";

import theme from "@/tools/theme";

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

type MessageReplyProps = {
  text: string;
  color: CSS["color"];
  parentChat: ParentChat;
  isSelf?: boolean;
  onClickParent?: () => void;
};

const MessageReply = ({
  text,
  color,
  parentChat,
  isSelf,
  onClickParent,
}: MessageReplyProps) => {
  const isLight = color === theme.white; // 내가 보낸 메시지(보라 버블)인지 여부

  const accent = isLight ? "rgba(255,255,255,0.9)" : theme.purple;
  const muted = isLight ? "rgba(255,255,255,0.65)" : theme.gray_text;
  const divider = isLight ? "rgba(255,255,255,0.35)" : theme.gray_line;

  return (
    <div css={{ padding: "7px 10px 6px" }}>
      <div
        css={{
          marginBottom: "6px",
          cursor: onClickParent ? "pointer" : undefined,
        }}
        onClick={onClickParent}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            ...theme.font10_bold,
            color: accent,
            marginBottom: "2px",
          }}
        >
          <ReplyRoundedIcon
            style={{
              fontSize: "12px",
              fill: accent,
              transform: "scaleX(-1)",
              flexShrink: 0,
            }}
          />
          {isSelf ? "나" : parentChat.nickname}에게 답장
        </div>
        <div
          css={{
            ...theme.font12,
            color: muted,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {parentChat.content}
        </div>
      </div>
      <div css={{ height: "1px", background: divider, marginBottom: "6px" }} />
      <div
        css={{
          color,
          wordBreak: "break-all",
          ...theme.font14,
          whiteSpace: "break-spaces",
        }}
        className="selectable"
      >
        {text}
      </div>
    </div>
  );
};

export default MessageReply;
