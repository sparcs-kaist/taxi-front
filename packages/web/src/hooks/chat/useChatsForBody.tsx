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

export default (_chats: Chats, layoutType: LayoutType, roomInfo: Room) => {
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};

  return useMemo(() => {
    const list: Array<ReactNode> = [];
    let momentCache: any = null; // @fixme, @todo
    let chatsCache: Nullable<Array<UserChat | BotChat>> = null;
    let unreadUsersCache: number = 0;
    const dateFormat = "YYYY.MM.DD";
    const minFormat = "YYYY.MM.DD HH:mm";

    let readAtList: Array<Date> = [];
    roomInfo?.part?.forEach((user) => {
      readAtList.push(user.readAt);
    });
    readAtList.sort();

    console.log("readAtList =====>", readAtList);

    const popQueue = () => {
      if (chatsCache) {
        list.push(
          <MessageSet
            key={"chat" + getChatUniquewKey(chatsCache[0])}
            chats={chatsCache}
            layoutType={layoutType}
            roomInfo={roomInfo}
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
      // console.log("time =====>", item.time)
      // Chat의 time에 따라 안 읽은 사람 수 증가시키기
      while (readAtList.length > 0 && item.time > readAtList[0]) {
        readAtList.shift();
        unreadUsersCache++;
        console.log("unreadUsersCache =====>", unreadUsersCache);
      }

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
      } else if (
        item.type === "text" ||
        item.type === "s3img" ||
        item.type === "payment" ||
        item.type === "settlement" ||
        item.type === "account" ||
        item.type === "share" ||
        item.type === "departure" ||
        item.type === "arrival"
      ) {
        if (["share", "departure", "arrival"].includes(item.type)) {
          item.authorId = "bot";
          item.authorName = "택시 봇";
        }
        item.unreadUsers = unreadUsersCache;
        if (
          chatsCache &&
          (chatsCache[0].authorId !== item.authorId ||
            moment(chatsCache[0].time).format(minFormat) !==
              currentMoment.format(minFormat))
        ) {
          popQueue();
        }
        if (!chatsCache) chatsCache = [];
        chatsCache.push(item);
      }
      momentCache = currentMoment.clone();
    });
    popQueue();
    return list;
  }, [_chats, layoutType, userOid, roomInfo]);
};
