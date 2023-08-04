export type LayoutType = "sidechat" | "fullchat";

export type JointCheckoutChat = {
  type: "joint-checkout";
  isSpecialChat: true;
};

export type InfScrollCheckoutChat = {
  type: "infscroll-checkout";
  key: string;
  isSpecialChat: true;
};

export type Chats = Array<Chat | JointCheckoutChat | InfScrollCheckoutChat>;
