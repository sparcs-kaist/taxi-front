import { RefObject, useEffect, useLayoutEffect, useRef } from "react";

import type { Chat, Chats } from "@/types/chat";

import { useAxios } from "@/hooks/useTaxiAPI";

import {
  isBottomOnScroll,
  isTopOnScroll,
  scrollToBottom,
} from "@/tools/chat/scroll";
import { socketReady } from "@/tools/socket";

const mutationObserverConfig = {
  childList: true,
  attributes: false,
  characterData: false,
  subtree: true,
};

export default (
  roomId: string,
  chats: Chats,
  setDisplayNewMessage: (value: boolean) => void,
  setIsOpenToolSheet: (value: boolean) => void,
  chatBodyRef: RefObject<HTMLDivElement>
) => {
  const axios = useAxios();
  const isCallingInfScroll = useRef<boolean>(false); // 무한 스크롤 메시지 요청 중인지 여부

  useLayoutEffect(() => {
    if (!isCallingInfScroll.current) return;
    isCallingInfScroll.current = false;

    const children = chatBodyRef?.current?.children;
    if (!children || children.length < 2) return;

    let scrollTop = -(children[0].clientHeight + children[1].clientHeight);

    for (const child of Array.from(children)) {
      if (child.getAttribute("data-chat-type") === "joint-checkout") break;
      scrollTop += child.clientHeight;
    }
    chatBodyRef.current.scrollTop = scrollTop;
  }, [chats]);

  useEffect(() => {
    const chatBody = chatBodyRef?.current;
    let isBottomOnScrollCache: boolean = true;

    if (!chatBody) return;

    const mutationCallback = (mutations: Array<MutationRecord>) => {
      mutations.forEach(({ type, addedNodes }: MutationRecord) => {
        if (type === "childList") {
          const nodes = Array.from(addedNodes).filter(
            (node) => node.nodeName === "IMG"
          );
          const elems = nodes
            .map((node) => Array.from(node.parentElement?.children || []))
            .reduce((acc, val) => acc.concat(val), []);
          const imageElems = elems.filter((elem) =>
            elem.classList.contains("MessageImage_img")
          );
          imageElems.forEach((elem) => {
            elem.addEventListener("load", () => {
              if (isBottomOnScrollCache) scrollToBottom(chatBody);
            });
          });
        }
      });
    };
    const resizeEvent = () => {
      if (isBottomOnScrollCache) scrollToBottom(chatBody);
    };
    const scrollEvent = () => {
      if (isBottomOnScroll(chatBody)) {
        setDisplayNewMessage(false);
        isBottomOnScrollCache = true;
      } else {
        setIsOpenToolSheet(false);
        isBottomOnScrollCache = false;
      }
    };
    const touchStartEvent = () => {
      setIsOpenToolSheet(false);
    };

    const mutationObserver = new MutationObserver(mutationCallback);
    const resizeObserver = new ResizeObserver(resizeEvent);

    resizeEvent();
    scrollEvent();

    mutationObserver.observe(chatBody, mutationObserverConfig);
    resizeObserver.observe(chatBody);
    chatBody.addEventListener("scroll", scrollEvent);
    chatBody.addEventListener("touchstart", touchStartEvent);
    chatBody.addEventListener("mousedown", touchStartEvent);
    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      chatBody.removeEventListener("scroll", scrollEvent);
      chatBody.removeEventListener("touchstart", touchStartEvent);
      chatBody.removeEventListener("mousedown", touchStartEvent);
    };
  }, [roomId, chatBodyRef]);

  useEffect(() => {
    const chatBody = chatBodyRef?.current;
    if (!chatBody) return;

    const scrollEvent = () => {
      if (
        !isCallingInfScroll.current &&
        chatBody.children.length >= 1 &&
        chatBody.children[0].getAttribute("data-chat-type") ===
          "infscroll-checkout" &&
        isTopOnScroll(chatBody, chatBody.children[0].clientHeight)
      ) {
        isCallingInfScroll.current = true;
        socketReady(() => {
          const cleandChat = chats.filter(
            (chat: Chats) => !("isSpecialChat" in chat)
          ) as Array<Chat>;
          if (!cleandChat?.[0]?.time) return;
          axios({
            url: "/chats/load/before",
            method: "post",
            data: { roomId, lastMsgDate: cleandChat[0].time },
          });
        });
      }
    };

    scrollEvent();
    chatBody.addEventListener("scroll", scrollEvent);
    return () => chatBody.removeEventListener("scroll", scrollEvent);
  }, [roomId, chatBodyRef, chats]);
};
