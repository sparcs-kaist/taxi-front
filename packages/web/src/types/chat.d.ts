export type LayoutType = "sidechat" | "fullchat";

type CommonChat = {
  roomId: string; // 방의 objectId
  type: string;
  authorId?: string; // 작성자 objectId
  content: string;
  time: Date; // UTC 시각
  isValid: boolean;
};

export type UserChat = {
  type: "text" | "s3img" | "payment" | "settlement" | "account";
  authorId: string;
  authorName: string;
  authorProfileUrl: string;
} & CommonChat;
export type GeneralChat = {
  type: "in" | "out";
  inOutNames: Array<string>;
} & CommonChat;
export type BotChat = {
  type: "share" | "departure" | "arrival";
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

export type Chats = Array<Chat | CheckoutChat>;
