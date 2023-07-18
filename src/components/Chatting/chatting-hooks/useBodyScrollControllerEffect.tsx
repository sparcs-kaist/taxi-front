import { MutableRefObject, RefObject, useEffect, useLayoutEffect } from "react";

import { Chats } from "../chatting-utils/chats";
import { isBottomOnScroll, scrollToBottom } from "../chatting-utils/scroll";

export default (
  roomId: string,
  chats: Chats,
  setDisplayNewMessage: (value: boolean) => void,
  chatBodyRef: RefObject<HTMLDivElement>,
  isCallingInfScroll: MutableRefObject<boolean>
) => {
  useLayoutEffect(() => {
    // @todo, @fixme 테스트 필요
    // if (!isCallingInfScroll.current) return;
    // isCallingInfScroll.current = false;
    // let scrollTop = -34; // 34는 ChatDate의 높이
    // const bodyChildren = messagesBody.current.children;
    // for (const children of bodyChildren) {
    //   if (children.getAttribute("chatcheckout")) break;
    //   scrollTop += children.clientHeight;
    // }
    // messagesBody.current.scrollTop = scrollTop;
  }, [chats]);

  useEffect(() => {
    const chatBody = chatBodyRef?.current;
    let isBottomOnScrollCache: boolean = true;

    if (!chatBody) return;

    const resizeEvent = () => {
      if (isBottomOnScrollCache) scrollToBottom(chatBody);
    };
    const scrollEvent = () => {
      if (isBottomOnScroll(chatBody)) {
        setDisplayNewMessage(false);
        isBottomOnScrollCache = true;
      } else {
        isBottomOnScrollCache = false;
      }
      // @todo, @fixme 테스트 필요
      // if (isTopOnScroll(chatBody)) {
      //   console.log("top");
      //   무한 스크롤 구현 및 API 호출
      // }
    };

    const resizeObserver = new ResizeObserver(resizeEvent);
    resizeEvent();
    scrollEvent();
    resizeObserver.observe(chatBody);
    chatBody.addEventListener("scroll", scrollEvent);
    return () => {
      resizeObserver.disconnect();
      chatBody.removeEventListener("scroll", scrollEvent);
    };
  }, [roomId, chatBodyRef]);
};
