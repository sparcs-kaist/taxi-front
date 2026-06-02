import { RefObject, memo, useCallback, useState } from "react";

import type { BotChat, LayoutType, UserChat } from "@/types/chat";

import useSettlementFromChats from "@/hooks/chat/useSettlementFromChats";
import useSwipeToReply from "@/hooks/chat/useSwipeToReply";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import { ModalChatReport } from "@/components/ModalPopup";
import BadgeImage from "@/components/User/BadgeImage";
import ProfileImage from "@/components/User/ProfileImage";

import MessageAccount from "./MessageAccount";
import MessageArrival from "./MessageArrival";
import MessageDeparture from "./MessageDeparture";
import MessageGameRecommendation from "./MessageGameRecommendation";
import MessageImage from "./MessageImage";
import MessagePaySettlement from "./MessagePaySettlement";
import MessageRacing from "./MessageRacing";
import MessageReply from "./MessageReply";
import MessageShare from "./MessageShare";
import MessageText from "./MessageText";
import MessageWordChain from "./MessageWordChain";

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import { getChatUniquewKey } from "@/tools/chat/chats";
import dayjs from "@/tools/day";
import theme from "@/tools/theme";

import { ReactComponent as TaxiIcon } from "@/static/assets/sparcsLogos/TaxiAppIcon.svg";

import "./index.css";

type MessageBodyProps = {
  type: (UserChat | BotChat)["type"];
  content: (UserChat | BotChat)["content"];
  roomInfo: Room;
  color: CSS["color"];
  settlement: ReturnType<typeof useSettlementFromChats>;
  layoutType: LayoutType;
  chat: UserChat | BotChat;
  userOid?: string;
  onClickParentChat?: () => void;
};

