export const checkoutChat = { type: "inf-checkout" };
export type CheckoutChat = typeof checkoutChat;

export const getChatUnquewKey = (chat: Chat): string => {
  return `${chat.type}-${chat.authorId}-${chat.time}`;
};

export const getCleanupChats = (
  chats: Array<Chat | CheckoutChat>
): Array<Chat | CheckoutChat> => {
  const newChats: Array<Chat | CheckoutChat> = [];
  const keySet = new Set<string>();

  chats.forEach((chat) => {
    if (chat.type !== "inf-checkout") {
      const key = getChatUnquewKey(chat as Chat);
      if (keySet.has(key)) return;
      keySet.add(key);
    }
    newChats.push(chat);
  });
  return newChats;
};
