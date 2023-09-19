import { memo, useCallback } from "react";

import type { BotChat, LayoutType, UserChat } from "types/chat";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import ProfileImage from "components/User/ProfileImage";

import MessageAccount from "./MessageAccount";
import MessageArrival from "./MessageArrival";
import MessageDeparture from "./MessageDeparture";
import MessageImage from "./MessageImage";
import MessagePaySettlement from "./MessagePaySettlement";
import MessageShare from "./MessageShare";
import MessageText from "./MessageText";

import { getChatUniquewKey } from "tools/chat/chats";
import dayjs from "tools/day";
import theme from "tools/theme";

import { ReactComponent as TaxiIcon } from "static/assets/sparcsLogos/TaxiAppIcon.svg";

type MessageBodyProps = {
  type: (UserChat | BotChat)["type"];
  content: (UserChat | BotChat)["content"];
  roomInfo: Room;
  color: CSS["color"];
};

const MessageBody = ({ type, content, roomInfo, color }: MessageBodyProps) => {
  switch (type) {
    case "text":
      return <MessageText text={content} color={color} />;
    case "s3img":
      return <MessageImage id={content} color={color} />;
    case "payment":
    case "settlement":
      return <MessagePaySettlement type={type} color={color} />;
    case "account":
      return <MessageAccount roomInfo={roomInfo} account={content} />;
    case "share":
      return <MessageShare roomInfo={roomInfo} text={content} color={color} />;
    case "departure":
      return (
        <MessageDeparture roomInfo={roomInfo} minutes={content} color={color} />
      );
    case "arrival":
      return <MessageArrival color={color} />;
    default:
      return null;
  }
};

type MessageSetProps = {
  chats: Array<UserChat | BotChat>;
  layoutType: LayoutType;
  roomInfo: Room;
};

const MessageSet = ({ chats, layoutType, roomInfo }: MessageSetProps) => {
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};
  const authorId = chats?.[0]?.authorId;
  const authorProfileUrl =
    "authorProfileUrl" in chats?.[0] ? chats?.[0].authorProfileUrl : "";
  const authorName = "authorName" in chats?.[0] ? chats?.[0].authorName : "";

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
            type === "arrival"
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
  const styleTime = {
    ...theme.font8,
    color: theme.gray_text,
    marginBottom: "1px",
    minWidth: "fit-content",
  };

  return (
    <div css={style}>
      <div css={styleProfileSection}>
        {authorId !== userOid && (
          <div
            css={styleProfile}
            onClick={() => {
              /* @fixme @todo */
            }}
          >
            {authorId === "bot" ? (
              <TaxiIcon css={{ width: "100%", height: "100%" }} />
            ) : (
              <ProfileImage url={authorProfileUrl} />
            )}
          </div>
        )}
      </div>
      <div css={styleMessageSection}>
        {authorId !== userOid && (
          <div css={styleName} className="selectable">
            {authorName}
          </div>
        )}
        {chats.map((chat, index) => (
          <div key={getChatUniquewKey(chat)} css={styleMessageWrap}>
            <div css={styleChat(chat.type)}>
              <MessageBody
                type={chat.type}
                content={chat.content}
                roomInfo={roomInfo}
                color={authorId === userOid ? theme.white : theme.black}
              />
            </div>
            {index === chats.length - 1 && (
              <div css={styleTime} className="selectable">
                {dayjs(chat.time).format("H시 mm분")}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MessageSet);
