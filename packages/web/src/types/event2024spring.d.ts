export type EventItem = {
  _id: string;
  name: string;
  imageUrl: string;
  instagramStoryStickerImageUrl?: string;
  price: number;
  description: string;
  isDisabled: boolean;
  stock: number;
  itemType: number;
};

export type Transaction = {
  _id: string;
  amount: number;
  comment: string;
  createAt: Date;
} & (
  | {
      type: "get";
      questId: string;
      item: never;
    }
  | {
      type: "use";
      item: EventItem;
      questId: never;
    }
);

export type Quest = {
  description: string;
  id: QuestId;
  imageUrl: string;
  maxCount: number;
  name: string;
  reward: { credit: number };
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
  | "eventSharing"
  | "eventSharing5";