const MessageBody = ({
  type,
  content,
  roomInfo,
  color,
  settlement,
  layoutType,
  chat,
  userOid,
  onClickParentChat,
}: MessageBodyProps) => {
  switch (type) {
    case "reply": {
      const parentChat = ("parentChat" in chat && chat.parentChat) || {
        originChatId: "",
        authorId: "",
        nickname: "알 수 없음",
        content: "",
      };
      return (
        <MessageReply
          text={content}
          color={color}
          parentChat={parentChat}
          isSelf={!!userOid && parentChat.authorId === userOid}
          onClickParent={onClickParentChat}
        />
      );
    }
    case "text":
      return <MessageText text={content} color={color} />;
    case "s3img":
      return <MessageImage id={content} color={color} />;
    case "payment":
    case "settlement":
      return <MessagePaySettlement type={type} color={color} />;
    case "account":
      return (
        <MessageAccount
          roomInfo={roomInfo}
          account={content}
          settlement={settlement}
        />
      );
    case "share":
      return <MessageShare roomInfo={roomInfo} text={content} color={color} />;
    case "departure":
      return (
        <MessageDeparture roomInfo={roomInfo} minutes={content} color={color} />
      );
    case "arrival":
      return <MessageArrival color={color} />;
    case "wordChain":
      if (/첫 단어는\s*["'](.+?)["']입니다/.test(content)) {
        return (
          <MessageWordChain
            content={content}
            color={color}
            layoutType={layoutType}
          />
        );
      }
      return <MessageText text={content} color={color} />;
    case "racing":
      return (
        <MessageRacing
          content={content}
          color={color}
          layoutType={layoutType}
        />
      );
    case "gameRecommendation":
      return <MessageGameRecommendation color={color} />;
    default:
      return null;
  }
};

type ReplyTarget = {
  chatId: string;
  authorName: string;
  content: string;
};

type MessageSetProps = {
  chats: Array<UserChat | BotChat>;
  layoutType: LayoutType;
  roomInfo: Room;
  readAtList: Array<Date>;
  onSetReplyTarget?: (target: ReplyTarget) => void;
  messageBodyRef?: RefObject<HTMLDivElement>;
};

const MessageSet = ({
  chats,
  layoutType,
  roomInfo,
  readAtList,
  onSetReplyTarget,
  messageBodyRef,
}: MessageSetProps) => {
  const [isOpenReport, setIsOpenReport] = useState<boolean>(false);
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};

  const onClickProfileImage = useCallback(() => setIsOpenReport(true), []);
  const settlement = useSettlementFromChats(chats);
  const makeSwipeHandlers = useSwipeToReply();

  const authorId = chats?.[0]?.authorId;
  const authorProfileUrl =
    "authorProfileUrl" in chats?.[0] ? chats?.[0].authorProfileUrl : "";
  const authorName = "authorName" in chats?.[0] ? chats?.[0].authorName : "";
  const authorResidence =
    "authorResidence" in chats?.[0] ? chats?.[0].authorResidence : "";
  const authorIsWithdrew =
    "authorIsWithdrew" in chats?.[0] ? chats?.[0].authorIsWithdrew : false;

  const isBot = authorId === "bot" || chats?.[0]?.type === "racing";
  const author = isBot
    ? undefined
    : roomInfo.part.find((p) => p._id === authorId);
  const authorBadge = author?.badge || false;
  const isAlone = roomInfo.part.length === 1;

  // Chat의 time에 따라 안 읽은 사람 수 설정
  const unreadUsersNum = (time: Date) => {
    if (!roomInfo?.part || roomInfo.part.length <= 0) {
      return 0;
    }

    const unreadUsersCache = readAtList.filter(
      (readAt) => readAt < time
    ).length;

    return unreadUsersCache === roomInfo.part.length
      ? unreadUsersCache - 1
      : unreadUsersCache;
  };

  const style = {
    position: "relative" as any,
    display: "flex",
    padding: "10px 18px",
  };
  const styleProfileSection = { width: "30px" };
  const styleMessageSection = {
    flex: 1,
    display: "flex",
    flexDirection: "column" as any,
    rowGap: "6px",
  };
  const styleProfile = {
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: theme.shadow,
  };
  const styleName = {
    ...theme.font12,
    paddingLeft: "5px",
    color: theme.black,
    margin: "1px 0 -2px",
  };
  const styleMessageWrap = {
    position: "relative" as any,
    display: "flex",
    flexDirection: (authorId === userOid ? "row-reverse" : "row") as any,
    alignItems: "flex-end",
    gap: "4px",
  };

  const styleChat = useCallback(
    (type: (UserChat | BotChat)["type"]) => ({
      maxWidth: "max(75%, 210px)",
      boxShadow:
        layoutType === "sidechat"
          ? userOid === authorId
            ? theme.shadow_purple_button_inset
            : theme.shadow_purple_input_inset
          : theme.shadow,
      borderRadius: "8px",
      overflow: "hidden",
      background:
        type === "payment" || type === "settlement"
          ? userOid === authorId
            ? theme.purple_dark
            : theme.gray_background
          : type === "account" ||
              type === "share" ||
              type === "departure" ||
              type === "arrival" ||
              type === "gameRecommendation" ||
              type === "racing" ||
              (type === "wordChain" && authorId === "bot")
            ? layoutType === "sidechat"
              ? theme.purple_light
              : theme.white
            : userOid === authorId
              ? theme.purple
              : layoutType === "sidechat"
                ? theme.purple_hover
                : theme.white,
    }),
    [userOid, authorId, layoutType]
  );

  const styleMessageDetail = {
    display: "flex",
    flexDirection: "column" as any,
    alignItems: userOid === authorId ? "flex-end" : "flex-start",
    marginBottom: "2px",
    gap: "1px",
  };
  const styleUnreadUsers = {
    ...theme.font8_medium,
    color: theme.purple_dark,
  };
  const styleTime = {
    ...theme.font8,
    color: theme.gray_text,
    minWidth: "fit-content",
  };

  return (
    <>
      <div css={style} data-chat-row>
        <div css={styleProfileSection}>
          {authorId !== userOid && (
            <div
              css={{
                ...styleProfile,
                cursor: !isBot && !isAlone ? "pointer" : undefined,
              }}
              onClick={() => !isBot && !isAlone && onClickProfileImage()}
            >
              {isBot ? (
                <TaxiIcon css={{ width: "100%", height: "100%" }} />
              ) : (
                <ProfileImage
                  url={authorProfileUrl}
                  withdraw={authorIsWithdrew}
                />
              )}
            </div>
          )}
        </div>
        <div css={styleMessageSection}>
          {authorId !== userOid &&
            (authorIsWithdrew ? (
              <div css={{ ...styleName, color: theme.gray_text }}>
                <del>{authorName}</del>
                {" (탈퇴)"}
              </div>
            ) : (
              <div css={styleName} className="selectable">
                {authorName}{" "}
                {isBot || authorResidence === "" ? `` : `(${authorResidence})`}
                <BadgeImage badge_live={!!authorBadge && !isBot} />
              </div>
            ))}

          {chats.map((chat, index) => {
            const handleReply = () => {
              if (!onSetReplyTarget || isBot) return;
              const name =
                ("authorName" in chat && chat.authorName) || "알 수 없음";
              onSetReplyTarget({
                chatId: chat._id || "",
                authorName: name,
                content:
                  chat.type === "s3img" ? "사진" : chat.content,
              });
            };

            const handleClickParentChat = () => {
              if (
                !messageBodyRef?.current ||
                chat.type !== "reply" ||
                !("parentChat" in chat) ||
                !chat.parentChat
              )
                return;
              const targetEl = messageBodyRef.current.querySelector<HTMLElement>(
                `[data-chat-id="${chat.parentChat.originChatId}"]`
              );
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
                // 원본 메시지를 살짝 hop 시켜 강조 (스크롤이 자리잡은 뒤)
                window.setTimeout(() => {
                  targetEl.classList.remove("chat-hop");
                  void targetEl.offsetWidth; // reflow로 재트리거 허용
                  targetEl.classList.add("chat-hop");
                  const handleEnd = () => {
                    targetEl.classList.remove("chat-hop");
                    targetEl.removeEventListener("animationend", handleEnd);
                  };
                  targetEl.addEventListener("animationend", handleEnd);
                }, 260);
              }
            };

            const isMyMessage = authorId === userOid;
            const swipeHandlers = makeSwipeHandlers(
              handleReply,
              isMyMessage,
              isBot || !onSetReplyTarget
            );

            return (
              <div
                key={getChatUniquewKey(chat)}
                css={styleMessageWrap}
                data-chat-item
              >
                {!isBot && onSetReplyTarget && (
                  <div
                    data-swipe-hint
                    css={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      [isMyMessage ? "right" : "left"]: "6px",
                      display: "flex",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.15s",
                      pointerEvents: "none",
                    }}
                  >
                    <ReplyRoundedIcon
                      style={{
                        fontSize: "18px",
                        fill: theme.purple,
                        transform: "scaleX(-1)",
                      }}
                    />
                  </div>
                )}
                {authorId === userOid && !isBot && (
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.15s",
                      cursor: "pointer",
                      "[data-chat-item]:hover &": { opacity: 1 },
                      // 터치(폰)에선 호버 답장 버튼을 숨기고 스와이프로만 답장
                      "@media (hover: none)": { display: "none" },
                    }}
                    onClick={handleReply}
                  >
                    <ReplyRoundedIcon
                      style={{
                        fontSize: "16px",
                        fill: theme.gray_text,
                        transform: "scaleX(-1)",
                      }}
                    />
                  </div>
                )}
                <div
                  css={styleChat(chat.type)}
                  data-chat-id={chat._id}
                  {...swipeHandlers}
                >
                  <MessageBody
                    type={chat.type}
                    content={chat.content}
                    roomInfo={roomInfo}
                    color={authorId === userOid ? theme.white : theme.black}
                    settlement={settlement}
                    layoutType={layoutType}
                    chat={chat}
                    userOid={userOid}
                    onClickParentChat={handleClickParentChat}
                  />
                </div>
                {authorId !== userOid && !isBot && (
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.15s",
                      cursor: "pointer",
                      "[data-chat-item]:hover &": { opacity: 1 },
                      // 터치(폰)에선 호버 답장 버튼을 숨기고 스와이프로만 답장
                      "@media (hover: none)": { display: "none" },
                    }}
                    onClick={handleReply}
                  >
                    <ReplyRoundedIcon
                      style={{
                        fontSize: "16px",
                        fill: theme.gray_text,
                        transform: "scaleX(-1)",
                      }}
                    />
                  </div>
                )}
                <div css={styleMessageDetail}>
                  {unreadUsersNum(chat.time) > 0 && (
                    <div css={styleUnreadUsers}>
                      {unreadUsersNum(chat.time)}
                    </div>
                  )}
                  {index === chats.length - 1 && (
                    <div css={styleTime} className="selectable">
                      {dayjs(chat.time).format("H시 mm분")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ModalChatReport
        roomInfo={roomInfo}
        isOpen={isOpenReport}
        onChangeIsOpen={setIsOpenReport}
        userOid={authorId}
      />
    </>
  );
};

export default memo(MessageSet);
