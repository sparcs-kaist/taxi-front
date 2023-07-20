import { useMemo } from "react";

import { LayoutType } from "types/chat";

import ChatSet from "components/Chat/MessagesBody/ChatSet";
import MessageDate from "components/Chat/MessagesBody/MessageDate";
import MessageInOut from "components/Chat/MessagesBody/MessageInOut";

import loginInfoAtom from "atoms/loginInfo";
import { useRecoilValue } from "recoil";

import { Chats, getChatUniquewKey } from "tools/chat/chats";
import dayjs from "tools/day";
import moment from "tools/moment";

export default (_chats: Chats, layoutType: LayoutType) => {
  const { oid: userOid } = useRecoilValue(loginInfoAtom) || {};

  // remove me
  const isBottomOnScroll = () => true;
  const scrollToBottom = () => {};

  return useMemo(() => {
    const list = [];
    let momentCache: any = null; // fixme, todo
    let chatsCache: Nullable<Array<Chat>> = null;
    const dateFormat = "YYYY.MM.DD";
    const minFormat = "YYYY.MM.DD HH:mm";

    const chatSetCommonProps = {
      authorId: userOid,
      isBottomOnScroll,
      scrollToBottom,
      isSideChat: layoutType === "sidechat", // fixme
    };

    _chats.forEach((item) => {
      if (item.type === "inf-checkout") {
        if (chatsCache) {
          list.push(
            <ChatSet
              key={"chat" + getChatUniquewKey(chatsCache[0])}
              chats={chatsCache}
              {...chatSetCommonProps}
            />
          );
        }
        chatsCache = null;

        list.push(
          <div key={"checkout" + momentCache} className="chatcheckout" />
        );
        return;
      }

      const currentMoment = moment((item as Chat).time);
      if (!momentCache) {
        momentCache = currentMoment.clone();
        momentCache.subtract(1, "years");
      }
      if (momentCache.format(dateFormat) !== currentMoment.format(dateFormat)) {
        if (chatsCache) {
          list.push(
            <ChatSet
              key={"chat" + getChatUniquewKey(chatsCache[0])}
              chats={chatsCache}
              {...chatSetCommonProps}
            />
          );
          chatsCache = null;
        }

        list.push(
          <MessageDate
            key={"date" + currentMoment}
            date={dayjs(currentMoment.toISOString())}
          />
        );
      }
      if (item.type === "in" || item.type === "out") {
        if (chatsCache) {
          list.push(
            <ChatSet
              key={"chat" + getChatUniquewKey(chatsCache[0])}
              chats={chatsCache}
              {...chatSetCommonProps}
            />
          );
          chatsCache = null;
        }
        list.push(
          <MessageInOut
            key={"inout" + getChatUniquewKey(item as Chat)}
            type={item.type}
            users={(item as Chat).inOutNames}
          />
        );
      } else if (
        ["text", "s3img", "payment", "settlement", "account"].includes(
          item.type
        )
      ) {
        if (
          chatsCache &&
          (chatsCache[0].authorId !== (item as Chat).authorId ||
            moment(chatsCache[0].time).format(minFormat) !==
              currentMoment.format(minFormat))
        ) {
          list.push(
            <ChatSet
              key={"chat" + getChatUniquewKey(chatsCache[0])}
              chats={chatsCache}
              {...chatSetCommonProps}
            />
          );
          chatsCache = null;
        }
        if (!chatsCache) chatsCache = [];
        chatsCache.push(item as Chat);
      }
      momentCache = currentMoment.clone();
    });
    if (chatsCache) {
      list.push(
        <ChatSet
          key={"chatLast" + getChatUniquewKey(chatsCache[0])}
          chats={chatsCache}
          {...chatSetCommonProps}
        />
      );
    }
    return list;
  }, [_chats, layoutType, userOid]);
};
