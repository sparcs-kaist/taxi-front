import type { LayoutType } from "@/types/chat";

import Button from "./Button";

import chatGameOverlayAtom from "@/atoms/chatGameOverlay";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

type MessageRacingProps = {
  content: string;
  color: CSS["color"];
  layoutType: LayoutType;
};

const MessageRacing = ({ content, color, layoutType }: MessageRacingProps) => {
  const setChatGameOverlay = useSetRecoilState(chatGameOverlayAtom);

  const style = { maxWidth: "210px", padding: "10px" };

  let title = "🚕 택시 레이스";
  let showButton = true;
  let buttonText = "입장하기";
  let lines = content.split("\n").filter((l) => l.trim() !== "");

  if (content.includes("경주 결과")) {
    title = "🏁 경주 결과";
    showButton = true;
    buttonText = "결과 확인하기";
    lines = lines.filter((line) => line.trim() !== "경주 결과");
  } else if (content.includes("보상 정산")) {
    title = "💰 보상 정산";
    showButton = false;
    lines = lines.filter((line) => line.trim() !== "보상 정산");
  } else if (content.includes("레이스를 시작합니다")) {
    title = "🏎️ 레이스 시작!";
    showButton = false;
  } else if (content.includes("방을 만들었습니다")) {
    title = "🏠 레이스 방 생성";
    showButton = true;
  } else if (content.includes("방에 참가했습니다")) {
    title = "🙋 레이스 참가";
    showButton = false;
  }

  const styleTitle = {
    ...theme.font14_bold,
    color: theme.purple,
    textAlign: "center" as const,
    marginBottom: "4px",
  };

  const styleText = {
    marginBottom: "4px",
    wordBreak: "break-all" as const,
    whiteSpace: "pre-wrap" as const,
    ...theme.font14,
    color,
    lineHeight: "1.4",
  };

  return (
    <div css={style}>
      <div css={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div css={styleTitle}>{title}</div>
        <div css={styleText}>
          {lines.map((line, idx) => {
            const isRankRow = /^\d+등:/.test(line);
            const isSettlementRow =
              line.includes("배팅") && line.includes("배율");
            const isStartRow = line.startsWith("참가 내역:");

            let renderedLine: React.ReactNode = line;

            if (isRankRow) {
              const match = line.match(/^(\d+등:\s*\d+번차\s*-\s*)(.*)/);
              if (match) {
                renderedLine = (
                  <>
                    <span style={{ fontWeight: 700 }}>{match[1]}</span>
                    {match[2]}
                  </>
                );
              } else {
                renderedLine = <span style={{ fontWeight: 700 }}>{line}</span>;
              }
            } else if (isSettlementRow) {
              const match = line.match(/^(.*?:\s*\d+번차\s*\d+등\s*\/)(.*)/);
              if (match) {
                renderedLine = (
                  <>
                    <span style={{ fontWeight: 700 }}>{match[1]}</span>
                    {match[2]}
                  </>
                );
              } else {
                renderedLine = <span style={{ fontWeight: 700 }}>{line}</span>;
              }
            } else if (isStartRow) {
              renderedLine = (
                <>
                  <span style={{ fontWeight: 700 }}>참가 내역:</span>
                  {line.replace("참가 내역:", "")}
                </>
              );
            }

            return <div key={idx}>{renderedLine}</div>;
          })}
        </div>
        {showButton && (
          <Button onClick={() => setChatGameOverlay("racing")}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MessageRacing;
