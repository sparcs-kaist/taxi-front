import Button from "./Button";

import chatGameOverlayAtom from "@/atoms/chatGameOverlay";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

type MessageGameRecommendationProps = {
  color: CSS["color"];
};

const MessageGameRecommendation = ({
  color,
}: MessageGameRecommendationProps) => {
  const setChatGameOverlay = useSetRecoilState(chatGameOverlayAtom);

  const style = { width: "210px", padding: "10px" };

  // 게임 선택 섹션 스타일
  const styleGameSection = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  };

  const styleGameTitle = {
    ...theme.font14_bold,
    color: theme.purple,
    textAlign: "center" as const,
    marginBottom: "2px",
  };

  const styleGameText = {
    marginBottom: "4px",
    textAlign: "center" as const,
    wordBreak: "break-all" as any,
    whiteSpace: "pre-line" as any,
    ...theme.font14,
    color,
  };

  return (
    <div css={style}>
      <div css={styleGameSection}>
        <div css={styleGameTitle}>🚖 함께하는 택시 게임</div>
        <div css={styleGameText}>함께 즐기고 넙죽코인을 획득하세요!</div>
        <Button onClick={() => setChatGameOverlay("wordChain")}>
          끝말잇기
        </Button>
        <Button onClick={() => setChatGameOverlay("racing")}>택시 경마</Button>
      </div>
    </div>
  );
};

export default MessageGameRecommendation;
