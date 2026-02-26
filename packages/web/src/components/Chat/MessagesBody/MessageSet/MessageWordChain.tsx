import type { LayoutType } from "@/types/chat";

import Button from "./Button";

import chatGameOverlayAtom from "@/atoms/chatGameOverlay";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

type MessageWordChainProps = {
  content: string;
  color: CSS["color"];
  layoutType: LayoutType;
};

const MessageWordChain = ({
  content,
  color,
  layoutType,
}: MessageWordChainProps) => {
  const setChatGameOverlay = useSetRecoilState(chatGameOverlayAtom);

  const style = { maxWidth: "210px", padding: "10px" };

  const styleTitle = {
    ...theme.font14_bold,
    color: theme.purple,
    textAlign: "center" as const,
    marginBottom: "4px",
  };

  const styleText = {
    marginBottom: "4px",
    wordBreak: "break-all" as const,
    whiteSpace: "pre-line" as const,
    ...theme.font14,
    color,
  };

  return (
    <div css={style}>
      <div css={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div css={styleTitle}>📢 끝말잇기 시작!</div>
        <div css={styleText}>{content}</div>
        {layoutType !== "wordChainGame" && (
          <Button onClick={() => setChatGameOverlay("wordChain")}>
            참여하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageWordChain;
