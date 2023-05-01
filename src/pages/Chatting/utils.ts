export const checkoutChat = { type: "inf-checkout" };
export type CheckoutChat = typeof checkoutChat;

export const getChatUnquewKey = (chat: Chat): string => {
  return `${chat.type}-${chat.authorId}-${chat.time}`;
};

export const getCleanupChats = (
  chats: Array<Chat | CheckoutChat>
): Array<Chat | CheckoutChat> => {
  return [];
};
