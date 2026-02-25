export type QuestId =
| "firstRoomCreation"
  | "settlementForest"
  | "nicknameChanging"
  | "firstLogin"
  | "phoneVerification"
  | "referralInvitedBonus"
  | "allBadgedSettlement"; // Example IDs, backend can expand these

export type Quest = {
  description: string;
  id: QuestId;
  imageUrl?: string;
  maxCount: number;
  name: string;
  reward: { credit: number };
};

export type EventItem = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  instagramStoryStickerImageUrl?: string;
  price: number;
  isDisabled: boolean;
  itemType: number;
};

export type Transaction = {
  type: "get" | "use";
  amount: number;
  comment: string;
  questId?: QuestId;
  item?: Pick<EventItem, "name" | "imageUrl">;
  createdAt: Date;
};
