import { ReactNode, useMemo } from "react";

import type { Chats, LayoutType } from "types/chat";

import { useValueRecoilState } from "hooks/useFetchRecoilState";

import MessageDate from "components/Chat/MessagesBody/MessageDate";
import MessageInOut from "components/Chat/MessagesBody/MessageInOut";
import MessageInfScroll from "components/Chat/MessagesBody/MessageInfScroll";
import MessageJoint from "components/Chat/MessagesBody/MessageJoint";
import MessageSet from "components/Chat/MessagesBody/MessageSet";

import { getChatUniquewKey } from "tools/chat/chats";
import dayjs from "tools/day";
import moment from "tools/moment";

export default (_chats: Chats, layoutType: LayoutType) => {
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};

  return useMemo(() => {
    const list: Array<ReactNode> = [];
    let momentCache: any = null; // @fixme, @todo
    let chatsCache: Nullable<Array<Chat>> = null;
    const dateFormat = "YYYY.MM.DD";
    const minFormat = "YYYY.MM.DD HH:mm";

    const popQueue = () => {
      if (chatsCache) {
        list.push(
          <MessageSet
            key={"chat" + getChatUniquewKey(chatsCache[0])}
            chats={chatsCache}
            layoutType={layoutType}
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
        momentCache.subtract(1, "years");
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
            users={item.inOutNames}
          />
        );
      } else if (
        ["text", "s3img", "payment", "settlement", "account"].includes(
          item.type
        )
      ) {
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
  }, [_chats, layoutType, userOid]);
};
