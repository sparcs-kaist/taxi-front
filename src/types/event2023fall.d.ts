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
