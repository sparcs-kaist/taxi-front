export type LayoutType = "sidechat" | "fullchat" | "wordChainGame";

type CommonChat = {
  _id?: string; // 채팅의 objectId
  roomId: string; // 방의 objectId
  type: string;
  authorId?: string; // 작성자 objectId
  content: string;
  time: Date; // UTC 시각
  isValid: boolean;
};

export type ParentChat = {
  originChatId: string;
  authorId: string;
  nickname: string;
  content: string;
};

export type UserChat = {
  type: "text" | "s3img" | "payment" | "settlement" | "account" | "reply";
  authorId: string;
  authorName: string;
  authorResidence?: string;
  authorProfileUrl: string;
  authorIsWithdrew: boolean;
  parentChat?: ParentChat;
} & CommonChat;
export type GeneralChat = {
  type: "in" | "out";
  inOutNames: string[];
} & CommonChat;
export type BotChat = {
  type: "share" | "departure" | "arrival" | "wordChain" | "gameRecommendation" | "racing" | "raceLog";
  authorId?: "bot";
  authorName?: string;
} & CommonChat;
export type Chat = UserChat | GeneralChat | BotChat;

export type JointCheckoutChat = {
  type: "joint-checkout";
  isSpecialChat: true;
};
export type InfScrollCheckoutChat = {
  type: "infscroll-checkout";
  key: string;
  isSpecialChat: true;
};
export type CheckoutChat = JointCheckoutChat | InfScrollCheckoutChat;

export type Chats = (Chat | CheckoutChat)[];
