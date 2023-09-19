export type EventItem = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  isDisabled: boolean;
  stock: number;
  itemType: number;
};

export type Quest = {
  description: string;
  id: QuestId;
  imageUrl: string;
  maxCount: number;
  name: string;
  reward: { credit: number; ticket1?: number; ticket2?: number };
};

export type QuestId =
  | "firstLogin"
  | "payingAndSending"
  | "firstRoomCreation"
  | "roomSharing"
  | "paying"
  | "sending"
  | "nicknameChanging"
  | "accountChanging"
  | "adPushAgreement"
  | "eventSharingOnInstagram"
  | "purchaseSharingOnInstagram";

export type Transaction = {
  _id: string;
  type: "get" | "use";
  amount: number;
  eventId?: string;
  itemId?: string;
  comment: string;
  doneat: Date;
};
