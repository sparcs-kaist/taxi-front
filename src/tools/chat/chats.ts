import type {
  Chats,
  InfScrollCheckoutChat,
  JointCheckoutChat,
} from "types/chat";

export const jointCheckoutChat: JointCheckoutChat = {
  type: "joint-checkout",
  isSpecialChat: true,
};

export const createInfScrollCheckoutChat = (): InfScrollCheckoutChat => {
  const key = Math.random().toString(36).substring(2, 15);
  return { type: "infscroll-checkout", key, isSpecialChat: true };
};

// 채팅 메시지의 문자열 고유 값을 반환합니다.
export const getChatUniquewKey = (chat: Chat): string => {
  return `${chat.type}-${chat.authorId}-${chat.time}`;
};

// 중복된 채팅 메시지를 제거 후, 채팅 메시지 배열을 반환합니다.
export const getCleanupChats = (chats: Chats): Chats => {
  const newChats: Chats = [];
  const keySet = new Set<string>();
  let isAlreadyPushInfscrollChat = false;

  chats.forEach((chat) => {
    if (chat.type === "infscroll-checkout") {
      if (isAlreadyPushInfscrollChat) return;
      isAlreadyPushInfscrollChat = true;
      newChats.push(chat);
    } else if (chat.type === "joint-checkout") {
      newChats.push(chat);
    } else {
      const key = getChatUniquewKey(chat);
      if (keySet.has(key)) return;
      keySet.add(key);
      newChats.push(chat);
    }
  });
  return newChats;
};
