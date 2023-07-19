export const checkoutChat = { type: "inf-checkout" };
export type CheckoutChat = typeof checkoutChat;
export type Chats = Array<Chat | CheckoutChat>;

// 채팅 메시지의 문자열 고유 값을 반환합니다.
export const getChatUniquewKey = (chat: Chat): string => {
  return `${chat.type}-${chat.authorId}-${chat.time}`;
};

// 중복된 채팅 메시지를 제거 후, 채팅 메시지 배열을 반환합니다.
export const getCleanupChats = (
  chats: Array<Chat | CheckoutChat>
): Array<Chat | CheckoutChat> => {
  const newChats: Array<Chat | CheckoutChat> = [];
  const keySet = new Set<string>();

  chats.forEach((chat) => {
    if (chat.type !== "inf-checkout") {
      const key = getChatUniquewKey(chat as Chat);
      if (keySet.has(key)) return;
      keySet.add(key);
    }
    newChats.push(chat);
  });
  return newChats;
};
