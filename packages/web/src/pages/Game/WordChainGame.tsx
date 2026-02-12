import { keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

import useChatsForBody from "@/hooks/chat/useChatsForBody";

import dayjs from "@/tools/day";
import theme from "@/tools/theme";

import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

type WordChainGameProps = {
  roomId: string;
  chats: any[];
  sendMessage: (type: any, content: any) => Promise<boolean>;
  roomInfo: Room;
  readAtList: Date[];
};

const bounce = keyframes`
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const WordChainGame = ({
  chats,
  sendMessage,
  roomInfo,
  readAtList,
}: WordChainGameProps) => {
  const [inputText, setInputText] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 끝말잇기 메시지만 필터링 및 정렬
  const wordChainChats = chats
    .filter((c) => c.type === "wordChain" && c.content !== "GAME_SELECTION")
    .sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();

      // 같은 초(Second) 내에 발생한 메시지는 유저 메시지가 먼저 오도록 정렬
      if (Math.floor(timeA / 1000) === Math.floor(timeB / 1000)) {
        const isBotA = a.authorId === "bot" || a.authorName === "택시 봇";
        const isBotB = b.authorId === "bot" || b.authorName === "택시 봇";
        if (isBotA !== isBotB) return isBotA ? 1 : -1;
      }

      return timeA - timeB;
    });

  const { currentWord, nextTurnUser, baseTime } = (() => {
    const defaultState = {
      currentWord: "게임 시작!",
      nextTurnUser: null as string | null,
      baseTime: new Date(), // 기본값: 현재 시간 (또는 게임 시작 전이면 의미 없음)
    };
    if (wordChainChats.length === 0) return defaultState;

    // 뒤에서부터 탐색하여 유효한 봇 메시지(게임 시작 또는 단어 입력 확인)를 찾음
    for (let i = wordChainChats.length - 1; i >= 0; i--) {
      const chat = wordChainChats[i];
      const content = chat.content;

      // 게임 종료 메시지 파싱
      if (content.match(/승리했습니다|탈락했습니다/)) {
        return {
          currentWord: "게임 종료",
          nextTurnUser: "단어를 입력하여 게임을 다시 시작하세요!",
          baseTime: null,
        };
      }

      // 게임 시작 메시지 파싱
      const startMatch = content.match(/첫 단어는\s*["'](.+?)["']입니다/);
      if (startMatch) {
        const nextMatch = content.match(/다음 차례는\s*(.+?)입니다/);
        return {
          currentWord: startMatch[1],
          nextTurnUser: nextMatch ? nextMatch[1] : null,
          baseTime: chat.time,
        };
      }

      // 단어 입력 확인 메시지 파싱
      const inputMatch = content.match(
        /["'](.+?)["']\(으\)로\s*단어를\s*입력했습니다/
      );
      if (inputMatch) {
        const nextMatch = content.match(/다음 차례는\s*(.+?)입니다/);
        return {
          currentWord: inputMatch[1],
          nextTurnUser: nextMatch ? nextMatch[1] : null,
          baseTime: chat.time,
        };
      }
    }

    return defaultState;
  })();

  // 타이머 로직
  useEffect(() => {
    if (wordChainChats.length === 0) {
      setTimeLeft(30);
      return;
    }

    // 게임 종료 확인 (마지막 메시지 기준 OR currentWord 기준)
    const lastChat = wordChainChats[wordChainChats.length - 1];
    if (
      lastChat.content.includes("승리") ||
      lastChat.content.includes("탈락") ||
      currentWord === "게임 종료" ||
      !baseTime
    ) {
      setTimeLeft(0);
      return;
    }

    // baseTime 기준으로 타이머 설정 (유효한 턴 시작 시간)
    const deadline = dayjs(baseTime).add(30, "second");

    const updateTimer = () => {
      const now = dayjs();
      const diff = deadline.diff(now, "millisecond") / 1000;
      setTimeLeft(Math.max(0, diff));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 100);
    return () => clearInterval(interval);
  }, [wordChainChats, baseTime, currentWord]);

  const chatNodes = useChatsForBody(
    wordChainChats,
    "wordChainGame",
    roomInfo,
    readAtList
  );

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 10);
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
        padding: "16px",
        gap: "12px",
        overflow: "hidden",
      }}
    >
      {/* 현재 단어 표시 */}
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 16px",
          backgroundColor: theme.purple_light,
          borderRadius: "16px",
          boxShadow: theme.shadow,
          animation: `${bounce} 0.3s ease-out`,
          key: currentWord,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {currentWord !== "게임 종료" && (
          <div
            css={{
              ...theme.font12,
              color: theme.gray_text,
              marginBottom: "2px",
            }}
          >
            현재 단어
          </div>
        )}
        <div
          css={{
            ...theme.font20,
            color: theme.purple,
            textAlign: "center",
            wordBreak: "keep-all",
          }}
        >
          {currentWord}
        </div>
        {wordChainChats.length > 0 && nextTurnUser && (
          <div css={{ ...theme.font12, color: theme.purple, marginTop: "8px" }}>
            {currentWord === "게임 종료"
              ? nextTurnUser
              : `다음 차례: ${nextTurnUser}`}
          </div>
        )}

        {/* 타이머 바 */}
        {timeLeft > 0 && (
          <div
            css={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "4px",
              backgroundColor: theme.purple_light,
              width: "100%",
            }}
          >
            <div
              css={{
                height: "100%",
                backgroundColor:
                  timeLeft < 10 ? theme.red_button : theme.purple,
                width: `${(timeLeft / 30) * 100}%`,
                transition: "width 0.1s linear, background-color 0.3s",
              }}
            />
          </div>
        )}
      </div>

      {/* 채팅 리스트 */}
      <div
        className="chatting-body"
        css={{
          flex: 1,
          minHeight: 0,
          backgroundColor: theme.purple_light,
          borderRadius: "16px",
          padding: "8px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: theme.shadow_purple_input_inset,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "3px",
            ":hover": {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
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
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            첫 번째 단어를 입력해 게임을 시작하세요!
          </div>
        ) : (
          chatNodes
        )}
      </div>

      {/* 입력 영역 */}
      <div
        css={{
          position: "relative",
          background: theme.purple_light,
          borderRadius: "16px",
          boxShadow: theme.shadow_purple_input_inset,
          padding: "6px 42px 6px 16px",
          display: "flex",
          alignItems: "center",
          marginTop: "4px",
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="이어질 단어를 입력하세요"
          css={{
            border: "none",
            outline: "none",
            background: "none",
            width: "100%",
            ...theme.font16,
            height: "40px",
            color: theme.black,
            "&::placeholder": {
              color: theme.gray_text,
            },
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!inputText.trim()}
          css={{
            position: "absolute",
            right: "6px",
            width: "32px",
            height: "32px",
            border: "none",
            borderRadius: "50%",
            backgroundColor: inputText.trim()
              ? theme.purple
              : theme.gray_background,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: inputText.trim() ? "pointer" : "default",
            transition: "all 0.2s",
            transform: inputText.trim() ? "scale(1)" : "scale(0.9)",
            "&:hover": {
              transform: inputText.trim() ? "scale(1.1)" : "scale(0.9)",
            },
          }}
        >
          <ArrowUpwardRoundedIcon
            style={{
              fontSize: "20px",
              fill: inputText.trim() ? theme.white : theme.gray_line,
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default WordChainGame;
