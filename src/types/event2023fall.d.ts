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
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  rewardAmount: number;
  maxCount: number;
  expireat: string;
  isDisabled: boolean;
};

export type Transaction = {
  _id: string;
  type: "get" | "use";
  amount: number;
  eventId?: string;
  itemId?: string;
  comment: string;
  doneat: Date;
};