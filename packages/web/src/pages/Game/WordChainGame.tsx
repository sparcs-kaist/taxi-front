import { useEffect, useRef, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import { getChatUniquewKey } from "@/tools/chat/chats";
import theme from "@/tools/theme";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

type WordChainGameProps = {
  roomId: string;
  chats: any[];
  sendMessage: (type: any, content: any) => Promise<boolean>;
};

const WordChainGame = ({ chats, sendMessage }: WordChainGameProps) => {
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};

  // 끝말잇기 메시지만 필터링
  const wordChainChats = chats.filter(
    (c) => c.type === "wordChain" && c.content !== "GAME_SELECTION"
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [wordChainChats.length]);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    const success = await sendMessage("wordChain", { text: inputText.trim() });
    if (success) {
      setInputText("");
    } else {
      alert("전송 실패");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "4px 16px 16px 16px",
        overflow: "hidden",
      }}
    >
      <div
        css={{
          flex: 1,
          minHeight: 0,
          backgroundColor: theme.purple_background,
          borderRadius: "12px",
          padding: "16px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "16px",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "3px",
          },
        }}
        ref={scrollRef}
      >
        {wordChainChats.length === 0 ? (
          <div
            css={{
              ...theme.font14,
              color: theme.gray_text,
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            첫 번째 단어를 입력해 게임을 시작하세요!
          </div>
        ) : (
          wordChainChats.map((chat, idx) => {
            const isMe = chat.authorId === userOid;
            return (
              <div
                key={getChatUniquewKey(chat)}
                css={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                }}
              >
                <div
                  css={{
                    padding: "8px 12px",
                    borderRadius: "12px",
                    maxWidth: "70%",
                    wordBreak: "break-all",
                    ...theme.font14,
                    backgroundColor: isMe ? theme.purple : theme.white,
                    color: isMe ? theme.white : theme.black,
                    boxShadow: theme.shadow,
                  }}
                >
                  {chat.content}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div
        css={{
          position: "relative",
          background: theme.purple_light,
          boxShadow: theme.shadow_purple_input_inset,
          borderRadius: "16px",
          overflow: "hidden",
          minHeight: "36px",
          display: "flex",
          alignItems: "center",
          padding: "2px 36px 2px 12px",
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="단어를 입력하세요"
          css={{
            border: "none",
            outline: "none",
            background: "none",
            width: "100%",
            ...theme.font14,
            height: "32px",
          }}
        />
        <div
          css={{
            position: "absolute",
            width: "28px",
            height: "28px",
            bottom: "4px",
            right: "4px",
            backgroundColor: inputText.trim()
              ? theme.purple
              : theme.gray_background,
            borderRadius: "14px",
            boxShadow: theme.shadow_gray_input_inset,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...theme.cursor(!inputText.trim()),
          }}
          onClick={handleSubmit}
        >
          <ArrowUpwardRoundedIcon
            style={{
              fontSize: "20px",
              fill: inputText.trim() ? theme.white : theme.gray_line,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WordChainGame;
