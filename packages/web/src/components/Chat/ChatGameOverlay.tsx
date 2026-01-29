import { Suspense, lazy, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Loading from "@/components/Loading";
import Title from "@/components/Title";

import chatGameOverlayAtom from "@/atoms/chatGameOverlay";
import { useRecoilState } from "recoil";

import theme from "@/tools/theme";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const RacingGame = lazy(() => import("@/pages/Game/RacingGame"));
const WordChainGame = lazy(() => import("@/pages/Game/WordChainGame"));

type ChatGameOverlayProps = {
  roomId: string;
  chats: any[];
  sendMessage: (type: any, content: any) => Promise<boolean>;
};

const ChatGameOverlay = ({
  roomId,
  chats,
  sendMessage,
}: ChatGameOverlayProps) => {
  const [overlayGame, setOverlayGame] = useRecoilState(chatGameOverlayAtom);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (overlayGame) {
      setIsClosing(false);
    }
  }, [overlayGame]);

  if (!overlayGame && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOverlayGame(null);
      setIsClosing(false);
    }, 400);
  };

  const gameProps = { roomId, chats, sendMessage };

  return createPortal(
    <div
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        transition: "opacity 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
        opacity: isClosing ? 0 : 1,
        pointerEvents: isClosing ? "none" : "auto",
      }}
      onClick={handleClose}
    >
      <div
        css={{
          width: "100%",
          maxWidth: "480px",
          height: "85%",
          paddingBottom: "env(safe-area-inset-bottom)",
          backgroundColor: theme.white,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.2)",
          animation: `${isClosing ? "slideDown" : "slideUp"} 0.4s cubic-bezier(0.33, 1, 0.68, 1) forwards`,
          "@keyframes slideUp": {
            from: { transform: "translateY(100%)" },
            to: { transform: "translateY(0)" },
          },
          "@keyframes slideDown": {
            from: { transform: "translateY(0)" },
            to: { transform: "translateY(100%)" },
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px 8px",
          }}
        >
          <div css={{ flex: 1 }}>
            <Title icon={overlayGame === "wordChain" ? "chat" : "leaderboard"}>
              {overlayGame === "wordChain" && "끝말잇기"}
              {overlayGame === "racing" && "택시 경마"}
            </Title>
          </div>
          <button
            onClick={handleClose}
            css={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseRoundedIcon
              css={{ fontSize: "28px", fill: theme.gray_text }}
            />
          </button>
        </div>

        <div
          css={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Suspense fallback={<Loading center />}>
            {overlayGame === "wordChain" && <WordChainGame {...gameProps} />}
            {overlayGame === "racing" && <RacingGame {...gameProps} />}
          </Suspense>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ChatGameOverlay;
