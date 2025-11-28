export type QuestId =
  | "firstLogin"
  | "firstRoomCreation"
  | "roomSharing"
  | "fareSettlement"
  | "farePayment"
  | "nicknameChanging"
  | "accountChanging"
  | "adPushAgreement"
  | "eventSharing"
  | "dailyAttendance"
  | "itemPurchase";

export type Quest = {
  description: string;
  id: QuestId;
  imageUrl: string;
  maxCount: number;
  name: string;
  reward: { credit: number };
};

export type GameItem = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  itemType: string;
};
