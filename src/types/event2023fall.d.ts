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

export type Transaction = {
  _id: string;
  type: "get" | "use";
  amount: number;
  eventId?: string;
  itemId?: string;
  comment: string;
  doneat: Date;
};
