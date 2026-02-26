import { ReactNode, useMemo } from "react";

import type { BotChat, Chats, LayoutType, UserChat } from "@/types/chat";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import MessageDate from "@/components/Chat/MessagesBody/MessageDate";
import MessageInOut from "@/components/Chat/MessagesBody/MessageInOut";
import MessageInfScroll from "@/components/Chat/MessagesBody/MessageInfScroll";
import MessageJoint from "@/components/Chat/MessagesBody/MessageJoint";
import MessageSet from "@/components/Chat/MessagesBody/MessageSet";

import { getChatUniquewKey } from "@/tools/chat/chats";
import dayjs from "@/tools/day";
import moment from "@/tools/moment";

export default (
  _chats: Chats,
  layoutType: LayoutType,
  roomInfo: Room,
  readAtList: Date[]
) => {
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};

  return useMemo(() => {
    const list: ReactNode[] = [];
    let momentCache: any = null; // @fixme, @todo
    let chatsCache: (UserChat | BotChat)[] | null = null;
    let hasRecommended = 0;
    const dateFormat = "YYYY.MM.DD";
    const minFormat = "YYYY.MM.DD HH:mm";

    const popQueue = () => {
      if (chatsCache) {
        list.push(
          <MessageSet
            key={"chat" + getChatUniquewKey(chatsCache[0])}
            chats={chatsCache}
            layoutType={layoutType}
            roomInfo={roomInfo}
            readAtList={readAtList}
          />
        );
      }
      chatsCache = null;
    };

    _chats.forEach((item) => {
      if ("isSpecialChat" in item) {
        popQueue();
        if (item.type === "joint-checkout") {
          list.push(<MessageJoint key={"checkout" + momentCache} />);
        }
        if (item.type === "infscroll-checkout") {
          list.push(
            <MessageInfScroll key="infscroll-checkout" value={item.key} />
          );
        }
        return;
      }

      const currentMoment = moment(item.time);

      if (!momentCache) {
        momentCache = currentMoment.clone();
        momentCache.subtract(1, "years"); // momentCache를 초기화하기 위함
      }
      if (momentCache.format(dateFormat) !== currentMoment.format(dateFormat)) {
        popQueue();
        list.push(
          <MessageDate
            key={"date" + currentMoment}
            date={dayjs(currentMoment.toISOString())}
          />
        );
      }
      if (item.type === "in" || item.type === "out") {
        popQueue();
        list.push(
          <MessageInOut
            key={"inout" + getChatUniquewKey(item)}
            type={item.type}
            users={item.inOutNames || []}
          />
        );

        if (item.type === "in") {
          hasRecommended++;
        }
        if (item.type === "in" && hasRecommended === 2) {
          const recommendationChat: BotChat = {
            type: "gameRecommendation",
            authorId: "bot",
            authorName: "택시 봇",
            time: item.time,
            content: "함께 즐길 게임을 추천해 드릴까요?",
            roomId: roomInfo._id,
            isValid: true,
          };
          list.push(
            <MessageSet
              key={"bot-recommendation-" + item.time}
              chats={[recommendationChat]}
              layoutType={layoutType}
              roomInfo={roomInfo}
              readAtList={readAtList}
            />
          );
        }
      } else if (
        item.type === "text" ||
        item.type === "s3img" ||
        item.type === "payment" ||
        item.type === "settlement" ||
        item.type === "account" ||
        item.type === "share" ||
        item.type === "departure" ||
        item.type === "arrival" ||
        item.type === "wordChain" ||
        item.type === "gameRecommendation" ||
        item.type === "racing"
      ) {
        if (
          [
            "share",
            "departure",
            "arrival",
            "gameRecommendation",
            "racing",
          ].includes(item.type)
        ) {
          item.authorId = "bot";
          item.authorName = "택시 봇";
        }
        if (item.type === "wordChain" && !item.authorId) {
          item.authorId = "bot";
          item.authorName = "택시 봇";
        }

        if (
          chatsCache &&
          (chatsCache[0].authorId !== item.authorId ||
            moment(chatsCache[0].time).format(minFormat) !==
              currentMoment.format(minFormat))
        ) {
          popQueue();
        }

        // 백엔드에서 racing 타입으로 보내는 원시 배팅 메시지("X:Y" 형태)는 화면에 표시하지 않음
        const isRawBettingPayload =
          item.type === "racing" && /^\d+:\s*\d+$/.test(item.content);

        // 원시 배팅 데이터가 아닐 경우에만 캐시에 푸시
        if (!isRawBettingPayload) {
          if (!chatsCache) chatsCache = [];
          chatsCache.push(item);
        }
      }
      momentCache = currentMoment.clone();
    });
    popQueue();
    return list;
  }, [_chats, layoutType, userOid, roomInfo, readAtList]);
};
